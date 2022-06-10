import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = environment.baseUrl;

  constructor(private http?: HttpClient) { }

  create(where: any, what: any): any {
    return this.http.post(this.url + where, what);
  }

  get(url: any) {
    return this.http.get(this.url +  url);
  }

   update(url: any, data: any) {
    return this.http.post(this.url + url, data);
  }

  search(value: any) {
    return this.http.post(this.url + '/student/search', value)
  }

}
