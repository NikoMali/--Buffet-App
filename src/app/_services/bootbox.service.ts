import { Injectable } from '@angular/core';

declare var bootbox: any;

@Injectable({
  providedIn: 'root'
})
export class BootboxService {

constructor() { }


  alert(message: string) {
    bootbox.alert(message);
  }
}
