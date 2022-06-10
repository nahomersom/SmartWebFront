import { StudentService } from '../studentManagement/services/student.service';
import { CandidateProfileComponent } from './candidate-profile.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { Router } from '@angular/router';

describe('Candidate profile component', () => {
    let stuService: StudentService;
    let router: Router;
    let page: CandidateProfileComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule, NgbModule,
            AngularMultiSelectModule, UploaderModule],
        providers: []
      });
      // inject the service
      stuService = TestBed.get(StudentService);
      router = TestBed.get(Router);
      page = new CandidateProfileComponent(stuService, router);

    });

    it(': form should have a control', () => {
      expect(page.formgroup.contains('fullName')).toBeTruthy();
      expect(page.formgroup.contains('gender')).toBeTruthy();
      expect(page.formgroup.contains('nationality')).toBeTruthy();
      expect(page.formgroup.contains('institute')).toBeTruthy();
      expect(page.formgroup.contains('modeOfTraining')).toBeTruthy();
      expect(page.formgroup.contains('occupationTrainedOn')).toBeTruthy();
      expect(page.formgroup.contains('subcity')).toBeTruthy();
      expect(page.formgroup.contains('wereda')).toBeTruthy();
      expect(page.formgroup.contains('homePhone')).toBeTruthy();
      expect(page.formgroup.contains('officephone')).toBeTruthy();
      expect(page.formgroup.contains('martialStatus')).toBeTruthy();
      expect(page.formgroup.contains('disability')).toBeTruthy();
      expect(page.formgroup.contains('natureOfDisability')).toBeTruthy();
      expect(page.formgroup.contains('email')).toBeTruthy();
      expect(page.formgroup.contains('location')).toBeTruthy();
      expect(page.formgroup.contains('sector')).toBeTruthy();
      expect(page.formgroup.contains('subSector')).toBeTruthy();
      expect(page.formgroup.contains('occupation')).toBeTruthy();
      expect(page.formgroup.contains('unitOfCompetency')).toBeTruthy();
      expect(page.formgroup.contains('amount')).toBeTruthy();
      expect(page.formgroup.contains('amountRequired')).toBeTruthy();
      expect(page.formgroup.contains('invoiceNumber')).toBeTruthy();
      expect(page.formgroup.contains('IDCard')).toBeTruthy();
      expect(page.formgroup.contains('Photo')).toBeTruthy();
      expect(page.formgroup.contains('Certificate')).toBeTruthy();

    });

  // validation
    it(': form control should have a validation required and Email', () => {
    const fullName = page.formgroup.get('fullName');
    const gender = page.formgroup.get('gender');
    const nationality = page.formgroup.get('nationality');
    const institute = page.formgroup.get('institute');
    const modeOfTraining = page.formgroup.get('modeOfTraining');
    const occupationTrainedOn = page.formgroup.get('occupationTrainedOn');
    const subcity = page.formgroup.get('subcity');
    const wereda = page.formgroup.get('wereda');
    const homePhone = page.formgroup.get('homePhone');
    const officephone = page.formgroup.get('officephone');
    const martialStatus = page.formgroup.get('martialStatus');
    const disability = page.formgroup.get('disability');
    const email = page.formgroup.get('email');
    const sector = page.formgroup.get('sector');
    const subSector = page.formgroup.get('subSector');
    const occupation = page.formgroup.get('occupation');
    const amount = page.formgroup.get('amount');
    const invoiceNumber = page.formgroup.get('invoiceNumber');
    const IDCard = page.formgroup.get('IDCard');
    const Photo = page.formgroup.get('Photo');
    const Certificate = page.formgroup.get('Certificate');

    fullName.setValue('');
    expect(fullName.valid).toBeFalsy();

    gender.setValue('');
    expect(gender.valid).toBeFalsy();

    nationality.setValue('');
    expect(nationality.valid).toBeFalsy();

    institute.setValue('');
    expect(institute.valid).toBeFalsy();

    modeOfTraining.setValue('');
    expect(modeOfTraining.valid).toBeFalsy();

    email.setValue('');
    expect(email.valid).toBeFalsy();

    occupationTrainedOn.setValue('');
    expect(occupationTrainedOn.valid).toBeFalsy();

    subcity.setValue('');
    expect(subcity.valid).toBeFalsy();

    wereda.setValue('');
    expect(wereda.valid).toBeFalsy();

    homePhone.setValue('');
    expect(homePhone.valid).toBeFalsy();

    officephone.setValue('');
    expect(officephone.valid).toBeFalsy();

    martialStatus.setValue('');
    expect(martialStatus.valid).toBeFalsy();

    disability.setValue('');
    expect(disability.valid).toBeFalsy();

    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('bfdgdfgfd');
    expect(email.valid).toBeFalsy();


    sector.setValue('');
    expect(sector.valid).toBeFalsy();

    subSector.setValue('');
    expect(subSector.valid).toBeFalsy();

    occupation.setValue('');
    expect(occupation.valid).toBeFalsy();

    amount.setValue('');
    expect(amount.valid).toBeFalsy();

    invoiceNumber.setValue('');
    expect(invoiceNumber.valid).toBeFalsy();

    IDCard.setValue('');
    expect(IDCard.valid).toBeFalsy();

    Photo.setValue('');
    expect(Photo.valid).toBeFalsy();

    Certificate.setValue('');
    expect(Certificate.valid).toBeFalsy();


    });

    it('Should load location items and populate drop down list', () => {
        const response = {
            id: '1',
            location: 'Megenagn'
        };

        stuService.getApplicationData('location')
        .subscribe((data: any[]) => {
          page.location = data;
          expect(page.location).toBeGreaterThan(0);
          });

    });

    it('Should load sector items and populate drop down list', () => {
        const response = {
            id: '1',
            sector_code: 'HLTM',
            sector_name: 'HEALTH ',
            status: 'Active'
        };

        stuService.getApplicationData('sector')
        .subscribe((data: any[]) => {
          page.sector = data;
          expect(page.sector).toBeGreaterThan(0);
          });

    });

    it('Should load sub sector items and populate drop down list', () => {
        const response = {
            id: '12',
            parent: 'CSTM',
            sector_code: 'SPT',
            sector_name: 'THROWING AND JUMPING',
            status: 'Active'
        };

        stuService.getApplicationData('subsector', page.getsector.value, 'parent')
        .subscribe((data: any[]) => {
          page.subsector = data;
          expect(page.subsector).toBeGreaterThan(0);
          expect(page.occupations).toBeLessThanOrEqual(0);
          expect(page.unitOfCompetency).toBeLessThanOrEqual(0);

        });

    });

    it('Should load occupation items and populate drop down list', () => {
        const response = {
            amount_for_level: '375',
            ass_type: 'Both',
            assessor_payment_rate: '0',
            center_payment_rate: '0',
            level: '3',
            occ_code: 'HAH CBP3',
            occ_name: 'Confectionery, Baking and Pastry Making ',
            sector_code: 'HAH',
            sector_name: 'HOTEL AND HOSPITALITY',
        };

        stuService.getApplicationData('occupation', page.getsubSector.value, 'sector_code')
        .subscribe((data: any[]) => {
          page.occupations = data;
          expect(page.occupations).toBeGreaterThan(0);
        });

    });

    it('Should load Unit Of Competency items and populate drop down list', () => {
        const response = {
            id: '2891',
            occ_code: 'HAH CBP3',
            status: 'Active',
            uc_code: 'HAH CBP3 01 0912',
            uc_name: 'Prepare and Produce Pastries'
        };

        stuService.getApplicationData('unit_of_competency', page.getoccupation.value, 'occ_code')
        .subscribe((data: any[]) => {
          page.dataForMultiSelection = data;
          expect(page.dataForMultiSelection).toBeGreaterThan(0);
        });

    });


});
