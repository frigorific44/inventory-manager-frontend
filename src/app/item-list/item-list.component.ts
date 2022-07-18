import { Component, Input, OnInit } from '@angular/core';
import { ItemClass } from '../models/item-class.model';
import { SectionClass } from '../models/section-class.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() section :SectionClass | undefined;
  service :ItemService;
  items :Array<ItemClass> = [];

  constructor(service :ItemService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.section != undefined) {
      this.service.findBySection(this.section).subscribe(data => {
        this.items = data;
      });
    }
  }

}
