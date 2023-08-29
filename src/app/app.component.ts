import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from './color-theme.service';
import { TranslateService } from '@ngx-translate/core'; // add this


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private colorThemeService: ColorThemeService, private translate: TranslateService) {
    this.initializeApp();
  }

  ngOnInit() {
    this.colorThemeService.applyTheme();
  }

  initializeApp() {
    this.translate.setDefaultLang('en'); 
  }
}
