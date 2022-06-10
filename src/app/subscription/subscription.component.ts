import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { IndexService } from '../index/Services/index.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  public subscription: any;
  public message: any;
  public warning: any;
  checked = false;
  constructor(private indexService: IndexService, private translate?: TranslateService) {
    this.formgroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      language: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }

  get email(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }

  get language(): FormControl {
    return this.formgroup.get('language') as FormControl;
  }

  isChecked() {
    this.checked = !this.checked;
  }

  onSubmit(): any {
    if (this.email.errors || this.language.errors) {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;
    } else {
      this.invalidClass = false;
      this.indexService.checkSubscription(this.formgroup.controls.email.value)
        .subscribe((data: any[]) => {
          if (data.length > 0) {
            window.alert('You already Subscribe !');
            return;
          } else {
            if (localStorage.getItem('userFullName') === null) {
              this.subscription = {
                fullName: 'Anonymous Visitor',
                email: this.formgroup.controls.email.value,
                language: this.formgroup.controls.language.value,
                include_bid: this.checked ? 1 : null
              };
            } else {
              this.subscription = {
                fullName: localStorage.getItem('userFullName'),
                email: this.formgroup.controls.email.value,
                language: this.formgroup.controls.language.value,
                include_bid: this.checked ? 1 : null
              };
            }
            this.warning = this.translate.instant('subscription_warning');
            if (window.confirm(this.warning)) {
              return this.indexService.subscribe(this.subscription)
                .subscribe((response: any) => {
                  if (response.status) {
                    this.message = 'subscription_success';
                    this.message = this.translate.instant(this.message);
                    window.alert(this.message);
                    this.email.setValue('');
                  } else {
                    window.alert('unable to subscribe');
                  }
                });
            }
          }
        });

    }
  }


}
