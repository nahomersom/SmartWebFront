import { Component, OnInit } from '@angular/core';
import { IndexService } from '../index/Services/index.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent implements OnInit {

  public OurTeamMembers: any;

  constructor(public indexService: IndexService, private modalService: NgbModal,  private translate?: TranslateService) {
    translate.setDefaultLang(localStorage.getItem('currentLanguage'));
  }

  ngOnInit() {
     this.indexService.getOurTeamMembers().subscribe((data: any[]) => {
      this.OurTeamMembers = data;
    });
  }

  open(data: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = data;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  seemore(data: any) {
    this.open(data);
  }
}
