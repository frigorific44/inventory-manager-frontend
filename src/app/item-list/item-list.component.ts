import { Component, OnInit } from '@angular/core';
import { ItemClass } from '../models/item-class.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  service :ItemService;
  items :Array<ItemClass> = [];

  constructor(service :ItemService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    this.items =  [
      {index: 0, name: 'Coins', altId:'HDF4JD', description: 'covered in patina', count: 0},
      {index: 1, name: 'Buttons', altId:'J98SD3', description: 'multitudinous colors', count: 1},
      {index: 3, name: 'Stamps', altId:'67DKE0', description: 'some are rather small', count: 12}
    ].map((temp: any) => {
      return new ItemClass().deserialize(temp);
    });
    // this.service.findByCompany(new CompanyClass()).subscribe(data => {
    //   this.warehouses = data;
    // });
  }

}
