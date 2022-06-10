import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexService } from '../index/Services/index.service';
import { SubscriptionComponent } from './subscription.component';


describe('Subscription component', () => {
    let indexService: IndexService;
    let page: SubscriptionComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [IndexService]
      });
      page = new SubscriptionComponent(indexService);
      // inject the service
      indexService = TestBed.get(IndexService);
    });


    it('Subscription component : form should have a control', () => {
      expect(page.formgroup.contains('email')).toBeTruthy();
    });

  // validation
    it('Subscription component : form control should have a validation required and email', () => {
    const email = page.formgroup.get('email');

    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('su');
    expect(email.valid).toBeFalsy();

    });

   // expecting the correct(but faked) result: propery with value
    it('Should register the user to subscription News list', () => {
    const user = {
        id: 1,
        fullName: 'Surafel Habte',
        email: 'Sura@gmail.com',
    };
    const email = page.formgroup.get('email');
    const spyWindow = spyOn(window, 'alert');

    email.setValue('sura@gmail.com');

    indexService.subscribe(user).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith
      ('Thank You For your Subscription. We will update you with the latest news as soon as we can !');
    });
  });



});
