import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from '../../services/student.service';
import { IndexService } from 'src/app/index/Services/index.service';

@Component({
  selector: 'app-assessment-plan',
  templateUrl: './assessment-plan.component.html',
  styleUrls: ['./assessment-plan.component.css']
})
export class AssessmentPlanComponent implements OnInit {
  public occupations: any [] = [];

  public formGroup: FormGroup;
  public formSubmitted = false;
  public loading = false;
  public invalidClass = false;
  public id: any = undefined;
  public sector: any[] = [];
  public subSector: any[] = [];
  private translate?: TranslateService;

  constructor(private studentService: StudentService,
              private actRoute?: ActivatedRoute,
              private router?: Router, private service?: IndexService) {
    this.formGroup = new FormGroup({
      id : new FormControl(''),
      sector : new FormControl('', Validators.required),
      subSector : new FormControl('', Validators.required),
      full_name : new FormControl('', [Validators.required]),
      occ_code : new FormControl('', [Validators.required]),
      date : new FormControl('', [Validators.required]),
      college_id : new FormControl(localStorage.getItem('userId')),
    });
  }

  get_controls(name) {
    return this.formGroup.get(name) as FormControl;
  }

  loadingSubSector() {
    this.studentService.get('/os/OS/subsector/?parent=' + this.get_controls('sector').value)
    .subscribe((data: any) => {
      this.subSector = data;
      if (this.id) {
        this.loadingOccupation();
      }
    });
  }

  loadingOccupation() {
    this.studentService.get('/os/OS/occupation/?sector_code=' + this.get_controls('subSector').value)
    .subscribe((data: any) => {
      this.occupations = data;
    });
  }

  ngOnInit() {
    this.loadSector();
    this.id = this.actRoute.snapshot.params.id;

    if (this.id !== undefined) {
      this.service.Assessment_Get(this.id)
       .subscribe((data: any) => { this.formGroup.setValue(data); this.loadingSubSector();  });
    }

  }

  getControls(name): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  Submit(): any {
    if (this.formGroup.invalid) {
      this.formSubmitted = true;
      return;

    } else {
      this.loading = true;
      if (this.id === undefined) {
        this.service.Assessment_Create(this.formGroup.value)
        .subscribe((response: any) => {
          response.status ? this.router.navigate(['/index/assessment-plan/view']) : alert(response.message);
        });

      } else {
        this.service.Assessment_Update(this.formGroup.value)
        .subscribe((response: any) => {
          response.status ? this.router.navigate(['/index/assessment-plan/view']) : alert(response.message);
        });

      }
    }

  }

  cancel() {
    this.router.navigate(['index/assessment-plan/view']);
  }

  load_Occupations() {
    this.service.Occupations().subscribe((data: any) => { this.occupations = data; });
  }
  loadSector() {
    this.studentService.get('/os/OS/sector').subscribe((data: any) => {
      this.sector = data;
    });
  }

}
