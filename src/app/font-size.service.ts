import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FontSizeService {
  private fontSizeKey = 'fontSize'; // Key for localStorage

  private fontSizeSource = new BehaviorSubject<string>('medium');
  currentFontSize = this.fontSizeSource.asObservable();

  constructor() {
    const savedFontSize = localStorage.getItem(this.fontSizeKey);
    if (savedFontSize) {
      this.fontSizeSource.next(savedFontSize);
    }
  }

  changeFontSize(fontSize: string) {
    localStorage.setItem(this.fontSizeKey, fontSize);
    this.fontSizeSource.next(fontSize);
  }
}