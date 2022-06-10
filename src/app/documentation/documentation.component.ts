import { Component, OnInit } from '@angular/core';
import { DocumentationService } from './documentation.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {


  public tableData: any[] = [];
  public columens = ['Document Title', 'Description', 'Category', 'Download'];
  public ismemberActivated: boolean;

  constructor(private act: ActivatedRoute, private router: Router, public documentationService: DocumentationService, private translate?: TranslateService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
   }

  ngOnInit() {
    this.ismemberActivated = localStorage.getItem('memberStatus') === 'Activated' ? true : false;
    if (!this.ismemberActivated) {
        this.documentationService.getPublicDocument(this.act.snapshot.params.id)
        .subscribe((data: any[]) => {
          this.tableData = data;
        });

    } else {
        this.documentationService.getPrivateDocument()
        .subscribe((data: any[]) => {
          this.tableData = data;
          this.tableData.concat(data);
        });
    }
  }

  keys(object: any) {
      return Object.values(object);
  }

}
