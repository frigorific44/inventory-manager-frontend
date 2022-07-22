import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  company: Company;

  constructor() {
    this.company = {id: 1, name: 'Acme'};
  }

  ngOnInit(): void {
  }

}
