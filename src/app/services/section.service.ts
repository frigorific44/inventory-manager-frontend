import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Section } from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  save(section: Section) :Observable<any> {
    return this.http.post(environment.apiUrl.root + environment.apiUrl.sectExt, section);
  }

  findById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl.root + environment.apiUrl.sectExt + id);
  }

  findByWarehouse(warehouseId: number) :Observable<any> {
    return this.findById(warehouseId);
  }

  update(section: Section) :Observable<any> {
    return this.http.put(environment.apiUrl.root + environment.apiUrl.sectExt, section);
  }

  delete(section: Section) :Observable<any> {
    return this.http.delete(environment.apiUrl.root + environment.apiUrl.sectExt + section.id);
  }
}
