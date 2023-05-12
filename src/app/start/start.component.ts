import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit, OnChanges {
  spots = [];
  hue: any;
  mouse = {
    x: undefined,
    y: undefined,
  };
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  resizeTextElement: any;
  text: String = 'Ich bin';

  @Input() language: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['language'].currentValue === 'en') {
      // console.log(changes['language'].currentValue);
      this.resizeTextElement.innerText = 'I am';
      this.resizeText();
    }
    if (
      changes['language'].currentValue === 'de' &&
      changes['language'].previousValue === 'en'
    ) {
      // console.log(changes['language'].currentValue);
      this.resizeTextElement.innerText = 'Ich bin';
      this.resizeText();
    }
  }

  ngOnInit() {
    this.resizeTextElement = document.querySelector('.start-vertical-text');
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = document.body.offsetWidth;
    this.canvas.height = window.innerHeight;
    this.hue = 0;

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y + window.scrollY;

      for (let i = 0; i < 3; i++) {
        this.spots.push(new Particle(this.mouse, this.hue, this.ctx));
      }
    });

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = document.querySelector('canvas').height;
      this.resizeText();
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });

    this.animate(this.ctx, this.canvas, this.hue);
    this.resizeText();
  }

  handleParticle() {
    for (let i = 0; i < this.spots.length; i++) {
      this.spots[i].update();
      this.spots[i].draw();
      for (let j = i; j < this.spots.length; j++) {
        const dx = this.spots[i].x - this.spots[j].x;
        const dy = this.spots[i].y - this.spots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 190) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.spots[i].color;
          this.ctx.lineWidth = this.spots[i].size / 10;
          this.ctx.moveTo(this.spots[i].x, this.spots[i].y);
          this.ctx.lineTo(this.spots[j].x, this.spots[j].y);
          this.ctx.stroke();
        }
      }
      if (this.spots[i].size <= 0.3) {
        this.spots.splice(i, 1);
        i--;
      }
    }
  }

  animate(ctx, canvas, hue) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)!;
    this.handleParticle();
    this.hue++;
    requestAnimationFrame(() => this.animate(ctx, canvas, hue));
  }

  isOverflown = (parentHeight, elementWidth) => elementWidth > parentHeight;

  resizeText() {
    this.resizeTextElement = document.querySelector('.start-vertical-text');
    let minSize = 5;
    let maxSize = 50;
    let step = 0.1;
    let unit = 'px';

    let i = minSize;
    let overflow = false;
    let el = this.resizeTextElement;
    console.log(el.innerText);

    const parent = this.resizeTextElement.parentNode;

    while (!overflow && i < maxSize) {
      console.clear();
      console.log('WHILE i=', i);
      el.style.fontSize = `${i}${unit}`;
      overflow = this.isOverflown(parent.clientHeight, el.clientWidth);

      if (!overflow) i += step;
    }
    console.log(window.innerWidth);
    if (window.innerWidth <= 1320) {
      el.style.fontSize = `${i - step * 27}${unit}`;
    } else {
      el.style.fontSize = `${i - step * 34}${unit}`;
    }
  }
}

class Particle {
  x: any;
  y: any;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  hue: number;
  ctx: any;
  constructor(mouse, hue, ctx) {
    this.x = mouse.x;
    this.y = mouse.y;
    this.hue = hue;
    this.ctx = ctx;
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 4 - 1;
    this.speedY = Math.random() * 4 - 1;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }

  update() {
    this.x += this.speedX;
    if (this.size > 0.1) this.size -= 0.03;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //arc-centerX, arc-centerY, arc-radius, arc-startAngle, arc-endAngle
    this.ctx.fill();
  }
}
