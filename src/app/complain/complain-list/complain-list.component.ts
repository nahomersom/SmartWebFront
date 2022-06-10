import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplainService } from '../complain.service';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.css']
})
export class ComplainListComponent implements OnInit {
  public data: any[] = [];
  public columns = ['Bid', 'Complain', 'Date', 'Status'];
  method = null;
  max: number = 150;
  seeMore: boolean[] = [];

  constructor(private service: ComplainService, private activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.routeConfig.path;
    this.method = path === 'procurement-complain' ? 'procurement' : path === 'disposal-complain' ? 'disposal' : null;
    const params = {
      id: localStorage.getItem('userId'),
      type: this.method
    }
    this.service.getComplains(params).subscribe((data: any) => {
      this.data = data;
      this.data.forEach(el => {
        this.seeMore.push(false);
      })
    });
  }

  add() {
    this.router.navigate([this.method === 'procurement' ? "/complain/procurement-complain-form" : "complain/disposal-complain-form"]);
  }

}
