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
  fetch("livingroom_2_svg.svg")
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
  //document.querySelector("svg #snif").classList.add("walk");


  //add eventlisteners to GUI elements
  animateSpeaker();
  addGuiEvents();
  //runLoop();
}



function animateSpeaker() {

  //animate notes
  document.querySelector("#left_speaker #note1_1_").classList.add("note");
  setTimeout(function () {
    document.querySelector("#left_speaker #note2_1_").classList.add("note");
  }, 1000);
  setTimeout(function () {
    document.querySelector("#left_speaker #note3_1_").classList.add("note");
  }, 2000);

  document.querySelector("#right_speaker #note1_2_").classList.add("note");
  setTimeout(function () {
    document.querySelector("#right_speaker #note2_2_").classList.add("note");
  }, 1000);
  setTimeout(function () {
    document.querySelector("#right_speaker #note3_2_").classList.add("note");
  }, 2000);

  //animate speaker - to do
  document.querySelector("#left_speaker_upper").classList.toggle("scale2");
  document.querySelector("#right_speaker_upper").classList.toggle("scale2");

  document.querySelector("#left_speaker_inner1").classList.toggle("speaker");
  document.querySelector("#left_speaker_inner2").classList.toggle("speaker");
  document.querySelector("#left_speaker_inner3").classList.toggle("speaker");
  document.querySelector("#right_speaker_inner1").classList.toggle("speaker");
  document.querySelector("#right_speaker_inner2").classList.toggle("speaker");
  document.querySelector("#right_speaker_inner3").classList.toggle("speaker");

  //animate fan
  document.querySelector("#fan_blades").classList.add("spin");



}

function addGuiEvents() {

  //ceiling lights Eventlisteners
  document.querySelector("#lightswitch_left_2_").addEventListener("click", offCeilingLeft);
  document.querySelector("#lightswitch_right_1_").addEventListener("click", offCeilingRight);


  function offCeilingLeft() {
    console.log("yo")
    document.querySelector("#left_ceiling_lamp_1_ #light_4_").classList.toggle("hide");
    document.querySelector("#lightswitch_left_2_").classList.toggle("hide");


  }


  function offCeilingRight() {
    console.log("yo2")

    document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.toggle("hide");
    document.querySelector("#lightswitch_right_1_").classList.toggle("hide");


    // document.querySelector("#lightswitch_right_1_").removeEventListener("click", turnOffCeiling2);

    // document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.add("hide");
    // document.querySelector("#lightswitch_right_1_").addEventListener("click", turnOnCeiling2);

    // function turnOnCeiling2() {
    //   document.querySelector("#lightswitch_right_1_").removeEventListener("click", turnOnCeiling2);
    //   document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.remove("hide");
    //   document.querySelector("#lightswitch_right_1_").addEventListener("click", turnOffCeiling2);
    //}
  }

  //speaker listeners
  document.querySelector("#left_speaker").addEventListener("click", stopLeftSpeaker);
  document.querySelector("#right_speaker").addEventListener("click", stopRightSpeaker);

  function stopLeftSpeaker() {
    document.querySelectorAll("#left_speaker #music_x5F_note_x5F_r").forEach(g => g.classList.toggle("hide"));
    document.querySelector("#left_speaker_inner1").classList.toggle("speaker");
    document.querySelector("#left_speaker_inner2").classList.toggle("speaker");
    document.querySelector("#left_speaker_inner3").classList.toggle("speaker");

    document.querySelector("#left_speaker_upper").classList.toggle("scale2");

  }

  function stopRightSpeaker() {
    document.querySelectorAll("#right_speaker #music_x5F_note_x5F_r_1_").forEach(g => g.classList.toggle("hide"));
    document.querySelector("#right_speaker_inner1").classList.toggle("speaker");
    document.querySelector("#right_speaker_inner2").classList.toggle("speaker");
    document.querySelector("#right_speaker_inner3").classList.toggle("speaker");

    document.querySelector("#right_speaker_upper").classList.toggle("scale2");


  }

  //radiator eventlistener
  document.querySelector("#radiator_x5F_hot").addEventListener("click", offRadiator);

  function offRadiator() {
    console.log("yoyo");

    document.querySelector("#radiator_x5F_hot").classList.toggle("hide");

  }

  //tv listener
  document.querySelector("#tv").addEventListener("click", offTv);

  function offTv() {
    document.querySelector("#tv_static").classList.toggle("hide");
  }

  //off ipad
  document.querySelector("#ipad").addEventListener("click", offIpad);

  function offIpad() {
    document.querySelector("#ipad_screen").classList.toggle("hide");
  }


  //off fan
  document.querySelector("#fan").addEventListener("click", offFan);

  function offFan() {
    document.querySelector("#fan_blades").classList.toggle("spin");
  }

  //off floor lamp
  document.querySelector("#floor_lamp").addEventListener("click", offFloorLamp);

  function offFloorLamp() {
    document.querySelector("#floor_lamp #light_1_").classList.toggle("hide");

  }

}



function runLoop() {
  if (document.querySelector("#snif").style.animationPlayState === "paused") {} else {
    findSnifLocation();

    if (walkingToTv === true) {
      inFrontTv();
    }

    if (walkingToWindow === true) {
      inFrontWindow();
    }

    //window.requestAnimationFrame(runLoop);
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
  return {
    x: Math.floor(cursorPt.x),
    y: Math.floor(cursorPt.y)
  };
}

function goToTv() {
  walkingToTv = true;
  walkingToWindow = false;
  // document.querySelector("#snif").style.animationPlayState = "running";
  //runLoop();
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