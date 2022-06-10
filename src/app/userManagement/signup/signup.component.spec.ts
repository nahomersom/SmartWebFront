import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BackendService } from '../backend-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';


describe('Signup component', () => {
    let beService: BackendService;
    let page: SignupComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });
      page = new SignupComponent(beService);

      // inject the service
      beService = TestBed.get(BackendService);

    });


    it('Signup component : form should have a control', () => {
      expect(page.formgroup.contains('fullName')).toBeTruthy();
      expect(page.formgroup.contains('email')).toBeTruthy();
      expect(page.formgroup.contains('password')).toBeTruthy();
      expect(page.formgroup.contains('repassword')).toBeTruthy();

  });

  // validation
    it('Signup component : form control should have a validation required', () => {
    const fullName = page.formgroup.get('fullName');
    const email = page.formgroup.get('email');
    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');

    fullName.setValue('');
    expect(fullName.valid).toBeFalsy();

    email.setValue('');
    expect(email.valid).toBeFalsy();

    password.setValue('');
    expect(password.valid).toBeFalsy();

    repassword.setValue('');
    expect(repassword.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should signed the user In successfull, alert Message and redirect the user', () => {
    const signupinfo = {
      fullname: 'Surafel Habte',
      email: 'sura@gmail.com',
      password: 'abcd1234',
    };
    const fullName = page.formgroup.get('fullName');
    const email = page.formgroup.get('email');
    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');

    fullName.setValue('Surafel Habte');
    email.setValue('sura@gmail.com');
    password.setValue('abcd1234');
    repassword.setValue('abcd1234');

    beService.userSignup(signupinfo).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['User Signed Up Successfully !']);
      expect(spy).toHaveBeenCalledWith(['login']);

    });
  });

    it('Should check if the email address is already hold by other account', () => {
    const email = page.formgroup.get('email');
    email.setValue('sura@gmail.com');

    beService.checkEmail(email.value).subscribe((data: any[]) => {
        if (data.length > 0) {
            page.emailAlreadyUsed = true;
            expect(page.emailAlreadyUsed).toBeTruthy();
        }
    });
  });


});
