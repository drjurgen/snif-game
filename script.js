"use strict";

window.addEventListener("DOMContentLoaded", loadSVG);

let svg;
let snif;
let snifX;
let snifY;

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

      loadSnif();
    });
}

function loadSnif() {
  fetch("snif_sprite.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("Snif loaded");
      document.querySelector("#hidden_snif").innerHTML = svgData;

      document.querySelector("#snif_front_right").style.display = "none";
      //document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      addAnimationClasses();
    });
}

function addAnimationClasses() {
  document.querySelector("#living-room svg #snif").classList.add("walk");

  runLoop();
}

function runLoop() {
  if (document.querySelector("#snif").style.animationPlayState === "paused") {
  } else {
    playLivingRoom();
  }

  window.requestAnimationFrame(runLoop);
}

function playLivingRoom() {
  // add eventlisteners to tv and window
  document.querySelector("#tv").addEventListener("click", goToTv);
  document.querySelector("#window").addEventListener("click", goToWindow);

  findSnifLocation();

  if (walkingToTv === true) {
    inFrontTv();
  }

  if (walkingToWindow === true) {
    inFrontWindow();
  }

  function findSnifLocation() {
    svg = document.querySelector("svg");

    calcSnifCoordinates();
    function calcSnifCoordinates() {
      //snif vector coordinates
      snif = document.querySelector("#snif");
      const percent = snif.computedStyleMap().get("offset-distance").value;

      // find coordinates from the path
      const path = document.querySelector("#path");
      const length = path.getTotalLength();
      const positionOnPath = (length * percent) / 100;
      const point = path.getPointAtLength(positionOnPath);
      snifX = Math.floor(point.x);
      snifY = Math.floor(point.y);

      chooseSnifDirection(positionOnPath);
    }

    //tv vector coordinates
    tvX = document.querySelector(".st165").getBBox().x;
    tvY = document.querySelector(".st165").getBBox().y;

    //window vector coordinates
    windowX = document.querySelector("#window").getBBox().x;
    windowY = document.querySelector("#window").getBBox().y;

    console.log({ snifX, snifY });
  }

  function goToTv() {
    walkingToTv = true;
    walkingToWindow = false;
    document.querySelector("#snif").style.animationPlayState = "running";
  }

  function inFrontTv() {
    if (tvX - snifX < 5 && snifX > 170 && snifX < 190 && snifY < 200) {
      console.log("snif x and y:", { snifX, snifY });
      console.log("tv x and y:", { tvX, tvY });
      console.log("snif kan nu slukke tv");
      document.querySelector("#snif").style.animationPlayState = "paused";
      walkingToTv = false;
    }
  }

  function goToWindow() {
    walkingToWindow = true;
    walkingToTv = false;
    document.querySelector("#snif").style.animationPlayState = "running";
  }

  function inFrontWindow() {
    if (snifY - windowY < 135 && snifY - windowY > 0 && snifX < 100) {
      console.log("snif x and y:", { snifX, snifY });
      console.log("window x and y:", { tvX, tvY });
      console.log("snif kan nu lukke vinduet");
      document.querySelector("#snif").style.animationPlayState = "paused";
      walkingToWindow = false;
    }
  }

  function chooseSnifDirection(positionOnPath) {
    console.log(positionOnPath);
    let snifDirection;

    if(positionOnPath < 310 && positionOnPath > 200) {
      snifDirection = "back right";
      showSnifDirection(snifDirection)

    } else if(positionOnPath < 210 && positionOnPath > 110) {
      snifDirection = "front right";
      showSnifDirection(snifDirection)
      
    } else if(positionOnPath < 100) {
      snifDirection = "front left";
      showSnifDirection(snifDirection)
    } else if(positionOnPath < 50) {
      snifDirection = "back left";
      showSnifDirection(snifDirection)
    }

  }

  function showSnifDirection(snifDirection) {
    if(snifDirection === "back right") {
      console.log(snifDirection)
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_back_right").style.display = "inline";
    } else if(snifDirection === "front right") {
      console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";

      // show correct direction
      document.querySelector("#snif_front_right").style.display = "inline";
    } else if(snifDirection === "back left") {
      console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_back_left").style.display = "inline";
    } else if(snifDirection === "front left") {
      console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_front_left").style.display = "inline";
    }

  }
}

// Blackbox svg coordinates - currently not used
function screenToSVG(svg, x, y) {
  let pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  let cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: Math.floor(cursorPt.x), y: Math.floor(cursorPt.y) };
}
