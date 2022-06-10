import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../services/student.service';
import { ViewScheduleComponent } from './view-schedule.component';


describe('View Student Schedule component', () => {
    let studentService: StudentService;
    let page: ViewScheduleComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [StudentService]
      });
      page = new ViewScheduleComponent(studentService);

      // inject the service
      studentService = TestBed.get(StudentService);
    });

    it('Should load Student Schedule and populate table ', () => {
    const response = {
        id: 1,
        occupation: 'clerical nurse',
        Group_Number: '7038',
        Center: 'National College',
        Date: '03/05/2019',
        Time: '02 : 30 Am'

    };

    studentService.getData('studentschedule', 1).subscribe((data: any) => {
        expect(page.tableData).toBeGreaterThan(0);
    });

  });




});
