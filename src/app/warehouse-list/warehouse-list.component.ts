import { Component, Input, OnInit } from '@angular/core';
import { CompanyClass } from '../models/company-class.model';
import { WarehouseClass } from '../models/warehouse-class.model';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  @Input() company: CompanyClass | undefined;
  service :WarehouseService;
  warehouses :Array<WarehouseClass> = [];

  constructor(service :WarehouseService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.company != undefined) {
      this.service.findByCompany(this.company).subscribe(data => {
        this.warehouses = data;
      });
    }
  }

}
