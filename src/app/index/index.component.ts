import { Component, OnInit } from '@angular/core';
import { IndexService } from './Services/index.service';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../medias/Services/media.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // images = [1, 2, 3, 4].map(
  //   () => `https://picsum.photos/900/500?random&t=${Math.random()}`
  // );
  //   images = [1, 2, 3, 4].map(
  //   () => `https://picsum.photos/900/500?random&t=${Math.random()}`
  // );
  public menus: any;
  public featuredNews: any;
  public QuickLink: any[] = [];
  public showDetail = false;
  public slidderData: any;
  public events: any[] = [];
   public images:any[] = [];
   public skeleton:any[] = [1,2]
  public env = environment;
  profileImg = false;
  isLoading:boolean = false;
  constructor(
    private indexService: IndexService,
    public mediaService: MediaService,
    private router: Router,
    private config: NgbCarouselConfig,
    private translate?: TranslateService
  ) {
    translate.setDefaultLang(localStorage.getItem('currentLanguage'));
  }

  ngOnInit() {
   this.isLoading = true;
   console.log(this.isLoading)
    this.indexService.getImages(`https://picsum.photos/v2/list?&limit=4?random&t=${Math.random()}`).subscribe((res:any)=>
    {
      this.isLoading = false;
      console.log(this.isLoading)
    res.forEach(element => {
     this.images.push(element.download_url)
    });
    }
    );
    this.isLoading = true;
    this.config.interval = 2000;
    this.config.wrap = true;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
    // this.config.animation = true;

    this.indexService.loadFeaturedNews({ featured: 'True', membersOnly: 'False', language: localStorage.getItem('currentLanguage') })
      .subscribe((data: any[]) => {
        this.featuredNews = data;
      });

    this.mediaService.getimages().subscribe((data: any[]) => {
      this.slidderData = data;
    });

    this.indexService.loadMenu().subscribe((data: any[]) => {
      this.menus = data;
    });

    this.indexService.loadQuickLink().subscribe((data: any[]) => {
      this.QuickLink = data;
    });

    this.indexService.filterEvents().subscribe((data: any[]) => {
      this.events = data;
    });

  }

  readMore(id: any) {
    this.indexService.articleReadMore(id).subscribe((data: any) => {
      this.featuredNews = data;
    });
    this.showDetail = true;
  }

  navigateUser(url: any) {
    this.showDetail = false;
    this.router.navigateByUrl(url);
  }

  back() {
    const criteria = {
      featured: 'True', membersOnly: 'False',
      language: localStorage.getItem('currentLanguage')
    }
    this.indexService.loadFeaturedNews(criteria)
      .subscribe((data: any[]) => {
        this.featuredNews = data;
      });

    this.showDetail = false;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  event_detail(data: any) {
    this.router.navigate(['event/' + data.id]);
  }

}
