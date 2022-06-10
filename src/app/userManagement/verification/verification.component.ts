import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public invalidCode = false;

  constructor(private beService: BackendService, private router?: Router,private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
      code : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  get getcode(): FormControl {
    return this.formgroup.get('code') as FormControl;
  }

  checkCode() {
    if (this.getcode.errors) {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;
    } else {
    this.beService.checkCode({email: localStorage.getItem('userEmail'), code: this.formgroup.controls.code.value})
    .subscribe((response: any) => {
      if (response.result) {
        localStorage.setItem('passwordResetKey', response.key);
        this.router.navigateByUrl('passwordChange');
        this.invalidCode = false;
      } else {
        this.invalidCode = true;
      }
    });
  }
 }

}
