import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BidzService } from '../bidz.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public ID: any;
  data: any;
  winner = false;
  winnerType = null;
  cols =  []

  constructor(private service: BidzService, private act: ActivatedRoute, private location: Location, private router: Router) {
    this.data = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.data : null;
  }

  ngOnInit(): void {
    const path = this.act.snapshot.routeConfig.path;
    this.winnerType = path === 'Procurement-award-information' ? 'procurement' : path === 'Disposal-award-information' ? 'disposal' : null;
   /*  if (!this.data) {
      this.router.navigate(['bid']);
    } */
    if(this.winnerType === 'procurement') {
      this.cols = [
      "Procurement reference number",
      "Procurement type",
      "Budget source",
      "Budget amount",
      "Procurement method",
      "Total bidders",
      "Advertisement method",
      "Winner",
      "Price",
      "Contract signed date",
      ]
    }
    else if(this.winnerType === 'disposal') {
      this.cols = [
      "Disposal method",
      "Total bidders",
      "Advertisement method",
      "Winner",
      "Price",
      "Contract signed date",
      ]
    }
    if (this.winnerType) {
      this.data = null;
      this.winner = true;
      this.service.detail(this.winnerType).subscribe((data: any) => {
        this.data = data
      });
    }

  }

  back() {
    this.location.back();
  }

}
