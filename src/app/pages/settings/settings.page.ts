import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FontSizeService } from 'src/app/font-size.service';




@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  selectedFontSize: string = 'medium';
  language: string = this.translateService.currentLang;

  constructor( private renderer: Renderer2, private translateService: TranslateService, private fontSizeService: FontSizeService) { }
  ngOnInit(){
    this.loadColorTheme();
    this.loadLanguage();
    const savedFontSize = localStorage.getItem('fontSize');

  if (savedFontSize) {
    this.selectedFontSize = savedFontSize;
    document.documentElement.style.setProperty('--font-size', savedFontSize);
  }
  }

  onColorThemeChanged(event: any) {
    const selectedOption = event.detail.value;

    if (selectedOption === 'dark') {
      // Set dark theme
      document.body.setAttribute('color-theme', 'dark');
      this.setAndSaveColorTheme('dark');
    } else if (selectedOption === 'light') {
      // Set light theme
      document.body.setAttribute('color-theme', 'light');
      this.setAndSaveColorTheme('light');
    } else if (selectedOption === 'warning') {
      // Set warning theme
      document.body.setAttribute('color-theme', 'warning');
      this.setAndSaveColorTheme('warning');
    }
  }

  
  private setAndSaveColorTheme(theme: string) {
    document.body.setAttribute('color-theme', theme);
    localStorage.setItem('colorTheme', theme); // Save to Local Storage
  }

  private loadColorTheme() {
    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme) {
      this.setAndSaveColorTheme(savedTheme);
    }
  }

  languageChange() {
    this.translateService.use(this.language);
    this.saveLanguage(); // Save the selected language to Local Storage
  }

  private saveLanguage() {
    localStorage.setItem('selectedLanguage', this.language);
  }

  private loadLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.language = savedLanguage;
      this.translateService.use(savedLanguage);
    }
  }

  onFontSizeChanged(event: any) {
    const selectedFontSize = event.detail.value;
    this.selectedFontSize = selectedFontSize;
    this.fontSizeService.changeFontSize(selectedFontSize);
    
    // Save the selected font size in localStorage
    localStorage.setItem('fontSize', selectedFontSize);
  
    // Apply the selected font size to the entire app
    document.documentElement.style.setProperty('--font-size', selectedFontSize);
  }
}






