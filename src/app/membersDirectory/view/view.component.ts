import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { MembersService } from '../members.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public Members: any;
  public userId: any;
  public filtredMembers: any[] = [];
  public alphabets = [];
  public showalphabets = localStorage.getItem('currentLanguage') === 'English' ? true : false;

  constructor(public memberService: MembersService, private router: Router,
              private modalService?: NgbModal, private translate?: TranslateService) {
    translate.setDefaultLang(localStorage.getItem('currentLanguage'));
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
     this.memberService.gets().subscribe((data: any[]) => {
      this.Members = data;
      this.filtredMembers = data;
    });
     for (let i = 65; i <= 90; i++) {
    this.alphabets.push(String.fromCharCode(i));
    }
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

  navigate(url?: any) {
      this.router.navigateByUrl(url);
  }

  filiterMembers(value?: any) {
    if (value !== undefined) {
      const query = value.toLowerCase();
      this.filtredMembers = [];
      this.Members.forEach(member => {
          if (member.fullName.toLowerCase().indexOf(query) > -1) {
            this.filtredMembers.push(member);
          }
        });
    } else {
      this.filtredMembers = [];
      this.filtredMembers = this.Members;
    }
  }

  filiterMembersByFirstLetter(character?: any) {
    if (character !== undefined) {
      const query = character.toLowerCase();
      this.filtredMembers = [];
      this.Members.forEach(member => {
          if (member.fullName.toLowerCase().substring(0, 1) === query) {
            this.filtredMembers.push(member);
          }
        });
    } else {
      this.filtredMembers = [];
      this.filtredMembers = this.Members;
    }
  }

}
