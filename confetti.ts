const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

// canvas settings
const viewWidth = 512;
const viewHeight = 512;
let ctx: CanvasRenderingContext2D | null;
const timeStep = 1 / 60;

class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Particle {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
  time: number;
  duration: number;
  color: string;
  w: number;
  h: number;
  x: number;
  y: number;
  r: number;
  sy: number;
  complete: boolean;

  constructor(p0: Point, p1: Point, p2: Point, p3: Point) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);

    this.w = 8;
    this.h = 6;

    this.x = p0.x;
    this.y = p0.y;
    this.r = 0;
    this.sy = 0;

    this.complete = false;
  }

  update() {
    this.time = Math.min(this.duration, this.time + timeStep);

    const f = Ease.outCubic(this.time, 0, 1, this.duration);
    const p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

    const dx = p.x - this.x;
    const dy = p.y - this.y;

    this.r = Math.atan2(dy, dx) + HALF_PI;
    this.sy = Math.sin(Math.PI * f * 10);
    this.x = p.x;
    this.y = p.y;

    this.complete = this.time === this.duration;
  }

  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.r);
    ctx.scale(1, this.sy);

    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

    ctx.restore();
  }
}

class Loader {
  x: number;
  y: number;
  r: number;
  private _progress: number;
  complete: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.r = 24;
    this._progress = 0;

    this.complete = false;
  }

  reset() {
    this._progress = 0;
    this.complete = false;
  }

  set progress(p: number) {
    this._progress = Math.max(0, Math.min(p, 1));
    this.complete = this._progress === 1;
  }

  get progress() {
    return this._progress;
  }

  draw() {
    if (!ctx) return;
    ctx.fillStyle = "transparent";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, -HALF_PI, TWO_PI * this._progress - HALF_PI);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.fill();
  }
}

class Exploder {
  x: number;
  y: number;
  startRadius: number;
  time: number;
  duration: number;
  progress: number;
  complete: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.startRadius = 24;
    this.time = 0;
    this.duration = 0.4;
    this.progress = 0;

    this.complete = false;
  }

  reset() {
    this.time = 0;
    this.progress = 0;
    this.complete = false;
  }

  update() {
    this.time = Math.min(this.duration, this.time + timeStep);
    this.progress = Ease.inBack(this.time, 0, 1, this.duration);

    this.complete = this.time === this.duration;
  }

  draw() {
    if (!ctx) return;
    ctx.fillStyle = "transparent";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.startRadius * (1 - this.progress), 0, TWO_PI);
    ctx.fill();
  }
}

const particles: Particle[] = [];
let loader: Loader;
let ExploderObject: Exploder;
let phase = 0;

export function initDrawingCanvas(elem: HTMLCanvasElement) {
  const drawingCanvas = elem;
  drawingCanvas.width = viewWidth;
  drawingCanvas.height = viewHeight;
  ctx = drawingCanvas.getContext("2d");

  createLoader();
  createExploder();
  createParticles();
}

function createLoader() {
  loader = new Loader(viewWidth * 0.5, viewHeight * 0.5);
}

function createExploder() {
  ExploderObject = new Exploder(viewWidth * 0.5, viewHeight * 0.5);
}

function createParticles() {
  for (let i = 0; i < 128; i++) {
    const p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
    const p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
    const p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
    const p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

    particles.push(new Particle(p0, p1, p2, p3));
  }
}

function update() {
  switch (phase) {
    case 0:
      loader.progress += 1 / 45;
      break;
    case 1:
      ExploderObject.update();
      break;
    case 2:
      particles.forEach((p) => p.update());
      break;
  }
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, viewWidth, viewHeight);

  switch (phase) {
    case 0:
      loader.draw();
      break;
    case 1:
      ExploderObject.draw();
      break;
    case 2:
      particles.forEach((p) => p.draw());
      break;
  }
}

export function loop() {
  update();
  draw();

  if (phase === 0 && loader.complete) {
    phase = 1;
  } else if (phase === 1 && ExploderObject.complete) {
    phase = 2;
  } else if (phase === 2 && checkParticlesComplete()) {
    phase = 0;
    loader.reset();
    ExploderObject.reset();
    particles.length = 0;
    createParticles();
  }

  requestAnimationFrame(loop);
}

function checkParticlesComplete() {
  return particles.every((p) => p.complete);
}

const Ease = {
  inCubic: (t: number, b: number, c: number, d: number) => {
    t /= d;
    return c * t * t * t + b;
  },
  outCubic: (t: number, b: number, c: number, d: number) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  inBack: (t: number, b: number, c: number, d: number, s = 1.70158) => {
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  }
};

function cubeBezier(p0: Point, c0: Point, c1: Point, p1: Point, t: number): Point {
  const p = new Point();
  const nt = 1 - t;

  p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
  p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

  return p;
}
