import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisposalService {

  private url = environment.baseUrl + '/public/disposal';

  constructor(private http?: HttpClient) { }

  save(data): any {
    return this.http.post(this.url, data)
  }

  gets(id) {
    return this.http.get(this.url + "/" + id)
  }

  getPlan(id) {
    return this.http.get(this.url + "/plan/" + id)
  }

  get(id) {
    return this.http.get(this.url + '/get/' + id)
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id)
  }

  remove(id) {
    return this.http.delete(this.url + "/remove/" + id)
  }

  filter(data) {
    return this.http.post(this.url + "/filter/", data)
  }

  load_category() {
    return this.http.get(this.url + "/load_category/")
  }

  load_product(id) {
    return this.http.get(this.url + "/load_product/" + id)
  }

  load_specification(id) {
    return this.http.get(this.url + "/load_specification/" + id)
  }

  generate_report(data) {
    return this.http.post(this.url + "/report", data)
  }

}