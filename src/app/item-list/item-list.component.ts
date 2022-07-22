import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IndexedItem, Item } from '../models/item';
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
  iItems :Array<IndexedItem> = [];
  clonedItems: { [s: number]: IndexedItem; } = {};
  newIsShowing: boolean = false;
  indexChoices: Array<{label: string, value: number}> = [];
  @ViewChild(Table) private dataTable!: Table;
  full: boolean = false;

  constructor(service :ItemService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  updateIndexChoices() :void {
    let currIndices = this.iItems.map(iItem => iItem.item.id);
    this.indexChoices = [...Array(this.section.capacity).keys()].map(i => {
      return {label: (i+1).toString(), value: i+1}
    }).filter(choice => !currIndices.includes(choice.value));
  }

  refreshData() :void {
    if (this.section != undefined) {
      this.service.findBySection(this.section.id).subscribe(data => {
        let items: Array<Item> = data;
        let newIndexedItems: Array<IndexedItem> = [];
        items.forEach(element => {
          newIndexedItems.push({item: element, index:element.id})
        });
        this.iItems = newIndexedItems;
        this.updateIndexChoices();
        if (this.section.capacity > this.iItems.length) {
          let emptyItem: Item = {id: (this.indexChoices ? this.indexChoices[0].value : 0), parentId: this.section.id};
          this.iItems.unshift({item: emptyItem, index: 0});
          this.full = false;
        } else {
          this.full = true;
        }
      });
    }
  }

  handleNewChange() {
    if (this.newIsShowing) {
      this.dataTable.editingRowKeys[0] = true;
    }
  }

  onRowEditInit(iItem: IndexedItem, rowIndex: number) {
    if (iItem.index != 0) {
      this.indexChoices.push({label: iItem.index.toString(), value: iItem.index})
      this.indexChoices.sort((a, b) => {return a.value - b.value});
      this.iItems[rowIndex].item.id = iItem.index;
    }
    this.clonedItems[iItem.index] = Object.assign({}, iItem);
  }

  onRowEditSave(iItem: IndexedItem, rowIndex: number) {
    if (rowIndex == 0) {
      this.newIsShowing = false;
      this.service.save(iItem.item).subscribe(response => {
        this.refreshData();
      });
    } else {
      // If id changed, it is actually a delete and a post
      if (iItem.index != iItem.item.id) {
        console.log(iItem)
        this.service.save(iItem.item).subscribe(response => {
          iItem.item.id = iItem.index
          this.service.delete(iItem.item).subscribe({
            complete: () => this.refreshData()
          })
        })
      } else {
        this.service.update(iItem.item).subscribe(response => {});
        delete this.clonedItems[iItem.index];
      }
    }
  }

  onRowEditCancel(iItem: IndexedItem, index: number) {
    this.iItems[index] = this.clonedItems[iItem.index];
    this.iItems[index].item.id = iItem.index;
    delete this.clonedItems[iItem.index];
    if (index == 0) {
      this.newIsShowing = false;
    } else {
      this.indexChoices = this.indexChoices.filter( choice => choice.value != iItem.index);
    }
  }

  onRowDelete(iItem: IndexedItem) {
    this.service.delete(iItem.item).subscribe({
      complete: () => this.refreshData()
    })
  }

}
