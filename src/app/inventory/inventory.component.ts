import { Component, OnInit } from '@angular/core';
import { CompanyClass } from '../models/company-class.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  company: CompanyClass;

  constructor() {
    this.company = new CompanyClass().deserialize({id: 1, name: 'Acme'})
  }

  ngOnInit(): void {
  }

}
