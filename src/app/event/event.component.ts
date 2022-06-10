import { Component, OnInit } from '@angular/core';
import { IndexService } from '../index/Services/index.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public events: any[] = [];
  public detail: any = undefined;

  constructor(public indexService: IndexService,private actRoute?: ActivatedRoute, private router?: Router, 
    private translate?: TranslateService) { 

  }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;

    this.indexService.filterEvents().subscribe((data: any[]) => {
      this.events = data;
    });

    this.ShowDetail(id); 
  }

  ShowDetail(id){
    this.indexService.getEvent(id).subscribe((data: any) => {
      this.detail = data;

    });

  }
  
}
