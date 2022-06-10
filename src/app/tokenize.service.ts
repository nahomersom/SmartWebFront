import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenizeService {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('key');
    if (token) {
      let cloned;
      cloned = req.clone({ headers: req.headers.set('Authorization', token)});
      return next.handle(cloned);
    } else {
        return next.handle(req);
    }
  }
}
