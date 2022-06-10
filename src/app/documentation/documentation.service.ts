import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private url = environment.baseUrl + '/public';
  public original_url = environment.baseUrl + '/';

  constructor(private http?: HttpClient) { }

   getPublicDocument(categoryId: string) {
    return this.http.get(this.url + '/document/?language=' + localStorage.getItem('currentLanguage')
    + ' & status=true & memberOnly=False & categoryId='+ categoryId);
   }

   getPrivateDocument() {
    return this.http.get(this.url + '/document/?language=' + localStorage.getItem('currentLanguage')
    + ' & status=true & memberOnly=True');
   }

}
