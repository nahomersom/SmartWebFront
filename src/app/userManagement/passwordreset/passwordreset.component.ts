import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public user: any [];
  public userNotFound = false;
  public loading = false;

  constructor(private beService: BackendService, private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
      email : new FormControl('', [Validators.required, Validators.email])
    });
  }
  ngOnInit() {}

  get getemail(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }

  checkEmail() {
      if (this.getemail.errors) {
        this.formSubmitted = true;
        this.invalidClass = true;
        return;
      } else {
      this.loading = true;
      this.beService.checkEmail({email: this.formgroup.controls.email.value}).subscribe((data: any[]) => {
        if (data.length > 0) {
          this.loading = false;
          localStorage.setItem('userID', data[0].id);
          localStorage.setItem('userEmail', data[0].email);
          this.router.navigateByUrl('/verification');
          
        } else {
          this.userNotFound = true;
          this.loading = false;
        }
      });
    }
  }

}
