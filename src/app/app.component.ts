import { Component, ViewChild } from '@angular/core';
import { PopupService } from './_services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private popupService: PopupService) {
    
  }

  ngOnInit() {
    this.popupService.doShow({
      text: 'App works!'
    });
  }
}
