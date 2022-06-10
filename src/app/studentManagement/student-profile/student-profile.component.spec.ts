import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../services/student.service';
import { StudentProfileComponent } from './student-profile.component';


describe('Student Profile Component', () => {
    let studentService: StudentService;
    let page: StudentProfileComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [StudentService]
      });
      page = new StudentProfileComponent(studentService);

      // inject the service
      studentService = TestBed.get(StudentService);
    });

    it('Student Profile Component: form should have a control', () => {
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

  });

  // validation
    it('Student Profile Component : form control should have a validation required', () => {
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

   

});

   // expecting the correct(but faked) result: propery with value
    it('Should post student profile successfull, alert Message and redirect the user', () => {

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
    const natureOfDisability = page.formgroup.get('natureOfDisability');


    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');


    fullName.setValue('abcd');
    gender.setValue('abcd');
    nationality.setValue('abcd');
    institute.setValue('abcd');
    modeOfTraining.setValue('abcd');
    occupationTrainedOn.setValue('abcd');
    subcity.setValue('abcd');
    wereda.setValue('abcd');
    homePhone.setValue('abcd');
    officephone.setValue('abcd');
    martialStatus.setValue('abcd');
    disability.setValue('abcd');
    natureOfDisability.setValue('abcd');


    const studentprofile = {
        id: 1,
        fullName: 'abcd',
        gender: 'abcd',
        nationality: 'abcd',
        institute: 'abcd',
        modeOfTraining: 'abcd',
        occupationTrainedOn: 'abcd',
        subcity: 'abcd',
        wereda: 'abcd',
        homePhone: 'abcd',
        officephone: 'abcd',
        martialStatus: 'abcd',
        disability: 'abcd',
        natureOfDisability: 'abcd',
        email: 'sura@example.com'
    };

    studentService.postData('studentApplication', studentprofile).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['You Successfully Create Your Profile!']);
      expect(spy).toHaveBeenCalledWith(['index']);

    });
  });

    it('Should featch and fill the the requested data into form controls', () => {
    const fullName = page.formgroup.controls.fullName;
    const gender = page.formgroup.controls.gender;
    const nationality = page.formgroup.controls.nationality;
    const institute = page.formgroup.controls.institute;
    const modeOfTraining = page.formgroup.controls.modeOfTraining;
    const occupationTrainedOn = page.formgroup.controls.occupationTrainedOn;


    studentService.getStudentProfile().subscribe((data: any[]) => {
      fullName.setValue(data[0].fullName);
      gender.setValue(data[0].gender);
      nationality.setValue(data[0].nationality);
      institute.setValue(data[0].institute);
      modeOfTraining.setValue(data[0].modeOfTraining);
      occupationTrainedOn.setValue(data[0].occupationTrainedOn);

      expect(fullName.value).not.toBe('');
      expect(gender.value).not.toBe('');
      expect(nationality.value).not.toBe('');
      expect(institute.value).not.toBe('');
      expect(modeOfTraining.value).not.toBe('');
      expect(occupationTrainedOn.value).not.toBe('');
    });

  });

    it('Should Update student Profile successfull and redirect the student', () => {
    const studentprofile = {
      id: 1,
      fullName: 'abcd',
      gender: 'abcd',
      nationality: 'abcd',
      institute: 'abcd',
      modeOfTraining: 'abcd',
      occupationTrainedOn: 'abcd',
      subcity: 'abcd',
      wereda: 'abcd',
      homePhone: 'abcd',
      officephone: 'abcd',
      martialStatus: 'abcd',
      disability: 'abcd',
      natureOfDisability: 'abcd',
      email: 'sura@example.com'
    };
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
    const natureOfDisability = page.formgroup.get('natureOfDisability');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');

    fullName.setValue('abcd');
    gender.setValue('abcd');
    nationality.setValue('abcd');
    institute.setValue('abcd');
    modeOfTraining.setValue('abcd');
    occupationTrainedOn.setValue('abcd');
    subcity.setValue('abcd');
    wereda.setValue('abcd');
    homePhone.setValue('abcd');
    officephone.setValue('abcd');
    martialStatus.setValue('abcd');
    disability.setValue('abcd');
    natureOfDisability.setValue('abcd');

    studentService.updateDate('studentProfile', studentprofile).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['You Successfully Update Your Profile!']);
      expect(spy).toHaveBeenCalledWith(['index']);
    });
  });

});
