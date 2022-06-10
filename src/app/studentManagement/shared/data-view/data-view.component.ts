import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() columens: any;
  @Input() heading: any;

  constructor(private translate?: TranslateService
    ) { }

  ngOnInit() {
  }

  keys(object: any,index) {
    var col: any[] = Object.values(object);
    col.unshift(Number.parseInt(index) + 1);
    return col;
  }
}
