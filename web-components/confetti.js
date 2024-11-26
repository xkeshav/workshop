// Define the custom element if not already defined.
class ConfettiComponent extends HTMLElement {
  constructor() {
    super();
    const template = document?.getElementById("confetti-template").content;
    this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));

    this.canvas = this.shadowRoot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.timeStep = 1 / 60;
    this.phase = 0;
    this.viewWidth = 512;
    this.viewHeight = 512;
    this.TWO_PI = Math.PI * 2;
    this.HALF_PI = Math.PI * 0.5;
    this.animationFrameId = null;

    this.resizeCanvas();
  }

  connectedCallback() {
    this.canvas.width = this.viewWidth;
    this.canvas.height = this.viewHeight;
    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.resizeCanvas.bind(this));
    this.stopAnimation();
  }

  resizeCanvas() {
    this.viewWidth = this.offsetWidth;
    this.viewHeight = this.offsetHeight;
    this.canvas.width = this.viewWidth;
    this.canvas.height = this.viewHeight;
  }

  startConfetti(random = false) {
    this.resetParticles();
    if (random) {
      this.createParticles(true);
    } else {
      this.createParticles(false);
    }
    this.phase = 2; // Directly to particle animation phase
    this.loop();
  }

  createParticles(random = false) {
    const centerX = this.viewWidth * 0.5;
    const centerY = this.viewHeight * 0.5;
    for (let i = 0; i < 128; i++) {
      const p0 = new Point(
        random ? Math.random() * this.viewWidth : centerX,
        random ? Math.random() * this.viewHeight : centerY
      );
      const p1 = new Point(Math.random() * this.viewWidth, Math.random() * this.viewHeight);
      const p2 = new Point(Math.random() * this.viewWidth, Math.random() * this.viewHeight);
      const p3 = new Point(Math.random() * this.viewWidth, this.viewHeight + 64);
      this.particles.push(new Particle(p0, p1, p2, p3));
    }
  }

  resetParticles() {
    this.particles.length = 0;
  }

  loop() {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  update() {
    this.particles.forEach((particle) => particle.update());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);
    this.particles.forEach((particle) => particle.draw(this.ctx));
  }
}

// Point class
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

// Particle class
class Particle {
  constructor(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    this.w = 8;
    this.h = 6;
    this.complete = false;
    this.x = p0.x;
    this.y = p0.y;
    this.opacity = Math.random();
    this.opacityChangeRate = Math.random() * 0.05 - 0.025;
  }

  update() {
    this.time = Math.min(this.duration, this.time + 1 / 60);
    const f = this.easeOutCubic(this.time / this.duration);
    const p = this.cubeBezier(this.p0, this.p1, this.p2, this.p3, f);
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    this.r = Math.atan2(dy, dx) + Math.PI / 2;
    this.sy = Math.sin(Math.PI * f * 10);
    this.x = p.x;
    this.y = p.y;
    this.opacity += this.opacityChangeRate;
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.opacityChangeRate *= -1;
    }
    this.complete = this.time >= this.duration;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.r);
    ctx.scale(1, this.sy);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  cubeBezier(p0, c0, c1, p1, t) {
    const nt = 1 - t;
    return new Point(
      nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x,
      nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y
    );
  }

  easeOutCubic(t) {
    return --t * t * t + 1;
  }
}
customElements.define("confetti-component", ConfettiComponent);
