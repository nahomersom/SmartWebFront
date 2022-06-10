import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-members-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public languages = Array('English', 'Amharic', 'Oromifa', 'Harari');
  public selectedLanguage = 0;
  public input = new FormData();
  public passwordMatchFail = false;
  public IdsArray: any[] = [];
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public photoUrl: any = '';
  public CompanyDescRequiredMSG: any;
  public FormArrayErrors: any[] = [];
  public photoName: any = '';

  public active = 1;

  constructor( public memberService: MembersService, private fb: FormBuilder, private router?: Router, private actRoute?: ActivatedRoute,
               private translate?: TranslateService) {
      this.formgroup = new FormGroup
      ({
        fullName : new FormControl('', Validators.required),
        website : new FormControl('', Validators.required),
        phone : new FormControl('', Validators.required),
        gender : new FormControl('', Validators.required),
        email : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
        repassword : new FormControl('', Validators.required),
        profilePhoto : new FormControl('', Validators.required),
        biographys: this.fb.array([])

      });
  }

  ngOnInit() {
    const email = this.actRoute.snapshot.params.id;
    if (email !== undefined) {
      this.memberService.detail(email).subscribe((data: any) => {
        if(data){
          this.getfullName.setValue(data.fullName);
          this.getgender.setValue(data.gender);
          this.getemail.setValue(data.email);
          this.getphone.setValue(data.phone);
          
          if (data.other.length > 0) {
            let loop = 0;
            data.other.forEach(element => {
              this.IdsArray [loop] = element.id;
              const LLA = this.CreateBiography();
              LLA.controls.fullName.setValue(element.fullName);
              LLA.controls.Biography.setValue(element.Biography);
              LLA.controls.Language.setValue(element.language);
              LLA.controls.Address.setValue(element.Address);
              LLA.controls.CompanyContactPerson.setValue(element.ContactPersonName);
              this.getWebsite.setValue(element.Website);
              this.getBiographies.push(LLA);
              this.photoUrl = element.photo;
              this.photoName = element.photoName;
              loop ++;
            });
          }
  
          this.hideCreateButton = false;
          this.hideSaveChangesButton = true;
          this.currentEditingID = data.id;

        }

      });
    }
  }

  validation() {
    if (this.hideCreateButton) {
      if (this.getfullName.errors || this.getWebsite.errors || this.getgender.errors  || this.getemail.errors
        || this.getphone.errors || this.getpassword.errors
       || this.getrepassword.errors || this.getprofilephoto.errors) {
        return true;
      } else {
        if (this.getpassword.value !== this.getrepassword.value) {
          this.passwordMatchFail = true;
          return true;
        }
      }
    } else {
      if (this.getfullName.errors || this.getWebsite.errors || this.getgender.errors  || this.getemail.errors || this.getphone.errors) {
        return true;
      } else {
        if (this.getpassword.value !== this.getrepassword.value) {
          this.passwordMatchFail = true;
          return true;
        }
      }
    }
  }

  get getfullName(): FormControl {
    return this.formgroup.get('fullName') as FormControl;
  }
  get getWebsite(): FormControl {
    return this.formgroup.get('website') as FormControl;
  }
  get getgender(): FormControl {
    return this.formgroup.get('gender') as FormControl;
  }
  get getemail(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }
  get getphone(): FormControl {
    return this.formgroup.get('phone') as FormControl;
  }
  get getpassword(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }
  get getrepassword(): FormControl {
    return this.formgroup.get('repassword') as FormControl;
  }
  get getprofilephoto(): FormControl {
    return this.formgroup.get('profilePhoto') as FormControl;
  }
  get getBiographies() {
    return this.formgroup.get('biographys') as FormArray;
  }

  CreateBiography(): FormGroup {
    return this.fb.group({
      fullName : new FormControl('', Validators.required),
      Biography : new FormControl('', Validators.required),
      Language : new FormControl('', Validators.required),
      Address : new FormControl('', Validators.required),
      CompanyContactPerson : new FormControl('', Validators.required)
    });
  }

  addBiography() {
    const LLA =  this.CreateBiography();
    this.getBiographies.push(LLA);
    this.selectedLanguage ++;
  }

  RemoveBiography(index: number, databaseId: any): any {
    const conf = confirm('Are you sure you want to delete');
    const data = this.getBiographies;
    if (conf) {
      return this.memberService.remove(databaseId).subscribe((response:any) => {
        if (response.status) {
          this.IdsArray.splice(index, 1);
          data.removeAt(index);
          this.selectedLanguage --;

        } else {
          alert('Error occured While Deleting ...');
          
        }

      });
    }

  }

  onFileChangeIDCard(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.getprofilephoto.setValue(i[0].rawFile);
    }
  }

  private prepareSave(): any {
    this.input.append('fullName', this.formgroup.controls.fullName.value);
    this.input.append('email', this.formgroup.controls.email.value);
    this.input.append('phone', this.formgroup.controls.phone.value);
    this.input.append('password', this.formgroup.controls.password.value);
    this.input.append('photo', this.getprofilephoto.value ? this.getprofilephoto.value  : this.photoUrl);
    this.input.append('gender', this.formgroup.controls.gender.value);
    this.input.append('member', 'True');
    this.input.append('status', 'Not-Activated');
    return this.input;
  }

  onSubmit(): any {
    const data = this.getBiographies.controls;
    const Biographies: any[] = [];
    if (this.validation()) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
    } else {
      if (this.getBiographies.length === 0) {
        this.CompanyDescRequiredMSG = 'Write Some Thing About The Company By Click On the Add Language Button';
        return;
      } else {
        if (!this.checkFormArrayError()) {
          alert('Please fill all the required field in the Company Description form');
          return;
        }
        if (this.hideSaveChangesButton) {
              let loop = 0;
              data.forEach(element => {
                const newData =  {
                  id : this.IdsArray[loop],
                  email: this.getemail.value,
                  fullName: element.value.fullName,
                  Biography : element.value.Biography,
                  language : element.value.Language,
                  Address : element.value.Address,
                  Website : this.getWebsite.value,
                  ContactPersonName : element.value.CompanyContactPerson,
                  photo : this.photoUrl,
                  photoName : this.photoName
                };
                Biographies.push(newData);
                loop ++;
                });
        } else {
          data.forEach(element => {
            const newData =  {
              email: this.getemail.value,
              fullName: element.value.fullName,
              Biography : element.value.Biography,
              language : element.value.Language,
              Address : element.value.Address,
              Website : this.getWebsite.value,
              ContactPersonName : element.value.CompanyContactPerson,
            };
            Biographies.push(newData);
            });
        }
        const other = JSON.stringify(Biographies);
        this.input.append('other', other);
        const formData = this.prepareSave();
        if (this.hideCreateButton) {
                this.memberService.create(formData)
                      .subscribe((response: any) => {
                        if(response.status){
                          window.alert('You Registerd As a Member Successfully !');
                          this.router.navigate(['/index']);
                        }
                      });
              } else {
              this.input.append('id', this.currentEditingID);
              this.memberService.update(formData)
              .subscribe((response: any) => {
                if(response.status){
                  window.alert('You Update Your Profile Successfully !');
                  this.router.navigate(['/index']);
                }
              });
            }
        }
      }
  }

  getFormGroup(index): FormGroup {
    const formGroup = this.getBiographies.controls[index] as FormGroup;
    return formGroup;
  }

  checkFormArrayError(): boolean {
    const FormArrayErrors: any[] = [];
    if (this.getBiographies.length !== 0) {
      const FormArrayData = this.getBiographies.controls;
      FormArrayData.forEach(element => {
        if (element.invalid) {
          FormArrayErrors.push(true);
        }
      });
      if (FormArrayErrors.length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

}
