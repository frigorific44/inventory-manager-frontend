import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyClass } from '../models/company-class.model';
import { WarehouseClass } from '../models/warehouse-class.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  save(warehouse: WarehouseClass) :Observable<any> {
    return this.http.post(environment.apiUrl.root + environment.apiUrl.wareExt, warehouse);
  }

  findById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl.root + environment.apiUrl.wareExt + id);
  }

  findByCompany(company: CompanyClass) :Observable<any> {
    return this.findById(company.id);
  }
}
