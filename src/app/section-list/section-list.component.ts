import { Component, Input, OnInit } from '@angular/core';
import { SectionClass } from '../models/section-class.model';
import { WarehouseClass } from '../models/warehouse-class.model';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  @Input() warehouse: WarehouseClass | undefined;
  service :SectionService;
  sections :Array<SectionClass> = [];

  constructor(service :SectionService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    if (this.warehouse != undefined) {
      this.service.findByWarehouse(this.warehouse).subscribe(data => {
        this.sections = data;
      });
    }
  }

}
