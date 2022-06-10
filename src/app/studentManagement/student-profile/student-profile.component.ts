import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public studentProfile: any;
  public studentBasicInfo: any[] = [];

  constructor( private studentService: StudentService,
               private router?: Router, private actRoute?: ActivatedRoute, private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
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
    });
  }

  ngOnInit() {
    this.studentService.get('/student/profile/?email=' + localStorage.getItem('userEmail'))
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.studentProfile = data;
          this.getfullname.setValue(data[0].fullName);
          this.getgender.setValue(data[0].gender);
          this.getnationality.setValue(data[0].nationality);
          this.getinstitute.setValue(data[0].institute);
          this.getmodeOfTraining.setValue(data[0].modeOfTraining);
          this.getoccupationTrainedOn.setValue(data[0].occupationTrainedOn);

          this.getsubcity.setValue(data[0].subcity);
          this.getwereda.setValue(data[0].wereda);
          this.gethomePhone.setValue(data[0].homePhone);
          this.getofficephone.setValue(data[0].officephone);
          this.getmartialStatus.setValue(data[0].martialStatus);
          this.getDisability.setValue(data[0].disability);
          if (data[0].disability === 'no') {
            this.getNatureOfDisability.disable();
          }
          this.getNatureOfDisability.setValue(data[0].natureOfDisability);
          this.hideCreateButton = false;
          this.hideSaveChangesButton = true;
          this.currentEditingID = data[0].id;
        }
      });
  }

  get getfullname(): FormControl {
    return this.formgroup.get('fullName') as FormControl;
  }
  get getgender(): FormControl {
    return this.formgroup.get('gender') as FormControl;
  }
  get getnationality(): FormControl {
    return this.formgroup.get('nationality') as FormControl;
  }
  get getinstitute(): FormControl {
    return this.formgroup.get('institute') as FormControl;
  }
  get getmodeOfTraining(): FormControl {
    return this.formgroup.get('modeOfTraining') as FormControl;
  }
  get getoccupationTrainedOn(): FormControl {
    return this.formgroup.get('occupationTrainedOn') as FormControl;
  }
  get getsubcity(): FormControl {
    return this.formgroup.get('subcity') as FormControl;
  }
  get getwereda(): FormControl {
    return this.formgroup.get('wereda') as FormControl;
  }
  get gethomePhone(): FormControl {
    return this.formgroup.get('homePhone') as FormControl;
  }
  get getofficephone(): FormControl {
    return this.formgroup.get('officephone') as FormControl;
  }
  get getmartialStatus(): FormControl {
    return this.formgroup.get('martialStatus') as FormControl;
  }
  get getDisability(): FormControl {
    return this.formgroup.get('disability') as FormControl;
  }
  get getNatureOfDisability(): FormControl {
    return this.formgroup.get('natureOfDisability') as FormControl;
  }

  onSubmit(): any {
    this.formSubmitted = true;
    this.invalidClass = true;

    if (this.getsubcity.errors || this.getwereda.errors || this.gethomePhone.errors || this.getofficephone.errors || this.getmartialStatus.errors || this.getDisability.errors || this.getNatureOfDisability.errors) 
    {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;
      
    } else {
      if (this.hideCreateButton) {
        return this.studentService.create('/student/profile_create',
        {
          fullName : this.formgroup.controls.fullName.value,
          gender : this.formgroup.controls.gender.value,
          nationality : this.formgroup.controls.nationality.value,
          institute : this.formgroup.controls.institute.value,
          modeOfTraining : this.formgroup.controls.modeOfTraining.value,
          occupationTrainedOn : this.formgroup.controls.occupationTrainedOn.value,
          subcity : this.formgroup.controls.subcity.value,
          wereda : this.formgroup.controls.wereda.value,
          homePhone : this.formgroup.controls.homePhone.value,
          officephone : this.formgroup.controls.officephone.value,
          martialStatus : this.formgroup.controls.martialStatus.value,
          disability : this.formgroup.controls.disability.value,
          natureOfDisability : this.formgroup.controls.natureOfDisability.value,
          email : localStorage.getItem('userEmail')
        })
          .subscribe((response : any) => {
            if(response.status){
              window.alert('Your Successfully Create Your Profile!');
              this.router.navigate(['index']);
            }

          });
      } else {
        return this.studentService.update('/student/profile_update',
        {
          id: this.currentEditingID,
          fullName : this.formgroup.controls.fullName.value,
          gender : this.formgroup.controls.gender.value,
          nationality : this.formgroup.controls.nationality.value,
          institute : this.formgroup.controls.institute.value,
          modeOfTraining : this.formgroup.controls.modeOfTraining.value,
          occupationTrainedOn : this.formgroup.controls.occupationTrainedOn.value,
          subcity : this.formgroup.controls.subcity.value,
          wereda : this.formgroup.controls.wereda.value,
          homePhone : this.formgroup.controls.homePhone.value,
          officephone : this.formgroup.controls.officephone.value,
          martialStatus : this.formgroup.controls.martialStatus.value,
          disability : this.formgroup.controls.disability.value,
          natureOfDisability : this.formgroup.controls.natureOfDisability.value,
          email : localStorage.getItem('userEmail'),
        })
          .subscribe((response:any) => {
            if(response.status){
              this.currentEditingID = '';
              window.alert('You Successfully Update Your Profile!');
              this.router.navigate(['index']);

            }

          });
      }
    }

  }

  setValidation() {
    if (this.getDisability.value === 'yes') {
      this.getNatureOfDisability.setValidators(Validators.required);
      this.getNatureOfDisability.enable();
    } else {
      this.getNatureOfDisability.clearValidators();
      this.getNatureOfDisability.setValue('');
      this.getNatureOfDisability.disable();
    }
  }

}
