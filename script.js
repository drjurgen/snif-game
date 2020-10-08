"use strict";

window.addEventListener("DOMContentLoaded", loadSVG);

let svg;
let snifX = 131;
let snifY = 237;

let tvX;
let tvY;
let walkingToTv = false;

let windowX;
let windowY;
let walkingToWindow = false;

function loadSVG() {
  console.log("load the SVG");
  fetch("livingroom.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("SVG loaded");
      document.querySelector("#living-room").innerHTML = svgData;

      //   document.querySelector("#living-room svg").setAttribute("viewBox", `100 100 200 103.75`);

      // add eventlisteners to tv and window
      document.querySelector("#tv").addEventListener("click", goToTv);
      document.querySelector("#window").addEventListener("click", goToWindow);

      addAnimationClasses();
    });
}
function addAnimationClasses() {
  document.querySelector("svg #snif").classList.add("walk");

  runLoop();
}

function runLoop() {
  if (document.querySelector("#snif").style.animationPlayState === "paused") {
  } else {
    findSnifLocation();

    if (walkingToTv === true) {
      inFrontTv();
    }

    if (walkingToWindow === true) {
      inFrontWindow();
    }

    window.requestAnimationFrame(runLoop);
  }
}

function findSnifLocation() {
  svg = document.querySelector("svg");

  //snif vector coordinates
  snifX = document.querySelector("#snif ellipse").getBoundingClientRect().x;
  snifY = document.querySelector("#snif ellipse").getBoundingClientRect().y;
  snifX = screenToSVG(svg, snifX, snifY).x;
  snifY = screenToSVG(svg, snifX, snifY).y;

  //tv vector coordinates
  tvX = document.querySelector(".st165").getBoundingClientRect().x;
  tvY = document.querySelector(".st165").getBoundingClientRect().y;
  tvX = screenToSVG(svg, tvX, tvY).x;
  tvY = screenToSVG(svg, tvX, tvY).y;

  //window vector coordinates
  windowX = document.querySelector("#window").getBoundingClientRect().x;
  windowY = document.querySelector("#window").getBoundingClientRect().y;
  windowX = screenToSVG(svg, windowX, windowY).x;
  windowY = screenToSVG(svg, windowX, windowY).y;
}

function screenToSVG(svg, x, y) {
  let pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  let cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: Math.floor(cursorPt.x), y: Math.floor(cursorPt.y) };
}

function goToTv() {
  walkingToTv = true;
  walkingToWindow = false;
  document.querySelector("#snif").style.animationPlayState = "running";
  runLoop();
}

function inFrontTv() {
  if (tvX - snifX < 5) {
    // console.clear();
    console.log("snif x:", snifX);
    console.log("tv x:", tvX);
    console.log("snif kan nu slukke tv");
    document.querySelector("#snif").style.animationPlayState = "paused";
    walkingToTv = false;
  }
}

function goToWindow() {
  walkingToWindow = true;
  walkingToTv = false;
  document.querySelector("#snif").style.animationPlayState = "running";
  runLoop();
}

function inFrontWindow() {
  if (snifX - windowX > 15 && snifY - windowY < 120) {
    // console.clear();
    console.log("snif x:", snifX);
    console.log("window x:", windowX);
    console.log("snif kan nu lukke vinduet");
    document.querySelector("#snif").style.animationPlayState = "paused";
    walkingToWindow = false;
  }
}
