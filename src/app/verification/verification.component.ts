import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../studentManagement/services/student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../studentManagement/shared/modal/modal.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  closeResult: string;

  constructor(private beService: StudentService, private modalService: NgbModal, private translate?: TranslateService) {
    this.formgroup = new FormGroup({
      certificationCode : new FormControl('', Validators.required),
    });
  }

  open(data: any) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = data;
  }

  ngOnInit() {}

  get certifiCode(): FormControl {
    return this.formgroup.get('certificationCode') as FormControl;
  }

  onSubmit(): any {
      if (this.certifiCode.errors) {
            this.formSubmitted = true;
            this.invalidClass = true;
            return;
      } else {
        this.invalidClass = false;
        this.beService.get('/student/certification/?certification_code=' + this.formgroup.controls.certificationCode.value)
        .subscribe((data: any) => {
          if (data) {
            this.open(data);
          } else {
            alert('User Information Not Found !');
          }
        });
      }
  }
}
