import { Component, OnInit } from '@angular/core';
import { CompanyClass } from '../models/company-class.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  userCompany: CompanyClass;

  constructor() {
    this.userCompany = new CompanyClass().deserialize({id: 0, name: 'Acme'})
  }

  ngOnInit(): void {
  }

}
