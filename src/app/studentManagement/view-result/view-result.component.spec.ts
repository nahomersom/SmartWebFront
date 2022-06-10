import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../services/student.service';
import { ViewResultComponent } from './view-result.component';


describe('View Student Result component', () => {
    let studentService: StudentService;
    let page: ViewResultComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [StudentService]
      });
      page = new ViewResultComponent(studentService);

      // inject the service
      studentService = TestBed.get(StudentService);
    });

    it('Should load Student Result and populate table ', () => {
    const response = {
        id: 1,
        occupation: 'clerical nurse',
        practical_Result: 'satisfactory',
        knowledge_Result: 'satisfactory',
        status: 'competent'

    };

    studentService.getData('studentresult', 1).subscribe((data: any) => {
        expect(page.tableData).toBeGreaterThan(0);
    });

  });




});
