import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  public tableData: any[] = [];
  public columens = ['#', 'Occupation', 'Practical Result', 'Knowldge Result', 'Status','Certification Code'];
  public heading = 'Student Exam Result';

  constructor(private studentService: StudentService, private translate?: TranslateService) 
  { }

  ngOnInit() {
  this.studentService.get('/student/result/?email=' + localStorage.getItem('userEmail'))
    .subscribe((data: any[]) => {
      this.tableData = data;
      });
  }

  
}
