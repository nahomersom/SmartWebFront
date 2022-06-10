import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetTokenizeService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = localStorage.getItem('passwordResetKey');
    if (key) {
      const cloned = req.clone({
              headers: req.headers.set('Authorization', key)
          });
      return next.handle(cloned);
    } else {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', '')
    });
      return next.handle(cloned);
    }
  }
}
