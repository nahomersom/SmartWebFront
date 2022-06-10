import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public emailAlreadyUsed = false;

  constructor(private beService?: BackendService, private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
      fullName : new FormControl('', Validators.required),
      gender : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      repassword : new FormControl('', Validators.required),
      member : new FormControl('')
    });
  }

  ngOnInit() {}

  get getfullname(): FormControl {
    return this.formgroup.get('fullName') as FormControl;
  }
  get getgender(): FormControl {
    return this.formgroup.get('gender') as FormControl;
  }
  get getemail(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }
  get getpassword(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }
  get getrepassword(): FormControl {
    return this.formgroup.get('repassword') as FormControl;
  }

  onSubmit(): any {
    if (this.getfullname.errors || this.getgender.errors || this.getemail.errors ||
      this.getpassword.errors || this.getrepassword.errors) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;

    } else {
      this.invalidClass = false;
      return this.beService.userSignup(
      {
        fullname : this.formgroup.controls.fullName.value,
        gender : this.formgroup.controls.gender.value,
        email : this.formgroup.controls.email.value,
        password : this.formgroup.controls.password.value,

      })
        .subscribe((response: any) => {
          if(response.status){
            window.alert('User Signed Up Successfully !');
            this.router.navigate(['login']);

          } else {
            window.alert(response.message);

          }
        });
    }

  }

}
