import { Component, OnInit } from '@angular/core';
import { SectionClass } from '../models/section-class.model';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  service :SectionService;
  sections :Array<SectionClass> = [];

  constructor(service :SectionService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() :void {
    this.sections =  [
      {id: 0, name: 'A', description: 'First', capacity: 10},
      {id: 1, name: 'B', description: 'Second', capacity: 11},
      {id: 2, name: 'C', description: 'Third', capacity: 5},
      {id: 3, name: 'D', description: 'Fourth', capacity: 7}
    ].map((temp: any) => {
      return new SectionClass().deserialize(temp);
    });
    // this.service.findByCompany(new CompanyClass()).subscribe(data => {
    //   this.warehouses = data;
    // });
  }

}
