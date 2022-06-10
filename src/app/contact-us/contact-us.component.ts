import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  closeAlert = false;
  closeErrorAlert = false;
  disable:boolean = false;
  public lat = 9.315504;
  public lng = 42.1022538;
  public contactusInfo: any;

  constructor(private contactusService: ContactUsService, private router?: Router) {
    this.formgroup = new FormGroup({
      fullname : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.email, Validators.required]),
      subject : new FormControl('', Validators.required),
      message : new FormControl('', Validators.required),
    });
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.contactusService.loadContact()
    .subscribe((data: any) => {
        this.contactusInfo = data;
        this.lat = data[0].latitude;
        this.lng = data[0].longtiude;
    });
  }

  get email(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }
  get fullname(): FormControl {
    return this.formgroup.get('fullname') as FormControl;
  }
  get subject(): FormControl {
    return this.formgroup.get('subject') as FormControl;
  }
  get message(): FormControl {
    return this.formgroup.get('message') as FormControl;
  }

  onSubmit(): any {
     console.log(this.disable)
      if (this.email.errors || this.fullname.errors || this.subject.errors || this.message.errors) {
            this.formSubmitted = true;
            this.invalidClass = true;
            this.closeErrorAlert = true;
            return;
      } else {
        this.closeErrorAlert = false;
        this.disable = true;
        this.invalidClass = false;
        this.contactusService.sendMessage(
          {
            id: '',
            fullname: this.formgroup.controls.fullname.value,
            email: this.formgroup.controls.email.value,
            subject: this.formgroup.controls.subject.value,
            message: this.formgroup.controls.message.value
          })
        .subscribe((response: any) => {
          this.disable = true;
          if (response.status) {
            this.closeAlert = true;
            this.fullname.setValue('');
            this.email.setValue('');
            this.subject.setValue('');
            this.message.setValue('');
            setTimeout(() => this.closeAlert = false, 1500);
          } else {
            alert('Message are Not Sent. Please try again !');
          }
          this.disable = false;
        });
      }
      this.disable = false;
  }


}
