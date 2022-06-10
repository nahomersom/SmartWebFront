import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BackendService } from '../backend-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangePasswordComponent } from './change-password.component';


describe('ChangePassword Component', () => {
    let beService: BackendService;
    let page: ChangePasswordComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });
      page = new ChangePasswordComponent(beService);

      // inject the service
      beService = TestBed.get(BackendService);
    });


    it('ChangePassword Component: form should have a control', () => {
      expect(page.formgroup.contains('password')).toBeTruthy();
      expect(page.formgroup.contains('repassword')).toBeTruthy();

  });

  // validation
    it('ChangePassword Component : form control should have a validation required', () => {
    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');

    password.setValue('');
    expect(password.valid).toBeFalsy();

    repassword.setValue('');
    expect(repassword.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should change password successfull, alert Message and redirect the user', () => {
    const changepassword = {
      id: 2,
      fullname: 'Surafel Habte',
      email: 'sura@gmail.com',
      password: 'abcd1234',
    };

    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');


    password.setValue('abcd1234');
    repassword.setValue('abcd1234');

    beService.updateprofile(changepassword).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['Password Changed Succeessfully !']);
      expect(spy).toHaveBeenCalledWith(['login']);

    });
  });


});
