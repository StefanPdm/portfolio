import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hover() {
    document.getElementById('i-point')?.setAttribute('width', '249px');
  }

  dehover() {
    document.getElementById('i-point')?.setAttribute('width', '7.42px');
  }
}
