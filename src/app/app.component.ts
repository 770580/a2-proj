import { Component, ViewChild, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs/Subscription';
import { PopupService } from './_services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  onLangChangeSubscription: Subscription;

  constructor(private popupService: PopupService, private translate: TranslateService, private cookieService: CookieService) {
    translate.addLangs(['en', 'ru']);
    const langFromCookie: string = this.cookieService.get('lang');
    if (langFromCookie && langFromCookie.match(/en|ru/)) {
      translate.use(langFromCookie);
    } else {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    }

    this.onLangChangeSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cookieService.put('lang', event.lang);
    });
  }

  ngOnInit() {
    this.translate
      .get('POPUPS.APP')
      .subscribe((text: string) => {
        this.popupService.doShow({
          text
        });
      });
  }
}
