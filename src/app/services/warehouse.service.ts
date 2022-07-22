import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  save(warehouse: Warehouse) :Observable<any> {
    return this.http.post(environment.apiUrl.root + environment.apiUrl.wareExt, warehouse);
  }

  findById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl.root + environment.apiUrl.wareExt + id);
  }

  findByCompany(companyId: number) :Observable<any> {
    return this.findById(companyId);
  }

  update(warehouse: Warehouse) :Observable<any> {
    return this.http.put(environment.apiUrl.root + environment.apiUrl.wareExt, warehouse);
  }

  delete(warehouse: Warehouse) :Observable<any> {
    return this.http.delete(environment.apiUrl.root + environment.apiUrl.wareExt + warehouse.id);
  }
}
