import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexService } from './Services/index.service';
import { IndexComponent } from './index.component';
import { MediaService } from '../medias/Services/media.service';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';



describe('Index component', () => {
    let indexService: IndexService;
    let mediaService: MediaService;
    let router: Router;
    let config: NgbCarouselConfig;
    let translate: TranslateService;

    let page: IndexComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule, NgbModule],
        providers: [IndexService, MediaService, NgbCarouselConfig]
      });
      // inject the service
      indexService = TestBed.get(IndexService);
      mediaService = TestBed.get(MediaService);
      translate = TestBed.get(TranslateService);
      router = TestBed.get(Router);
      config = TestBed.get(NgbCarouselConfig);

      page = new IndexComponent(indexService, mediaService, router, config);

    });

    it('Should load menu', () => {

    indexService.loadMenu().subscribe(() => {
        expect(page.menus).toBeGreaterThan(0);
    });

  });

    it('Should load Slidder Images', () => {

    mediaService.getimages().subscribe(() => {
        expect(page.slidderData).toBeGreaterThan(0);
    });
  });

    it('Should load Quick Link', () => {

    indexService.loadQuickLink().subscribe(() => {
        expect(page.QuickLink).toBeGreaterThan(0);
    });
  });

    it('Should load featured News', () => {

    indexService.loadFeaturedNews({featured: 'True', membersOnly: 'False', categoryId: 'News',
     language: localStorage.getItem('currentLanguage')}).subscribe(() => {
        expect(page.featuredNews).toBeGreaterThan(0);
    });
  });

    it('Read More', () => {
        indexService.articleReadMore(1).subscribe(() => {
        expect(page.featuredNews).toEqual(1);
    });
  });


});
