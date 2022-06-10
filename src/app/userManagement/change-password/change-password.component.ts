import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public passwordMatchFail = false;

    constructor(
                private beService?: BackendService, private router?: Router, private translate?: TranslateService) {
      this.formgroup = new FormGroup
      ({
        password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
        repassword : new FormControl('', Validators.required)
      });
    }

    ngOnInit() {}

    get getpassword(): FormControl {
      return this.formgroup.get('password') as FormControl;
    }
    get getrepassword(): FormControl {
      return this.formgroup.get('repassword') as FormControl;
    }

    onSubmit(): any {
      if (this.getpassword.errors || this.getrepassword.errors) {
          this.invalidClass = true;
          this.formSubmitted = true;
          return;
        } else {
          if (this.getpassword.value !== this.getrepassword.value) {
            this.passwordMatchFail = true;
            return;
          } else {
            return this.beService.setNewpassword(
              {
                id: localStorage.getItem('userId'),
                password : this.formgroup.controls.password.value,
              })
                .subscribe((response: any) => {
                    if (response.status) {
                      window.alert('Password Changed Succssfully !');
                      localStorage.removeItem('userID');
                      localStorage.removeItem('userEmail');
                      localStorage.removeItem('userFullName');
                      localStorage.removeItem('passwordResetKey');
                      this.router.navigate(['login']);

                    } else {
                      window.alert('Error Occured While Changing.');
                      return;

                    }
                    
                });
          }
        }
    }

    confirmPassword(): any {
      if (this.getpassword.value !== this.getrepassword.value) {
        return false;
      } else {
        return true;
      }
    }

}
