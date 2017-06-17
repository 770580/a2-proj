import { Component, ViewChild, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PopupService } from './_services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private popupService: PopupService, translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.popupService.doShow({
      text: 'App works!'
    });
  }
}
