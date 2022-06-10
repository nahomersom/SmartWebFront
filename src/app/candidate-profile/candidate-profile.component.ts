import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../studentManagement/services/student.service';
import { Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  public is_member = false;

  public profile_form_group: FormGroup;
  public application_form_group: FormGroup;

  public formSubmitted = false;
  public invalidClass = false;

// application form variables
  public sector: any[] = [];
  public subsector: any[] = [];
  public occupations: any[] = [];
  public unitOfCompetency: any[] = [];
  public location: any[] = [];
  public showUnitOfCompetency = false;
  public amountRequired = 0;
  public currentSelectedCode: any;
  public requiredPrice: any;

  public dataForMultiSelection = [];
  public settings = {text: '-- Select --', selectAllText: 'Select All', unSelectAllText: 'UnSelect All', classes: 'myclass custom-class'};

  public loading: boolean;

  public input = new FormData();

  constructor( private studentService: StudentService, private router?: Router, private translate?: TranslateService) {
    this.profile_form_group = new FormGroup
    ({
      id: new FormControl(null),
      fullName : new FormControl('', Validators.required),
      gender : new FormControl('', Validators.required),
      nationality : new FormControl('', Validators.required),
      institute : new FormControl('', Validators.required),
      modeOfTraining : new FormControl('', Validators.required),
      occupationTrainedOn : new FormControl('', Validators.required),
      subcity : new FormControl('', Validators.required),
      wereda : new FormControl('', Validators.required),
      homePhone : new FormControl('', Validators.required),
      officephone : new FormControl('', Validators.required),
      martialStatus : new FormControl('', Validators.required),
      disability : new FormControl('', Validators.required),
      natureOfDisability : new FormControl(''),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      IDCard : new FormControl(''),
      Photo : new FormControl(''),
      Certificate : new FormControl('')
    });

    this.application_form_group = new FormGroup ({
      location : new FormControl(''),
      sector : new FormControl('', Validators.required),
      subSector : new FormControl('', Validators.required),
      occupation : new FormControl('', Validators.required),
      unitOfCompetency : new FormControl([]),
      amount : new FormControl('', Validators.required),
      amountRequired : new FormControl(''),
      invoiceNumber : new FormControl('', Validators.required),
      Invoice : new FormControl(null)
    });

  }

  get_controls(name) {
    return this.profile_form_group.get(name) as FormControl;
  }

  get_application_controls(name) {
    return this.application_form_group.get(name) as FormControl;
  }

  ngOnInit() {
    this.studentService.get('/os/OS/location').subscribe((data: any) => {
      this.location = data;
    });

    this.studentService.get('/os/OS/sector').subscribe((data: any) => {
      this.sector = data;
    });

    this.get_controls('natureOfDisability').disable();

    if (localStorage.getItem('member') === 'True') {
      this.is_member = true;

    }
  }

  onSubmit(): any {
    if (this.profile_form_group.invalid || this.application_form_group.invalid) {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;

    } else {
      this.loading = true;
      this.studentService.create('/student/application', this.prepareSave())
      .subscribe((response: any) => {
        if (response.status) {
          window.alert('Your Application Sent Successfully !');
          this.router.navigate(['/index']);

        } else {
          window.alert(response.message);

        }

      });
    }
  }

  setValidation() {
    if (this.get_controls('disability').value === 'yes') {
      this.get_controls('natureOfDisability').setValidators(Validators.required);
      this.get_controls('natureOfDisability').enable();

    } else {
      this.get_controls('natureOfDisability').clearValidators();
      this.get_controls('natureOfDisability').setValue('');
      this.get_controls('natureOfDisability').disable();

    }
  }

  loadingSubSector() {
    this.studentService.get('/os/OS/subsector/?parent=' + this.get_application_controls('sector').value)
    .subscribe((data: any) => {
      this.subsector = data;
      this.occupations = [];
      this.unitOfCompetency = [];
    });
  }

  loadingOccupation() {
    this.studentService.get('/os/OS/occupation/?sector_code=' + this.get_application_controls('subSector').value)
    .subscribe((data: any) => {
      this.occupations = data;
    });

  }

  loadingUC() {
    let occCode = this.get_application_controls('occupation');
    occCode = (occCode) ? occCode.value : '';
    let price: any ;
    this.dataForMultiSelection = [];

    this.studentService.get('/os/OS/uc/?occ_code=' + this.get_application_controls('occupation').value)
    .subscribe((data: any) => {

      data.forEach(element => { this.dataForMultiSelection.push({ id: element.uc_code, itemName: element.uc_name }); });
    });

    this.studentService.get('/os/OS/occupation/?sector_code=' + this.get_application_controls('subSector').value)
    .subscribe((data: any[]) => {
    });

    const occu: any = this.occupations.filter(e => e.occ_code === this.get_application_controls('occupation').value);

    if (occu[0].level > 2) {
      this.get_controls('Certificate').setValidators(Validators.required);
      this.get_controls('Certificate').updateValueAndValidity();

    } else {
      this.get_controls('Certificate').clearValidators();
      this.get_controls('Certificate').updateValueAndValidity();

    }

    this.occupations.filter((value) => { if (value.occ_code === occCode) { price = value.amount_for_level; } });
    this.requiredPrice = price;
    this.get_application_controls('amountRequired').setValue(price + ' Birr');

  }

  uniOfCompetencyChanged() {
    this.showUnitOfCompetency = !this.showUnitOfCompetency;
  }

  updateAmountRequired(amount: any) {
    this.get_application_controls('amountRequired').setValue(this.get_application_controls('occupation').value);
  }

  private prepareSave(): any {

    const profile =  {
      id : this.get_controls('id').value,
      fullName : this.get_controls('fullName').value,
      gender : this.get_controls('gender').value,
      nationality : this.get_controls('nationality').value,
      institute : this.get_controls('institute').value,
      modeOfTraining : this.get_controls('modeOfTraining').value,
      occupationTrainedOn : this.get_controls('occupationTrainedOn').value,
      subcity : this.get_controls('subcity').value,
      wereda : this.get_controls('wereda').value,
      homePhone : this.get_controls('homePhone').value,
      officephone : this.get_controls('officephone').value,
      martialStatus : this.get_controls('martialStatus').value,
      disability : this.get_controls('disability').value,
      natureOfDisability : this.get_controls('natureOfDisability').value,
      email : this.get_controls('email').value
    };

    const user = {
      fullName : this.get_controls('fullName').value,
      gender : this.get_controls('gender').value,
      email : this.get_controls('email').value,
      password : this.get_controls('password').value
    };

    this.input.append('location', this.get_application_controls('location').value);
    this.input.append('sector', this.get_application_controls('sector').value);
    this.input.append('subSector', this.get_application_controls('subSector').value);
    this.input.append('occupation', this.get_application_controls('occupation').value);
    this.input.append('unitOfCompetency', JSON.stringify(this.get_application_controls('unitOfCompetency').value));
    this.input.append('amount', this.get_application_controls('amount').value);
    this.input.append('invoiceNumber', this.get_application_controls('invoiceNumber').value);
    this.input.append('email', this.get_controls('email').value);
    this.input.append('other', JSON.stringify(profile));
    this.input.append('user', JSON.stringify(user));

    if (localStorage.getItem('userId')) {
      this.input.append('college_id', localStorage.getItem('userId'));
    }

    return this.input;

  }

  onFileChangeIDCard(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.get_controls('IDCard').setValue(i[0].rawFile);
      this.input.append('IDCard', i[0].rawFile);
    }

  }

  onFileChangePhoto(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.get_controls('Photo').setValue(i[0].rawFile);
      this.input.append('Photo', i[0].rawFile);
    }
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
      this.get_application_controls('Invoice').setValue(i[0].rawFile);
      this.input.append('Invoice', i[0].rawFile);
    }
  }

  onSearch(e, value) {
    if (e.code === 'Enter' && value.length > 0) {
      this.studentService.search({ email: value }).subscribe((data: any) => {
        if (data !== null) {
          delete data.created_date;
          this.profile_form_group.setValue(data);
          this.get_controls('email').disable();

          this.get_controls('password').clearValidators();
          this.get_controls('password').updateValueAndValidity();

        } else {
          alert('Candidate Not Found.');
          this.profile_form_group.reset();
        }
      });
    }
  }

}
