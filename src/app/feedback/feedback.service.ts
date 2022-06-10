import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private url = environment.baseUrl + '/public';

  constructor(private http?: HttpClient) { }

  sendFeedback(feedback: any) {
    return this.http.post(this.url + '/feedback/create', feedback);
  }

}
