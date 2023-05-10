import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sh-portfolio';
  language = 'de';

  onLanguageChanged(event: any) {
    console.log('Language changed to: ' + event.language);
    this.language = event.language;
  }
}
