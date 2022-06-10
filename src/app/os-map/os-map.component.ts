import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../studentManagement/services/student.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-os-map',
  templateUrl: './os-map.component.html',
  styleUrls: ['./os-map.component.css']
})
export class OsMapComponent implements OnInit {
  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public sector: any[] = [];
  public subsector: any[] = [];
  public occupations: any[] = [];
  public unitOfCompetency: any[] = [];
  public amount_for_uc: any;
  public amount_for_level: any;
  public showAmount = false;

  constructor(private studentService: StudentService,
              private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup({
      sector: new FormControl('', Validators.required),
      subSector: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      unitOfCompetency: new FormControl('')
    });
  }

  ngOnInit() {
    this.studentService.get('/os/OS/sector').subscribe((data: any) => {
      this.sector = data;
    });
  }

  loadingSubSector() {
    this.studentService
      .get('/os/OS/subsector/?parent=' + this.getsector.value)
      .subscribe((data: any) => {
        this.subsector = data;
        this.showAmount = false;
        this.occupations = [];
        this.unitOfCompetency = [];
      });
  }

  loadingOccupation() {
    this.showAmount = false;
    this.studentService
      .get('/os/OS/occupation/?sector_code=' + this.getsubSector.value)
      .subscribe((data: any) => {
        this.occupations = data;
      });
  }

  loadingUC(occupationCode: any) {
    this.showAmount = false;
    this.studentService.get('/os/OS/uc/?occ_code=' + this.getoccupation.value)
      .subscribe((data: any) => {
        this.unitOfCompetency = data;
        this.showAmount = true;
      });

    const uc = this.occupations.filter((occupation) => {
      return occupation.occ_code === occupationCode;
    });
    this.amount_for_level = uc[0].amount_for_level;
    this.amount_for_uc = uc[0].amount_for_uc;
  }

  get getsector(): FormControl {
    return this.formgroup.get('sector') as FormControl;
  }
  get getsubSector(): FormControl {
    return this.formgroup.get('subSector') as FormControl;
  }
  get getoccupation(): FormControl {
    return this.formgroup.get('occupation') as FormControl;
  }
  get getunitOfCompetency(): FormControl {
    return this.formgroup.get('unitOfCompetency') as FormControl;
  }
}
