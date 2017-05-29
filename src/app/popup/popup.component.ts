import { Component, OnInit } from '@angular/core';
import { Popup } from '../popup.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  //private popup: Popup;
  private popupList: Popup[] = [];

  constructor() { }

  ngOnInit() {
  }

  doShow(params: any) {
    this.popupList.push(new Popup(params));
  }
}
