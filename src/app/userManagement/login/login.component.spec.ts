import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BackendService } from '../backend-service';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('Login component', () => {
    let beService: BackendService;
    let page: LoginComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });
      page = new LoginComponent(beService);

      // inject the service
      beService = TestBed.get(BackendService);

    });


    it('Login component : form should have a control', () => {
      expect(page.formgroup.contains('email')).toBeTruthy();
      expect(page.formgroup.contains('password')).toBeTruthy();

  });

  // validation
    it('Login component : form control should have a validation required', () => {
    const email = page.formgroup.get('email');
    const password = page.formgroup.get('password');

    email.setValue('');
    expect(email.valid).toBeFalsy();

    password.setValue('');
    expect(password.valid).toBeFalsy();

});


   // expecting the correct(but faked) result: propery with value
    it('Should logged the user In successfull and redirect the user', () => {
    const loggininfo = {
      email: 'sura@gmail.com',
      password: 'abcd1234',
    };
    const email = page.formgroup.get('email');
    const password = page.formgroup.get('password');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    email.setValue('sura@gmail.com');
    password.setValue('abcd1234');


    beService.loginAuth(loggininfo).subscribe((data: any) => {
      expect(beService.userLoggedIn).toBeTruthy();
      expect(beService.loggedinUserInfo.email).toBe('sura@gmail.com');
      expect(spy).toHaveBeenCalledWith(['/studentDashboard']);

    });
  });


});
