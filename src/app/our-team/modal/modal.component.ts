import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { IndexService } from 'src/app/index/Services/index.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() data;

  constructor(public activeModal: NgbActiveModal, private translate?: TranslateService,public indexService?: IndexService) {}

  ngOnInit() {}

}
