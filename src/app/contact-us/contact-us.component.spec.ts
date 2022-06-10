import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsService } from './contact-us.service';


describe('Contact us component', () => {
    let contactusService: ContactUsService;
    let page: ContactUsComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [ContactUsService]
      });
      // inject the service
      contactusService = TestBed.get(ContactUsService);

      page = new ContactUsComponent(contactusService);

    });

    it('Contact Us component : form should have a control', () => {
      expect(page.formgroup.contains('fullname')).toBeTruthy();
      expect(page.formgroup.contains('email')).toBeTruthy();
      expect(page.formgroup.contains('subject')).toBeTruthy();
      expect(page.formgroup.contains('message')).toBeTruthy();

    });

  // validation
    it('contact us component : form control should have a validation required and Email', () => {
    const fullname = page.formgroup.get('fullname');
    const email = page.formgroup.get('email');
    const subject = page.formgroup.get('subject');
    const message = page.formgroup.get('message');

    fullname.setValue('');
    expect(fullname.valid).toBeFalsy();

    email.setValue('');
    expect(email.valid).toBeFalsy();

    subject.setValue('');
    expect(subject.valid).toBeFalsy();

    message.setValue('');
    expect(message.valid).toBeFalsy();

    });

   // expecting the correct(but faked) result: propery with value
    it('Should send message successfull, show success message ', () => {
    const messages = {
        id: 1,
        fullname: 'surafel habte',
        email: 'sura@example.com',
        subject: 'Urgency',
        message: 'the system is very cool,  but where should i go to get the registrar ?'
    };
    const fullname = page.formgroup.get('fullname');
    const email = page.formgroup.get('email');
    const subject = page.formgroup.get('subject');
    const message = page.formgroup.get('message');

    fullname.setValue('Surafel Habte');
    email.setValue('sura@gmail.com');
    subject.setValue('Urgency');
    message.setValue('the system is very cool,  but where should i go to get the registrar ?');

    contactusService.sendMessage(messages).subscribe((data: any) => {
        expect(page.closeAlert).toBeTruthy();
        expect(fullname.setValue('')).toBeTruthy();
        expect(email.setValue('')).toBeTruthy();
        expect(subject.setValue('')).toBeTruthy();
        expect(message.setValue('')).toBeTruthy();
    });
  });

});
