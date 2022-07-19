import { Component, Input, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Item } from '../models/item';
import { Section } from '../models/section';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() section!: Section;
  service :ItemService;
  items :Array<Item> = [];
  clonedItems: { [s: number]: Item; } = {};
  newIsShowing: boolean = false;
  indexChoices: Array<{label: string, value: number}> = [];

  constructor(service :ItemService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  updateIndexChoices() :void {
    let currIndices = this.items.map(item => item.id);
    this.indexChoices = [...Array(this.section.capacity).keys()].map(i => {
      return {label: (i+1).toString(), value: i+1}
    }).filter(choice => !currIndices.includes(choice.value));
    console.log(this.indexChoices);
  }

  refreshData() :void {
    if (this.section != undefined) {
      this.service.findBySection(this.section.id).subscribe(data => {
        this.items = data;
        this.updateIndexChoices();
        let emptyItem: Item = {id: (this.indexChoices ? this.indexChoices[0].value: 0), parentId: this.section.id};
        this.items.unshift(emptyItem);
      });
    }
  }

  toggleNew() {
    this.newIsShowing = !this.newIsShowing;
  }

  onRowEditInit(item: Item) {
    this.clonedItems[item.id] = {...item};
  }

  onRowEditSave(item: Item, rowIndex: number) {
    if (rowIndex == 0) {
      this.newIsShowing = false;
      this.service.save(item).subscribe(response => {
        this.refreshData();
      });
    } else {
      this.service.update(item).subscribe(response => {});
      delete this.clonedItems[item.id];
    }
  }

  onRowEditCancel(item: Item, index: number) {
    this.items[index] = this.clonedItems[item.id];
    delete this.clonedItems[item.id];
    if (index == 0) {
      this.newIsShowing = false;
    }
  }

  onRowDelete(item: Item) {
    this.service.delete(item).subscribe({
      complete: () => this.refreshData()
    })
  }

}
