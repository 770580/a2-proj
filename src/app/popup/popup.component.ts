import { Component, OnInit } from '@angular/core';
import { Popup } from '../popup.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private popupList: Popup[] = [];
  private lastId: number = 0;

  constructor() { }

  ngOnInit() {
  }

  doShow(params: any) {
    let paramsWithID: Popup = {...params, id: this.lastId};

    this.popupList.push(new Popup(paramsWithID));

    this.lastId += 1;
  }

  afterClose(popup: Popup) {
    this.popupList = this.popupList.filter(item => item.id !== popup.id);
  }
}
