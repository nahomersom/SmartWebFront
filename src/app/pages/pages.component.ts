import { Component, OnInit } from '@angular/core';
import { IndexService } from '../index/Services/index.service';
import { Router, Event, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public articles: any;
  public language = 'English';
  public currentCategoryId: any;
  public currentArticleId: any;
  public articleIsDetail = false;
  public allowCommenting = false;
  public showDetail = false;
  public events: any[] = [];
  public show_events: any;
  isReadMore = true

  constructor(public indexService: IndexService, private actRoute?: ActivatedRoute, private router?: Router, private translate?: TranslateService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.articleIsDetail = false;
    const id = this.actRoute.snapshot.params.id;
    const member = localStorage.getItem('member') === 'True' ? true : null;
    if (id !== undefined) {
      this.indexService.loadMenuCategoryId(id)
        .subscribe((data: any) => {
          this.currentCategoryId = data?.categoryId;
          this.show_events = data.show_events;
          this.getEvents();
          this.indexService.loadArticles(this.currentCategoryId, member)
            .subscribe((data1: any) => {
              this.articles = data1;
              if (data1 !== undefined) {
                this.allowCommenting = data1[0]?.allowComment === 'True' ? true : false;
              }
            });
        });
    }

    if (this.show_events === 'True') {
      this.indexService.filterEvents().subscribe((data: any[]) => {
        this.events = [];
        this.events = data;
      });
    }

  }

  getEvents() {
    if (this.show_events === 'True') {
      this.indexService.filterEvents().subscribe((data: any[]) => {
        this.events = [];
        this.events = data;
      });
    }
  }

  readMore(id: any) {
    this.isReadMore = !this.isReadMore
    this.indexService.articleReadMore(id)
      .subscribe((data: any[]) => {
        this.articles = data;
        this.articleIsDetail = true;
        this.currentArticleId = data[0].id;
      });
    this.showDetail = true;
  }

  back() {
    this.isReadMore = true;
    this.ngOnInit();
    this.showDetail = false;
  }

  event_detail(data: any) {
    this.router.navigate(['event/' + data.id]);
  }

}
