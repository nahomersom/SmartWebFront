import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/userManagement/backend-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
 
  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public passwordMatchFail = false;
  loading = false;
  closeAlert = false;

  constructor(private beService?: BackendService, private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
      password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      repassword : new FormControl('', Validators.required),
      oldpassword : new FormControl('', Validators.required),
      fullName : new FormControl('', Validators.required)
    });

    this.getfullname.setValue(localStorage.getItem('userFullName'));
  }

  ngOnInit() {}

  get getpassword(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }

  get getrepassword(): FormControl {
    return this.formgroup.get('repassword') as FormControl;
  }

  get getoldpassword(): FormControl {
    return this.formgroup.get('oldpassword') as FormControl;
  }

  get getfullname(): FormControl {
    return this.formgroup.get('fullName') as FormControl;
  }

  onSubmit(): any {
    if (this.getpassword.errors || this.getrepassword.errors || this.getoldpassword.errors) {
        this.invalidClass = true;
        this.formSubmitted = true;
        return;
      } else {
          if (this.getpassword.value !== this.getrepassword.value) {
            this.passwordMatchFail = true;
            return;
          } else {
            return this.beService.updateprofile(
              {
                id: localStorage.getItem('userId'),
                fullname : this.formgroup.controls.fullName.value,
                password : this.formgroup.controls.password.value,
                oldpassword : this.formgroup.controls.oldpassword.value
              })
                .subscribe((response: any) => {
                  if (response) {
                    if (response.status === 3) {
                      this.closeAlert = true;
                      return;
                    }
                    if (response.status === 1) {
                      window.alert('Password Changed Succssfully !');
                      this.router.navigate(['/index']);
                    }
                    if (response.status === 2) {
                      window.alert('Error Occured While Changing.');
                      return;
                    }
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
