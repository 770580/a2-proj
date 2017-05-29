import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PopupComponent) popupComponent: PopupComponent;
  constructor() {
    
  }

  ngOnInit() {
    this.popupComponent.doShow({
      text: 'App works!'
    });
  }
}
