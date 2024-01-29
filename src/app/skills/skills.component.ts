import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  mouse = {
    x: 0,
    y: 0,
  };
  @Input() language: string;

  @ViewChild('tilt')
  tiltElement: ElementRef<HTMLElement>;

  ngOnInit() {
    const skillsContainer = document.getElementById('skills');
    const root = document.documentElement;
    skillsContainer.addEventListener('mousemove', (e) => {
      root.style.setProperty('--mouse-x', e.x + 'px');
      root.style.setProperty('--mouse-y', e.y + 'px');
    });
  }

  ngAfterViewInit() {
    VanillaTilt.init(this.tiltElement.nativeElement, {
      max: 60,
      speed: 100,
      // reset: false,
      // startY: 20,
      // startX: 20,
      axis: 'x',
      transition: true,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      // scale: 1.1,
      perspective: 1000,
      // 'full-page-listening': true,
    });
  }
}
