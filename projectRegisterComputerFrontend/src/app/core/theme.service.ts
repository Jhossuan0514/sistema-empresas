// src/app/core/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly darkClass = 'dark-theme';
  private themeSubject = new BehaviorSubject<'light' | 'dark'>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  private getInitialTheme(): 'light' | 'dark' {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.themeSubject.next(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  private applyTheme(theme: 'light' | 'dark') {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add(this.darkClass);
    } else {
      body.classList.remove(this.darkClass);
    }
  }
}
