import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  private themeKey = 'colorTheme';

  applyTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);

    if (savedTheme) {
      document.body.setAttribute('color-theme', savedTheme);
    }
  }

  setTheme(theme: string) {
    document.body.setAttribute('color-theme', theme);
    localStorage.setItem(this.themeKey, theme);
  }
}