import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  closeAlert = false;
  closeErrorAlert = false;
  public disable: boolean = false;

  constructor(private feedbackService: FeedbackService) {
    this.formgroup = new FormGroup({
      feedback: new FormControl('', Validators.required),
    });
    this.ngOnInit();
  }

  ngOnInit(): void {
  }

  get feedback(): FormControl {
    return this.formgroup.get('feedback') as FormControl;
  }

  onSubmit(): any {
    if (this.feedback.errors) {
      this.formSubmitted = true;
      this.invalidClass = true;
      this.closeErrorAlert = true;
      return;

    } else {
      this.invalidClass = false;
      this.disable = true;
      this.feedbackService.sendFeedback(
        {
          name: localStorage.getItem('userFullName'),
          email: localStorage.getItem('userEmail'),
          description: this.formgroup.controls.feedback.value
        })
        .subscribe((response: any) => {
          if (response.status) {
            this.closeAlert = true;
            this.feedback.setValue('');
            setTimeout(() => this.closeAlert = false, 1500);
            this.disable = false;

          } else {
            alert('Message are Not Sent. Please try again !');
            this.disable = false;

          }
          this.disable = false;

        }), (() => {
          this.disable = false;
        });
    }
  }

}
