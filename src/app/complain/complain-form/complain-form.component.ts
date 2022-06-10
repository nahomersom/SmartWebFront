import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplainService } from '../complain.service';
import {Location} from "@angular/common"
@Component({
  selector: 'app-complain-form',
  templateUrl: './complain-form.component.html',
  styleUrls: ['./complain-form.component.css']
})
export class ComplainFormComponent implements OnInit {
  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  closeAlert = false;
  closeErrorAlert = false;
  public disable: boolean = false;
  method = null;
  bids = [];

  constructor(private complainService: ComplainService, private activatedRoute: ActivatedRoute, private location: Location) {
    this.formgroup = new FormGroup({
      feedback: new FormControl('', Validators.required),
      bid: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.routeConfig.path;
    this.method = path === 'procurement-complain-form' ? 'procurement' : path === 'disposal-complain-form' ? 'disposal' : null;
    const params = {
      id: localStorage.getItem('userId'),
      type: this.method
    }
    this.complainService.loadBids(params).subscribe((data: any) => {
      this.bids = data;
    });
  }

  get feedback(): FormControl {
    return this.formgroup.get('feedback') as FormControl;
  }

  get bid(): FormControl {
    return this.formgroup.get('bid') as FormControl;
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
      this.complainService.createComplain(
        {
          public_sector_id: localStorage.getItem('userId'),
          message: this.formgroup.controls.feedback.value,
          bid_id: this.formgroup.controls.bid.value
        })
        .subscribe((response: any) => {
          if (response.status) {
            this.location.back();
            this.disable = false;
            alert("Complain sent successfully !");
          } else {
            alert('Complain not Sent, try again !');
            this.disable = false;
          }
        }), ((error) => {
          alert(error.message);
          this.disable = false;
        });
    }
  }

}
