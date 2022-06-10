
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService{
  loadingState$ = new BehaviorSubject<boolean>(false);
   constructor() { }
}
