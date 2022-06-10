import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BackendService } from '../backend-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PasswordresetComponent } from './passwordreset.component';


describe('Passwordreset Component', () => {
    let beService: BackendService;
    let page: PasswordresetComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });
      page = new PasswordresetComponent(beService);

      // inject the service
      beService = TestBed.get(BackendService);
    });

    it('Passwordreset Component : form should have a control', () => {
      expect(page.formgroup.contains('email')).toBeTruthy();

  });

  // validation
    it('Passwordreset Component : form control should have a validation required', () => {
    const email = page.formgroup.get('email');

    email.setValue('');
    expect(email.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should check the email then verifay that the email is found and redirect Code Verification page', () => {
    const email = page.formgroup.get('email');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    email.setValue('sura@gmail.com');


    beService.checkEmail(email.value).subscribe((data: any) => {
      expect(beService.loggedinUserInfo.length).toBe(1);
      expect(spy).toHaveBeenCalledWith(['verification']);

    });
  });


});
