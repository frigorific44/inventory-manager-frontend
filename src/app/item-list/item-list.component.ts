import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Section } from '../models/section';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() section?: Section;
  service :ItemService;
  items :Array<Item> = [];
  clonedItems: { [s: number]: Item; } = {};

  constructor(service :ItemService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.section != undefined) {
      this.service.findBySection(this.section.id).subscribe(data => {
        this.items = data;
      });
    }
  }

  onRowEditInit(item: Item) {
    this.clonedItems[item.id] = {...item};
  }

  onRowEditSave(item: Item) {
    this.service.update(item).subscribe(response => {});
    delete this.clonedItems[item.id];
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

  onRowEditCancel(item: Item, index: number) {
    this.items[index] = this.clonedItems[item.id];
    delete this.clonedItems[item.id];
  }

  onRowDelete(item: Item) {
    this.service.delete(item).subscribe({
      complete: () => this.refreshData()
    })
  }
}
