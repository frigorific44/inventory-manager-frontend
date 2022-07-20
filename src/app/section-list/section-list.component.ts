import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
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
  newIsShowing: boolean = false;
  @ViewChild(Table) private dataTable!: Table;

  constructor(service :SectionService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.warehouse != undefined) {
      let emptySection: Section = {id: -1, parentId: this.warehouse.id};
      this.service.findByWarehouse(this.warehouse.id).subscribe(data => {
        this.sections = data;
        this.sections.unshift(emptySection);
      });
    }
  }

  handleNewChange() {
    if (this.newIsShowing) {
      this.dataTable.editingRowKeys[-1] = true;
    }
  }

  onRowEditInit(section: Section) {
    this.clonedSections[section.id] = {...section};
  }

  onRowEditSave(section: Section, rowIndex: number) {
    if (rowIndex == 0) {
      this.newIsShowing = false;
      this.service.save(section).subscribe(response => {
        this.refreshData();
      });
    } else {
      this.service.update(section).subscribe(response => {});
      delete this.clonedSections[section.id];
    }
  }

  onRowEditCancel(section: Section, index: number) {
    this.sections[index] = this.clonedSections[section.id];
    delete this.clonedSections[section.id];
    if (index == 0) {
      this.newIsShowing = false;
    }
  }

  onRowDelete(section: Section) {
    this.service.delete(section).subscribe({
      complete: () => this.refreshData()
    });
  }

}
