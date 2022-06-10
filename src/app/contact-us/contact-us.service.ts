import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private url = environment.baseUrl + '/public';

  constructor(private http?: HttpClient) { }

  loadContact() {
    return this.http.get(this.url + '/setting/');
   }

   sendMessage(message: any) {
    return this.http.post(this.url + '/message/', message);
   }
}
