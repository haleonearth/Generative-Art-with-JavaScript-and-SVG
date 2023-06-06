import { SvJs, Gen, Noise } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Style the slinky.
svg.create('style').content(`
  #slinky path {
    fill: none;
    stroke-width: 0.7;
    stroke-linecap: round;
  }`
);

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Choose a random starting hue.
let hue = Gen.random(0, 360, false);

// Set up the slinky path group.
let slinky = svg.create('g').set({ id: 'slinky' });

// Create the quadratic curves.
for (let i = 0; i < 500; i += 5) {
  let cpx = Gen.random(200, 400, false);
  let cpy = i - 400;

  // The main path.
  slinky.create('path').set({
    stroke: `hsl(${hue} 90% 80% / 0.85)`,
    d: `M 0 ${i} q ${cpx} ${cpy} 600 0`
  });

  // A faint offset path to suggest motion.
  slinky.create('path').set({
    stroke: `hsl(${hue} 90% 80% / 0.25)`,
    d: `M 0 ${i - 2} q ${cpx} ${cpy - 2} 600 -2`
  });

  hue = (hue === 360) ? 0 : hue + 1.5;
}

slinky.moveTo(500, 500);