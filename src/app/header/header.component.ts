import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  language = 'de';
  @Output() languageChanged = new EventEmitter<{ language: string }>();

  /**
   * hover effect logo
   */
  hover() {
    document.getElementById('i-point')?.setAttribute('width', '249px');
    document.getElementById('i-point')?.setAttribute('height', '7px');
  }

  /**
   * dehover effect logo
   */
  dehover() {
    document.getElementById('i-point')?.setAttribute('width', '7.42px');
    document.getElementById('i-point')?.setAttribute('height', '8.14px');
  }

  toggleMobileMenu(id: string) {
    document.getElementById('mobile-menu').classList.toggle('toggle-menu');
    document.getElementById(id).classList.toggle('d-none');
  }

  toggleLanguage() {
    this.language === 'de' ? (this.language = 'en') : (this.language = 'de');
    this.languageChanged.emit({ language: this.language });
  }
}
