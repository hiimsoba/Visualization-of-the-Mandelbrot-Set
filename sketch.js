const TILE_SIZE = 1024;
const MAX_STEPS = 512;

let complex = function(r, i) {
  this.re = r;
  this.im = i;
};

function modulus(c) {
  let num = (c.re * c.re + c.im * c.im);
  return sqrt(num);
}

function multiply(a, b) {
  let result = new complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
  return result;
}

function add(a, b) {
  let result = new complex(a.re + b.re, a.im + b.im);
  return result;
}

function escapeSteps(c) {
  let steps = 0;

  let w = new complex(0, 0);

  while (modulus(w) < 2) {
    steps++;
    if (steps == MAX_STEPS) {
      return -1;
    }
    w = add(multiply(w, w), c);
  }

  return steps;
}

function pixelColor(steps) {
  return color(steps % 256, steps % 128, (steps * steps) % 256);
}

let zoom;
let halfSize;

function setup() {
  createCanvas(TILE_SIZE, TILE_SIZE);
  pixelDensity(1);
  zoom = pow(2, -10);
  halfSize = TILE_SIZE / 2;
}

function draw() {
  //  return;
  background(255);
  let center = new complex(-1.002, -0.28);

  let firstElement = new complex(center.re - halfSize * zoom, center.im - halfSize * zoom);
  let currentRe = firstElement.re;
  let currentIm = firstElement.im;

  //  noStroke();
  noFill();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let currentPoint = new complex(currentRe, currentIm);
      currentRe += zoom;
      stroke(pixelColor(escapeSteps(currentPoint)));
      point(x, y);
    }
    currentRe = firstElement.re;
    currentIm += zoom;
  }
  noLoop();
}
