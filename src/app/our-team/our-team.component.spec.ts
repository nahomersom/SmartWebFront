import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OurTeamComponent } from './our-team.component';
import { IndexService } from '../index/Services/index.service';
import { TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, 
    MissingTranslationHandler, 
    USE_DEFAULT_LANG} from '@ngx-translate/core';

describe('Our Team component', () => {
    let indexService: IndexService;
    let modal: NgbModal;
    let trans: TranslateService;
    let page: OurTeamComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule, NgbModule],
        providers: [IndexService, TranslateService],
      });
      // inject the service
      indexService = TestBed.get(IndexService);
      modal = TestBed.get(NgbModal);
      trans = TestBed.get(TranslateService);
      page = new OurTeamComponent(indexService, modal, trans);

    });



    it(' : Should load all the members', () => {

        indexService.getOurTeamMembers()
        .subscribe((data: any[]) => {
          page.OurTeamMembers = data;
          expect(page.OurTeamMembers).toBeGreaterThan(0);
          });

    });



});
