import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SectionClass } from '../models/section-class.model';
import { WarehouseClass } from '../models/warehouse-class.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  save(section: SectionClass) :Observable<any> {
    return this.http.post(environment.apiUrl.root + environment.apiUrl.sectExt, section);
  }

  findById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl.root + environment.apiUrl.sectExt + id);
  }

  findByWarehouse(warehouse: WarehouseClass) :Observable<any> {
    return this.findById(warehouse.id);
  }
}
