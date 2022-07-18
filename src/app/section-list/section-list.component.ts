import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../models/section';
import { Warehouse } from '../models/warehouse';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  @Input() warehouse?: Warehouse;
  service :SectionService;
  sections :Array<Section> = [];
  clonedSections: { [s: number]: Section; } = {};

  constructor(service :SectionService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.warehouse != undefined) {
      this.service.findByWarehouse(this.warehouse.id).subscribe(data => {
        this.sections = data;
      });
    }
  }

  onRowEditInit(section: Section) {
    this.clonedSections[section.id] = {...section};
  }

  onRowEditSave(section: Section) {
    this.service.update(section).subscribe(response => {});
    delete this.clonedSections[section.id];
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

  onRowEditCancel(section: Section, index: number) {
    this.sections[index] = this.clonedSections[section.id];
    delete this.clonedSections[section.id];
  }

  onRowDelete(section: Section) {
    this.service.delete(section).subscribe({
      complete: () => this.refreshData()
    })
  }

}
