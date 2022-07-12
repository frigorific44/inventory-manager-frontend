import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemClass } from '../models/item-class.model';
import { SectionClass } from '../models/section-class.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  save(item: ItemClass) :Observable<any> {
    return this.http.post(environment.apiUrl.root + environment.apiUrl.itemExt, item);
  }

  findById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl.root + environment.apiUrl.itemExt + id);
  }

  findByWarehouse(section: SectionClass) :Observable<any> {
    return this.findById(section.id);
  }
}
