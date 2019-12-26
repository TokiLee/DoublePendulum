// Richard Lee
// rod length
let length1 = 100;
let length2 = 100;

// pendulum mass weight
let mass1 = 1;
let mass2 = 1;

let angle1 = 0;
let angle2 = 0;
let angle1_v = 0;
let angle2_v = 0;

let g = 1;

let prevX2 = -1;
let prevY2 = -1;
let originX, originY;

let buffer;

let display_line = false;

let damp_toggle = false;

// create window to house the double pendulum
window.setup = function () {
  let canvas = createCanvas(1000, 800);
  canvas.parent("main-canvas");
  frameRate(30);
  pixelDensity(1);
  angle1 = PI / 2;
  angle2 = PI / 2;
  originX = width / 2;
  originY = 150;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(originX, originY);

  // Sliders
  $(".length1").on("change", function () {
    length1 = $(this).val();
    $(".length1-input").val(length1);
  });
  $(".length2").on("change", function () {
    length2 = $(this).val();
    $(".length2-input").val(length2);
  });
  $(".mass1").on("change", function () {
    mass1 = $(this).val();
    $(".mass1-input").val(mass1);
  });
  $(".mass2").on("change", function () {
    mass2 = $(this).val();
    $(".mass2-input").val(mass2);
  });
  $(".gravity").on("change", function () {
    gravity = $(this).val();
    $(".gravity-input").val(gravity);
  });

  // Buttons
  $(".length1-button").click(function () {
    length1 = $(".length1-input").val();
    $(".length1").val(length1);
  });
  $(".length2-button").click(function () {
    length2 = $(".length2-input").val();
    $(".length2").val(length2);
  });
  $(".mass1-button").click(function () {
    mass1 = $(".mass1-input").val();
    $(".mass1").val(mass1);
  });
  $(".mass2-button").click(function () {
    mass2 = $(".mass2-input").val();
    $(".mass2").val(mass2);
  });
  $(".gravity-button").click(function () {
    g = $(".gravity-input").val();
    $(".gravity").val(g);
  });

  // Line toggle
  $(".line-box").on("change", function () {
    display_line = !display_line;
  });

  // Dampening toggle
  $(".damp-box").on("change", function () {
    damp_toggle = !damp_toggle;
  });

  // Clear
  $(".clear-button").click(function () {
    clearBuffer();
  });

  // Reset
  $(".reset-button").click(function () {
    reset();
  });
};

window.draw = function () {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // double pendulum formula
  let num1 = -g * (2 * mass1 + mass2) * sin(angle1);
  let num2 = -mass2 * g * sin(angle1 - 2 * angle2);
  let num3 = -2 * sin(angle1 - angle2) * mass2;
  let num4 =
    angle2_v * angle2_v * length2 +
    angle1_v * angle1_v * length1 * cos(angle1 - angle2);
  let den =
    length1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angle1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(angle1 - angle2);
  num2 = angle1_v * angle1_v * length1 * (mass1 + mass2);
  num3 = g * (mass1 + mass2) * cos(angle1);
  num4 = angle2_v * angle2_v * length2 * mass2 * cos(angle1 - angle2);
  den = length2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angle2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(originX, originY);
  stroke(0);
  strokeWeight(2);

  let x1 = length1 * sin(angle1);
  let y1 = length1 * cos(angle1);

  let x2 = x1 + length2 * sin(angle2);
  let y2 = y1 + length2 * cos(angle2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, 5, 5);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, 5, 5);

  angle1_v += angle1_a;
  angle2_v += angle2_a;
  angle1 += angle1_v;
  angle2 += angle2_v;
  if (damp_toggle) {
    angle1_v *= 0.999;
    angle2_v *= 0.999;
  }

  if (display_line) {
    buffer.stroke(0);
    if (frameCount > 1) {
      buffer.line(prevX2, prevY2, x2, y2);
    }
  }

  prevX2 = x2;
  prevY2 = y2;
};

function clearBuffer() {
  buffer.clear();
}

function reset() {
  length1 = 100;
  length2 = 100;

  mass1 = 1;
  mass2 = 1;

  angle1 = 0;
  angle2 = 0;
  angle1_v = 0;
  angle2_v = 0;

  g = 1;

  prevX2 = -1;
  prevY2 = -1;

  angle1 = PI / 2;
  angle2 = PI / 2;

  $(".length1").val(length1);
  $(".length1-input").val(length1);
  $(".length2").val(length2);
  $(".length2-input").val(length2);
  $(".mass1").val(mass1);
  $(".mass1-input").val(mass1);
  $(".mass2").val(mass2);
  $(".mass2-input").val(mass2);
  $(".gravity").val(g);
  $(".gravity-input").val(g);
  $(".line-box").prop("checked", false);
  $(".damp-box").prop("checked", false);

  display_line = false;
  damp_toggle = false;

  buffer.clear();
}