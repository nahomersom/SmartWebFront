import { Component, OnInit, HostListener } from '@angular/core';
import { MediaService } from './Services/media.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  public medias: any;
  public mediaType = 'Images';
  public category = '';

  constructor(private router: Router, public mediaService: MediaService, private act: ActivatedRoute, private translate?: TranslateService
    ) {
      router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
    }

  ngOnInit() {
    this.category = this.act.snapshot.params.mediaType;
    this.mediaType = 'Images';
    this.mediaService.getMedias(this.act.snapshot.params.id).subscribe((data: any) => {
      this.medias = data;
    });
  }

  filterMedia(type: any) {
    this.mediaType = type;
    this.mediaService.filiterMedia(type, this.act.snapshot.params.id).subscribe((data: any[]) => {
      this.medias = data;
    });
  }
}
