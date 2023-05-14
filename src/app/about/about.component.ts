import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @Input() language: string;
  hiddenElement: any;
  observer: IntersectionObserver;

  ngOnInit() {
    this.hiddenElement = document.querySelectorAll('.hidden');
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });
    this.hiddenElement.forEach((element) => {
      this.observer.observe(element);
    });
  }
}
