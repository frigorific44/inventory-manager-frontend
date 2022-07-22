import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  save(item: Item) :Observable<any> {
    return this.http.post(environment.apiUrl.root + environment.apiUrl.itemExt, item);
  }

  findById(id :number) :Observable<any> {
    return this.http.get(environment.apiUrl.root + environment.apiUrl.itemExt + id);
  }

  findBySection(sectionId: number) :Observable<any> {
    return this.findById(sectionId);
  }

  update(item: Item) :Observable<any> {
    return this.http.put(environment.apiUrl.root + environment.apiUrl.itemExt, item);
  }

  delete(item: Item) :Observable<any> {
    return this.http.delete(environment.apiUrl.root + environment.apiUrl.itemExt + item.parentId + "/" + item.id);
  }
}
