import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() language: string;

  /**
   * hover effect logo
   */
  hover() {
    document.getElementById('i-point-footer')?.setAttribute('width', '249px');
  }

  /**
   * dehover effect logo
   */
  dehover() {
    document.getElementById('i-point-footer')?.setAttribute('width', '7.42px');
  }

  toggleImpressum() {
    document.getElementById('impressum').classList.toggle('show-impressum');
  }
}
