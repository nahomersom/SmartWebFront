import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend-service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  closeErrorAlert = false;
  public loading = false;

  constructor(private beService?: BackendService, private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    });
  }

  ngOnInit() { }

  get email(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }

  onSubmit(): any {
    if (this.email.errors || this.password.errors) {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;
    } else {
      this.invalidClass = false;
      this.loading = true;
      this.beService.loginAuth(
        {
          email: this.formgroup.controls.email.value,
          password: this.formgroup.controls.password.value
        })
        .subscribe((data: any) => {
          if (data.length > 0) {
            this.loading = false;
            localStorage.setItem('key', data[0].key);
            localStorage.setItem('userId', data[0].id);
            localStorage.setItem('userEmail', data[0].email);
            localStorage.setItem('userFullName', data[0].name);
            localStorage.setItem('member', data[0].member);
            localStorage.setItem('memberStatus', data[0].status);
            window.location.replace('/index');
          } else {
            this.loading = false;
            this.closeErrorAlert = true;
            this.formgroup.setErrors({ failed: true });
            this.invalidClass = true;
          }

        });
    }
  }

}
