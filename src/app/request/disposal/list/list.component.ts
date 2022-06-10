import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisposalService } from '../disposal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public data: any[] = [];
  public columens = ['Description', 'Budget year', 'Date', 'Options'];
  public printCols: any[];
  public printData: any[];
  constructor(private service: DisposalService, public router: Router) { }

  ngOnInit() {
    this.service.gets(localStorage.getItem('userId')).subscribe((data: any) => {
      this.data = data;
    });
  }

  add() {
    this.router.navigate(["request/disposal/create"]);
  }

  edit(id) {
    this.router.navigate(["request/disposal/edit/" + id]);
  }

  delete(id) {
    this.service.delete(id).subscribe((response: any) => {
      if (response.status) {
        alert(response.message);
        this.ngOnInit();

      } else {
        alert(response.message);
      }
    });
  }

  generateReport(id) {
    this.service.generate_report({ id: id }).subscribe((data: any) => {
      this.printData = data;
      this.printCols = [
        'Budget Year', 'Product', 'Quantity', 'Unit', 'Product code',
        'Current approximate price', 'Property condition', 'Property condition description',
        'Plate number', 'Shansi',
        'Country made', 'Purchased date', 'Manufacturer', 'Model', 'Motor number', "Vehicle's current place", 'Owner of vehicle'
      ];
      if (this.printData.length) {
        setTimeout(() => {
          window.print();
        }, 500)
      }
    });
  }

  seePlan(id) {
    this.router.navigate(["request/disposal/" + id + "/plan"]);

  }


}
