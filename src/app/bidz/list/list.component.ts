import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BidzService } from '../bidz.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  fg: FormGroup;
  public data: any[] = [];
  showShortDescription: any;
  isReadMore = true;
  searchString: any;
  bidMethods = [
    { value: 'disposal', text: 'Disposal' },
    { value: 'procurement', text: 'Procurement' }
  ]
  categories: any[];
  method = null;

  constructor(private activatedRoute: ActivatedRoute, private service: BidzService, private router: Router) {
    this.fg = new FormGroup({
      category: new FormControl('', Validators.required),
      method: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    const path = this.activatedRoute.snapshot.routeConfig.path;
    this.method = path === 'Procurement-bid-invitation-notice' ? 'procurement' : path === 'Disposal-bid-invitation-notice' ? 'disposal' : null;
    const params =  {
        // product_category_id: null,
        bid_method: this.method,
      }
    this.service.postGet(params, 'bid_invitation').subscribe((res: any) => {
        this.data = res;
      })
    this.service.gets('load_product_category').subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  showText(data: any, winner?: any) {
    this.isReadMore = !this.isReadMore
    if (winner) {
      this.router.navigate(["bid/" + data.id + "/winner"], { state: { data: data } });
    }
    else {
      if (!this.isReadMore) {
        this.router.navigate(["bid/detail"], { state: { data: data } });
      }
    }
  }

  onSubmit(event: any) {
    this.service.postGet({ keyword: event.target.search.value }, 'search').subscribe((res: any) => {
      this.data = res;
    })
  }

  filter(f: string) {
      const params = {
        "bi.product_category_id": f,
        "bid_method": this.method
      }
      this.service.postGet(params, 'bid_invitation').subscribe((res: any) => {
        this.data = res;
      })
  }
}