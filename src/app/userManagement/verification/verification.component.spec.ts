import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BackendService } from '../backend-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { VerificationComponent } from './verification.component';


describe('Verification Component ', () => {
    let beService: BackendService;
    let page: VerificationComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });
      page = new VerificationComponent(beService);

      // inject the service
      beService = TestBed.get(BackendService);
    });

    it('Verification Component : form should have a control', () => {
      expect(page.formgroup.contains('code')).toBeTruthy();

  });

  // validation
    it('Verification Component : form control should have a validation required', () => {
    const code = page.formgroup.get('code');

    code.setValue('');
    expect(code.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should check the Verification code then redirect to New Password chenge page', () => {
    const code = page.formgroup.get('code');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    code.setValue(123);


    beService.checkCode(code.value).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['passwordChange']);

    });
  });


});
