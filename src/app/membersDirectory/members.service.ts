import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private url = environment.baseUrl + '/public';
  public original_url = environment.baseUrl;

  constructor(private http?: HttpClient) { }

  // post data
  create(data): any {
    return this.http.post(this.url + '/member', data)
  }

  // get Data
  getData(where: any, who: any) {
  return this.http.get(this.url + '/' + where + '/?email=' + who)
  }

  update(data) {
    return this.http.post(this.url + '/member/update', data)
  }

  get(email: any) {
    return this.http.get(this.url + '/member/?email=' + email)
  }

  detail(email: any) {
    return this.http.get(this.url + '/member/detail/?email=' + email)
  }

  gets() {
    return this.http.get(this.url + '/member/?language=' + localStorage.getItem('currentLanguage'))
  }

  remove(id: any) {
    return this.http.delete(this.url + '/member/remove/' + id)
  }

}
