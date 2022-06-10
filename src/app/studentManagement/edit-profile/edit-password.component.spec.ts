import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from 'src/app/userManagement/backend-service';
import { EditPasswordComponent } from './edit-password.component';


describe('Edit Profile Component', () => {
    let beService: BackendService;
    let page: EditPasswordComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });

      // inject the service
      beService = TestBed.get(BackendService);
      page = new EditPasswordComponent(beService);

    });

    it('form should have a control', () => {
      expect(page.formgroup.contains('password')).toBeTruthy();
      expect(page.formgroup.contains('fullName')).toBeTruthy();
      expect(page.formgroup.contains('repassword')).toBeTruthy();
      expect(page.formgroup.contains('oldpassword')).toBeTruthy();
  });

  // validation
    it('form control should have a validation required', () => {
    const fullName = page.formgroup.get('fullName');
    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');
    const oldpassword = page.formgroup.get('oldpassword');

    fullName.setValue('');
    expect(fullName.valid).toBeFalsy();

    password.setValue('');
    expect(password.valid).toBeFalsy();

    repassword.setValue('');
    expect(repassword.valid).toBeFalsy();

    oldpassword.setValue('');
    expect(repassword.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should change Profile successfull, alert Message and redirect the user', () => {

    const fullName = page.formgroup.get('fullName');
    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');
    const oldpassword = page.formgroup.get('oldpassword');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');

    fullName.setValue('surafel habte');
    password.setValue('abcd1234');
    repassword.setValue('abcd1234');
    oldpassword.setValue('abcd1234');

    const Newprofile = {
        id: 2,
        fullname: 'surafel habte',
        email: 'sura@example.com',
        password: 'abcd1234'
    };

    beService.updateprofile(Newprofile).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['Password Changed Succssfully !']);
      expect(spy).toHaveBeenCalledWith(['index']);

    });
  });


});
