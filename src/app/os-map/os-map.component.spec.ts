import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../studentManagement/services/student.service';
import { OsMapComponent } from './os-map.component';


describe('OS Map component', () => {
    let studentService: StudentService;
    let page: OsMapComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [StudentService]
      });
      page = new OsMapComponent(studentService);
      // inject the service
      studentService = TestBed.get(StudentService);
    });

    it('OS Map component: form should have a control', () => {
        expect(page.formgroup.contains('sector')).toBeTruthy();
        expect(page.formgroup.contains('subSector')).toBeTruthy();
        expect(page.formgroup.contains('occupation')).toBeTruthy();
        expect(page.formgroup.contains('unitOfCompetency')).toBeTruthy();
    });

    it('Should load Sector', () => {
        studentService.getApplicationData('sector').subscribe(() => {
        expect(page.sector).toBeGreaterThan(0);
    });

    });

    it('Should load SubSector', () => {
        const sector = page.formgroup.get('sector');
        studentService.getApplicationData('subsector', sector.value, 'parent').subscribe(() => {
        expect(page.subsector).toBeGreaterThan(0);
        expect(page.showAmount).toBeFalsy();
        expect(page.occupations).toBeLessThan(1);
        expect(page.unitOfCompetency).toBeLessThan(1);

    });

    });

    it('Should load Occupation', () => {
      const subSector = page.formgroup.get('subSector');
      studentService.getApplicationData('occupation', subSector.value, 'sector_code').subscribe(() => {
      expect(page.occupations).toBeGreaterThan(0);

   });

    });

    it('Should load Unit of Competency', () => {
    const occupation = page.formgroup.get('occupation');
    studentService.getApplicationData( 'unit_of_competency', occupation.value, 'occ_code').subscribe(() => {
    expect(page.unitOfCompetency).toBeGreaterThan(0);

 });

    });

  });


