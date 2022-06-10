import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from 'src/app/index/Services/index.service';
@Component({
  selector: 'app-assessment-plan-view',
  templateUrl: './assessment-plan-view.component.html',
  styleUrls: ['./assessment-plan-view.component.css']
})
export class AssessmentPlanViewComponent implements OnInit {
  public assessments: any[] = [];
  public filterd: any[];

  constructor(private service?: IndexService, private router?: Router) {}

  ngOnInit(): void {
    this.service.Assessment_Gets(localStorage.getItem('userId'))
      .subscribe((data: any) => {  
        this.assessments = data;
        this.filterd = data;
    });
  }

  onEdit(id: any){
   this.router.navigate(["index/assessment-plan/edit/" + id])
  }

  onDelete(id: any){
    if(confirm('Are You Sure Want to Delete This plan ?')){
      this.service.Assessment_Delete(id)
      .subscribe((response: any) => {  
        response.message ? this.ngOnInit() : alert(response.message);
      });
    }
  }

  onAdd(){
    this.router.navigate(["index/assessment-plan/create"])
  }

  filter(value?: any) {
    if (value !== undefined) {
      this.filterd = [];
      this.assessments.forEach(assess => {
        if (assess.full_name.toLowerCase().indexOf(value.toLowerCase()) > -1 || assess.occ_name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          this.filterd.push(assess);
        }
      });

    } else {
      this.filterd = [];
      this.filterd = this.assessments;
    }

  }

}
