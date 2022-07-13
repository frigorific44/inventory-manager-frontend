import { Component, OnInit } from '@angular/core';
import { CompanyClass } from '../models/company-class.model';
import { WarehouseClass } from '../models/warehouse-class.model';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  service :WarehouseService;
  warehouses :Array<WarehouseClass> = [];

  constructor(service :WarehouseService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    this.warehouses =  [
      {id: 0, name: 'Downington'},
      {id: 1, name: 'Upington'},
      {id: 2, name: 'Leftington'},
      {id: 3, name: 'Rightington'}
    ].map((temp: any) => {
      return new WarehouseClass().deserialize(temp);
    });
    // this.service.findByCompany(new CompanyClass()).subscribe(data => {
    //   this.warehouses = data;
    // });
  }

}
