import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit() {
    const skillsContainer = document.getElementById('skills');
    const root = document.documentElement;
    skillsContainer.addEventListener('mousemove', (e) => {
      root.style.setProperty('--mouse-x', e.x + 'px');
      root.style.setProperty('--mouse-y', e.y + 'px');
    });
  }
}
