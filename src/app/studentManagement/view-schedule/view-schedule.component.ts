import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  public tableData: any[] = [];
  public columens = ['#', 'Occupation', 'Group Number', 'Center', 'Date','Time'];
  public heading = 'Student Exam Schedule';


  constructor(private studentService: StudentService, private translate?: TranslateService) { }

  ngOnInit() {
  this.studentService.get('/student/schedule/?email=' + localStorage.getItem('userEmail'))
    .subscribe((data: any[]) => {
      this.tableData = data;
      });
  }

}
