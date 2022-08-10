//Gerer la communication entre les components
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "./product-actions-types";

@Injectable({providedIn:"root"})
export class EventDriverService{
sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
sourceEventSubjectObservable=this.sourceEventSubject.asObservable();
publishEvent(event:ActionEvent){
  //a chaque fois que j'appelle cette methode je publie un evenement dans cette subject
  // et tous les composants qui font un subscribe a ce observable ils vont recevoir l'event
  this.sourceEventSubject.next(event);
}
}
