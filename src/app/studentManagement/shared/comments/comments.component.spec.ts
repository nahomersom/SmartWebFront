import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexService } from 'src/app/index/Services/index.service';
import { CommentsComponent } from './comments.component';


describe('Comments component', () => {
    let indexService: IndexService;
    let page: CommentsComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [IndexService]
      });
      page = new CommentsComponent(indexService);
      // inject the service
      indexService = TestBed.get(IndexService);
    });


    it('Comments component : form should have a control', () => {
      expect(page.formgroup.contains('comment')).toBeTruthy();
    });

    // validation
    it('Comments component : form control should have a validation required', () => {
    const comment = page.formgroup.get('comment');

    comment.setValue('');
    expect(comment.valid).toBeFalsy();

    });

   // expecting the correct(but faked) result: propery with value
    it('Should Post Comment and show alerts', () => {
        const comments = {
            id: 1,
            comment: 'hello',
            commentBy: 'surafel habte',
            commentForArticle: 1,
            date: 1560946199305
        };

        const comment = page.formgroup.get('comment');
        comment.setValue('Hi how are you !');
        const spyWindow = spyOn(window, 'alert');
        const spyPage = spyOn(page, 'ngOnInit');

        indexService.postComment(comments).subscribe((data: any[]) => {
            expect(spyWindow).toHaveBeenCalledWith('comment posted !');
            expect(spyPage).toHaveBeenCalled();
            expect(comment.setValue('')).toBeTruthy();
          });
    });



});
