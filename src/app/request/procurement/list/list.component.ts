import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcurementService } from '../procurement.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public data: any[] = [];
  public columens = ['Description', 'Budget year', 'Date', 'Options'];
  public printCols: any[]
  public printData: any[]

  constructor(private service: ProcurementService, public router: Router) { }

  ngOnInit() {
    this.service.gets(localStorage.getItem('userId')).subscribe((data: any) => {
      this.data = data;
    });
  }

  add() {
    this.router.navigate(["request/procurement/create"]);
  }

  edit(id) {
    this.router.navigate(["request/procurement/edit/" + id]);
  }

  delete(id) {
    if (confirm('are you sure delete this request ?')) {
      this.service.delete(id).subscribe((response: any) => {
        if (response.status) {
          this.ngOnInit();
        }

        alert(response.message);

      });
    }

  }

  generateReport(id) {
    this.service.generate_report({ id: id }).subscribe((data: any) => {
      
      this.printData = data;;
      console.log(this.printData)
      this.printCols = ['Budget year', 'Product', 'Quantity', 'Unit',  "Budget amount", "Budget source", "Estimated Delivery Date"];
      if (this.printData.length) {
        setTimeout(() => {
          window.print();
        }, 500)
      }
    });
  }

  seePlan(id) {
    this.router.navigate(["request/procurement/" + id + "/plan"]);

  }

}