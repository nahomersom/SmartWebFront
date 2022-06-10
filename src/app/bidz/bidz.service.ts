import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidzService {

  private url = environment.baseUrl + '/public';

  constructor(private http?: HttpClient) { }

  gets(endpoint?: any) {
    if (endpoint) {
      return this.http.get(this.url + '/bidz/' + endpoint);
    }
    else {
      return this.http.get(this.url + '/bidz');
    }
  }

  detail(method: string) {
    return this.http.get(this.url + '/bidz/winners/' + method);
  }

  postGet(data: any, endpoint: any) {
    return this.http.post(this.url + '/bidz/' + endpoint, data);
  }

}
