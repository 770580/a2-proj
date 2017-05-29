import { Component, OnInit } from '@angular/core';
import { Popup } from '../popup.model';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private popupList: Popup[] = [];

  constructor(private popupService: PopupService) {
    this.popupList = this.popupService.getPopupList();
  }

  ngOnInit() {
  }

  afterClose(popup: Popup) {
    this.popupService.afterClose(popup);
  }
}
