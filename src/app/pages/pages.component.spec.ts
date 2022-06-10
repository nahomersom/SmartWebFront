// import { TestBed  } from '@angular/core/testing';
// import { HttpClientTestingModule} from '@angular/common/http/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { IndexService } from '../index/Services/index.service';
// import { PagesComponent } from './pages.component';
// import { ActivatedRoute, Router , Event, NavigationEnd} from '@angular/router';


// describe('Pages component', () => {
//     let indexService: IndexService;
//     let actRoute: ActivatedRoute;
//     let router: Router;
//     let page: PagesComponent;

//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
//         providers: [IndexService]
//       });
//       page = new PagesComponent(indexService, actRoute, router);

//       // inject the service
//       indexService = TestBed.get(IndexService);
//       actRoute = TestBed.get(ActivatedRoute);
//       actRoute = TestBed.get(router);

//     });

//     it('Should load the requested pages data ', () => {
//     const response = {
//         id: 1,
//         occupation: 'clerical nurse',
//         practical_Result: 'satisfactory',
//         knowledge_Result: 'satisfactory',
//         status: 'competent'

//     };
//     let currentCategoryId: any;
//     let articles: any;

//     const id = this.actRoute.snapshot.params.id;
//     if (id !== undefined) {
//         this.indexService.loadCategoryId(id)
//         .subscribe((data: any) => {
//             currentCategoryId = data.categoryId;
//             this.indexService.loadArticles(currentCategoryId)
//             .subscribe((data1: any[]) => {
//                 articles = data1;
//             });
//         });
//         expect(page.articles.length).toBeGreaterThan(0);
//       }
//     });

//     it('Should Listen for the route change', () => {
//         const spy = spyOn(page, 'ngOnInit');

//         router.events.subscribe( (event: Event) => {
//             if (event instanceof NavigationEnd) {
//               expect(spy).toHaveBeenCalled();
//             }
//         });
//     });

// });
