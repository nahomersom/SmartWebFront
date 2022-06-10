import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

 private url = environment.baseUrl + '/public/bidz/';

  constructor(private http?: HttpClient) { }

  getComplains(data: Object) {
    return this.http.post(this.url + 'load_complain', data)
  }

  loadBids(data: Object) {
    return this.http.post(this.url + 'load_bid', data)
  }

  createComplain(data: Object) {
    return this.http.post(this.url + 'send_complain', data)
  }
}
