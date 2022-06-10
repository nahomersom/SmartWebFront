import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../services/student.service';
import { StudentApplicationComponent } from './student-application.component';


describe('Student Application Component', () => {
    let studentService: StudentService;
    let page: StudentApplicationComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [StudentService]
      });
      page = new StudentApplicationComponent(studentService);

      // inject the service
      studentService = TestBed.get(StudentService);
    });


    it('Student Application Component: form should have a control', () => {
      expect(page.formgroup.contains('sector')).toBeTruthy();
      expect(page.formgroup.contains('subSector')).toBeTruthy();
      expect(page.formgroup.contains('occupation')).toBeTruthy();
      expect(page.formgroup.contains('unitOfCompetency')).toBeTruthy();
      expect(page.formgroup.contains('location')).toBeTruthy();
      expect(page.formgroup.contains('amount')).toBeTruthy();
      expect(page.formgroup.contains('amountRequired')).toBeTruthy();
      expect(page.formgroup.contains('invoiceNumber')).toBeTruthy();


  });

  // validation
    it('Student Application Component : form control should have a validation required', () => {
    const sector = page.formgroup.get('sector');
    const subsector = page.formgroup.get('subSector');
    const occupations = page.formgroup.get('occupation');
    const amount = page.formgroup.get('amount');
    const invoiceNumber = page.formgroup.get('invoiceNumber');


    sector.setValue('');
    expect(sector.valid).toBeFalsy();

    subsector.setValue('');
    expect(subsector.valid).toBeFalsy();

    occupations.setValue('');
    expect(occupations.valid).toBeFalsy();

    amount.setValue('');
    expect(amount.valid).toBeFalsy();

    invoiceNumber.setValue('');
    expect(invoiceNumber.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should send post application successfull, alert Message and redirect the user', () => {

    const sector = page.formgroup.get('sector');
    const subsector = page.formgroup.get('subSector');
    const occupation = page.formgroup.get('occupation');
    const unitOfCompetency = page.formgroup.get('unitOfCompetency');
    const location = page.formgroup.get('location');
    const amount = page.formgroup.get('amount');
    const amountRequired = page.formgroup.get('amountRequired');
    const invoiceNumber = page.formgroup.get('invoiceNumber');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');


    sector.setValue('CSTM');
    subsector.setValue('HAH');
    occupation.setValue('HAH CBP3');
    unitOfCompetency.setValue('HAH CBP3');
    location.setValue('5');
    amount.setValue('abcd1234');
    amountRequired.setValue('375');
    invoiceNumber.setValue('212333');

    const application = {
        id: 1,
        location: '5',
        sector: 'CSTM',
        subSector: 'HAH',
        occupation: 'HAH CBP3',
        unitOfCompetency: 'HAH CBP3',
        amount: '375',
        invoiceNumber: '212333',
        email: 'sura@example.com'
    };

    studentService.postData('studentApplication', application).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['Your Application Sent Successfully !']);
      expect(spy).toHaveBeenCalledWith(['index']);

    });
  });


});
