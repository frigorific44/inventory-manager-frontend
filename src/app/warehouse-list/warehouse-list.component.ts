import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { Warehouse } from '../models/warehouse';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  @Input() company?: Company;
  service :WarehouseService;
  warehouses :Array<Warehouse> = [];
  clonedWarehouses: { [s: number]: Warehouse; } = {};

  constructor(service :WarehouseService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.company != undefined) {
      this.service.findByCompany(this.company.id).subscribe(data => {
        this.warehouses = data;
      });
    }
  }

  onRowEditInit(warehouse: Warehouse) {
    this.clonedWarehouses[warehouse.id] = {...warehouse};
  }

  onRowEditSave(warehouse: Warehouse) {
    console.log("Help!")
    this.service.update(warehouse).subscribe(response => {});
    delete this.clonedWarehouses[warehouse.id];
    // // input checking
    // if (true) {
    //   this.service.update(warehouse);
    //   delete this.clonedWarehouses[warehouse.id];
    //   // this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    // }
    // else {
    //     // this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    // }
  }

  onRowEditCancel(warehouse: Warehouse, index: number) {
    this.warehouses[index] = this.clonedWarehouses[warehouse.id];
    delete this.clonedWarehouses[warehouse.id];
  }

  onRowDelete(warehouse: Warehouse) {
    this.service.delete(warehouse).subscribe({
      complete: () => this.refreshData()
    })
  }

}
