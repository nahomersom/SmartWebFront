import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {
  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public sector: any[] = [];
  public subsector: any[] = [];
  public occupations: any[] = [];
  public unitOfCompetency: any[] = [];
  public location: any[] = [];
  public showUnitOfCompetency = false;
  public amountRequired = 0;
  public currentSelectedCode: any;
  public requiredPrice: any;

  public input = new FormData();
  public loading: boolean;


  dataForMultiSelection = [];
  settings = {text: '-- Select --', selectAllText: 'Select All', unSelectAllText: 'UnSelect All', classes: 'myclass custom-class'};

  constructor( private studentService: StudentService, private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
      location : new FormControl(''),
      sector : new FormControl('', Validators.required),
      subSector : new FormControl('', Validators.required),
      occupation : new FormControl('', Validators.required),
      unitOfCompetency : new FormControl([]),
      amount : new FormControl('', Validators.required),
      amountRequired : new FormControl(''),
      invoiceNumber : new FormControl('', Validators.required),
      Invoice : new FormControl('', Validators.required),
      Certificate : new FormControl(null),

    });
  }

  ngOnInit() {
    this.studentService.get('/os/OS/location').subscribe((data: any) => {
      this.location = data;
    });

    this.studentService.get('/os/OS/sector').subscribe((data: any) => {
      this.sector = data;
    });
  }

  get_controls(name) {
    return this.formgroup.get(name) as FormControl;
  }


  loadingSubSector() {
    this.studentService.get('/os/OS/subsector/?parent=' + this.get_controls('sector').value)
    .subscribe((data: any) => {
      this.subsector = data;
      this.occupations = [];
      this.unitOfCompetency = [];
    });
  }

  loadingOccupation() {
    this.studentService.get('/os/OS/occupation/?sector_code=' + this.get_controls('subSector').value)
    .subscribe((data: any) => {
      this.occupations = data;
    });
  }

  loadingUC() {
    const occCode = this.get_controls('occupation').value;
    let price: any ;
    this.dataForMultiSelection = [];
    this.studentService.get('/os/OS/uc/?occ_code=' + this.get_controls('occupation').value)
    .subscribe((data: any) => {
      data.forEach(element => {
        this.dataForMultiSelection.push({ id: element.uc_code, itemName: element.uc_name });
      });
    });

    this.occupations.filter((value) => {
        if (value.occ_code === occCode) {
          price = value.amount_for_level;
        }
      });
    this.requiredPrice = price;
    this.get_controls('amountRequired').setValue(price + ' Birr');

    const occu: any = this.occupations.filter(e => e.occ_code === this.get_controls('occupation').value);

    if (occu[0].level > 2) {
      this.get_controls('Certificate').setValidators(Validators.required);
      this.get_controls('Certificate').updateValueAndValidity();

    } else {
      this.get_controls('Certificate').clearValidators();
      this.get_controls('Certificate').updateValueAndValidity();

    }

  }

  private prepareSave(): any {
    this.input.append('location', this.get_controls('location').value);
    this.input.append('sector', this.get_controls('sector').value);
    this.input.append('subSector', this.get_controls('subSector').value);
    this.input.append('occupation', this.get_controls('occupation').value);
    this.input.append('unitOfCompetency', JSON.stringify(this.get_controls('unitOfCompetency').value));
    this.input.append('amount', this.get_controls('amount').value);
    this.input.append('invoiceNumber', this.get_controls('invoiceNumber').value);
    this.input.append('Invoice', this.get_controls('Invoice').value);
    this.input.append('email', localStorage.getItem('userEmail'));

    return this.input;

  }

  onFileChangeCertificate(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.get_controls('Certificate').setValue(i[0].rawFile);
      this.input.append('Certificate', i[0].rawFile);
    }
  }

  onFileChangeInvoice(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.get_controls('Invoice').setValue(i[0].rawFile);
      this.input.append('Invoice', i[0].rawFile);
    }
  }

  uniOfCompetencyChanged() {
      this.showUnitOfCompetency = !this.showUnitOfCompetency;
  }

  updateAmountRequired(amount: any) {
    this.get_controls('amountRequired').setValue(this.get_controls('occupation').value);
  }

  onSubmit() {
    if (this.formgroup.invalid) {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;

    } else {
      this.loading = true;
      this.studentService.create('/student/application', this.prepareSave())
      .subscribe((response: any) => {
        if (response.status) {
          alert('Your Application Sent Successfully !');
          this.router.navigate(['index']);

        } else {
          alert(response.message);

        }

        this.loading = false;
      });
    }
  }

}


