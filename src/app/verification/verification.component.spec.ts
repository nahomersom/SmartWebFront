import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerificationComponent } from './verification.component';
import { StudentService } from '../studentManagement/services/student.service';


describe('Candidate verification component', () => {
    let studentService: StudentService;
    let modalService: NgbModal;
    let page: VerificationComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule, NgbModule],
        providers: [StudentService, NgbModal]
      });
      page = new VerificationComponent(studentService, modalService);
      // inject the service
      studentService = TestBed.get(StudentService);
      modalService = TestBed.get(NgbModal);
    });

    it('Verification component : form should have a control', () => {
      expect(page.formgroup.contains('certificationCode')).toBeTruthy();
    });

    // validation
    it('Verification component : form control should have a validation required', () => {
    const certificationCode = page.formgroup.get('certificationCode');

    certificationCode.setValue('');
    expect(certificationCode.valid).toBeFalsy();

    });

   // expecting the correct(but faked) result: propery with value
    it('Should verifay the code and show modal box', () => {
    const certificationCode = page.formgroup.get('certificationCode');
    certificationCode.setValue(1);
    const spy = spyOn(page, 'open');

    studentService.getVerification(certificationCode.value)
    .subscribe((data: any[]) => {
        expect(spy).toHaveBeenCalledWith(data);
    });

    });

});
