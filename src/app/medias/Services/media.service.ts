import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url = environment.baseUrl + '/public';
  public original_url = environment.baseUrl + '/';

  constructor(private http?: HttpClient) { }

   getMedias(categoryId: string) {
      return this.http.get(this.url + '/media?categoryId='+ categoryId);
   }
   getimages() {
    return this.http.get(this.url + '/media/Filter/?mediaType=Images&featured=true')
 }
   filiterMedia(type: any, categoryId: string) {
    return this.http.get(this.url + '/media/Filter/?mediaType=' + type + '&categoryId='+categoryId)
  }

}
