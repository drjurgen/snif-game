"use strict";

window.addEventListener("DOMContentLoaded", start);

let svg;
let snifX = 131;
let snifY = 237;

let tvX;
let tvY;
let walkingToTv = false;

let windowX;
let windowY;
let walkingToWindow = false;

let showerRunning;
let sinkRunning;

function start() {
  document.querySelector("button").addEventListener("click", loadSVG);
}

function loadSVG() {
  document.querySelector("button").removeEventListener("click", loadSVG);

  console.log("load the SVG");
  fetch("bathroom_snif.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("SVG loaded");
      document.querySelector("#living-room").innerHTML = svgData;

      //   document.querySelector("#living-room svg").setAttribute("viewBox", `100 100 200 103.75`);

      // add eventlisteners to tv and window
      //document.querySelector("#tv").addEventListener("click", goToTv);
      //document.querySelector("#window").addEventListener("click", goToWindow);

      //addAnimationClasses();
      addAnimationBathroom();
    });
}

function addAnimationClasses() {
  //document.querySelector("svg #snif").classList.add("walk");


  //add eventlisteners to GUI elements
  animateSpeaker();
  animateFan();
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
}

function animateFan() {
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

function addAnimationBathroom() {
  document.querySelectorAll("audio").forEach(audio => audio.volume = 0.2);

  document.querySelector("#hairdryer").classList.toggle("vibrate");
  document.querySelector("#hairdryer_sfx").play();
  document.querySelector("#hairdryer_sfx").currentTime = 10;
  document.querySelector("#hairdryer_cord").classList.toggle("vibrate_cord");

  document.querySelector("#washer_2_").classList.toggle("vibrate2");
  document.querySelector("#washing_machine_sfx").play();

  document.querySelector("#dryer_2_").classList.toggle("vibrate2");
  document.querySelector("#dryer_sfx").play();

  document.querySelector("#washer_2_ #inner_washer").classList.toggle("spin");

  sinkRunning = true;

  startSink();




  document.querySelector("#sink_water").classList.toggle("sink_water");

  showerRunning = true;
  document.querySelector("#shower_puddle #puddle_c").classList.toggle("puddle_scale_center");
  document.querySelector(`#puddle_ring1`).classList.add("hide");
  document.querySelector(`#puddle_ring2`).classList.add("hide");
  document.querySelector(`#puddle_ring3`).classList.add("hide");
  document.querySelector(`#puddle_ring4`).classList.add("hide");



  showerDrop();
  document.querySelector("#wind_sfx").play();


  addEventsBathroom();
}

function startSink() {

  console.log("start")

  document.querySelector("#sink_drops_2_ #drop1_2_").classList.add("drop");
  document.querySelector("#sink_drops_2_ #drop1_2_").addEventListener("animationend", playSink);

  function playSink() {
    document.querySelector("#sink_drops_2_ #drop1_2_").removeEventListener("animationend", playSink);
    console.log("play")
    document.querySelector("#sink_drip_sfx").play();
    document.querySelector("#sink_drops_2_ #drop1_2_").classList.remove("drop");
    if (sinkRunning === true) {
      setTimeout(startSink, 2000);
    }

  }

}

function addEventsBathroom() {
  document.querySelector("#hairdryer").addEventListener("click", stopHairdryer);

  function stopHairdryer() {
    document.querySelector("#hairdryer_sfx").pause();
    document.querySelector("#hairdryer_sfx").currentTime = 10;
    document.querySelector("#hairdryer").classList.toggle("vibrate");
    document.querySelector("#hairdryer_cord").classList.toggle("vibrate_cord");

    document.querySelector("#hot_circle").classList.toggle("hide");
  }
  document.querySelector("#washer_2_").addEventListener("click", stopWasher);

  function stopWasher() {
    document.querySelector("#washer_2_").classList.toggle("vibrate2");
    document.querySelector("#washer_2_ #inner_washer").classList.toggle("spin")
    document.querySelector("#washing_machine_sfx").pause();


  }
  document.querySelector("#dryer_2_").addEventListener("click", stopDryer);

  function stopDryer() {
    document.querySelector("#dryer_2_").classList.toggle("vibrate2");
    document.querySelector("#dryer_sfx").pause();

  }

  document.querySelector("#window_1_").addEventListener("click", closeWindow);
  document.querySelector("#window_back").addEventListener("click", openWindow);

  function closeWindow() {
    document.querySelector("#window_close_sfx").play();
    document.querySelector("#window_close_sfx").currentTime = 1.5;


    setTimeout(function () {
      document.querySelector("#window_1_").classList.toggle("hide");
      document.querySelector("#wind_sfx").pause();

    }, 200);

  }

  function openWindow() {
    document.querySelector("#window_open_sfx").play();

    setTimeout(function () {
      document.querySelector("#window_1_").classList.toggle("hide");
      document.querySelector("#wind_sfx").play();

    }, 1000);
  }

  document.querySelector("#sink_2_").addEventListener("click", offSink);

  function offSink() {
    console.log("ofssifnsi")
    sinkRunning = false;
    document.querySelector("#sink_2_").removeEventListener("click", offSink);

    document.querySelector("#sink_drops_2_ #drop1_2_").classList.remove("drop");
    document.querySelector("#sink_water").style.animationPlayState = "paused";
    document.querySelector("#sink_2_").addEventListener("click", sinkWater);

    function sinkWater() {
      console.log("sinkwater")
      startSink();
      document.querySelector("#sink_2_").removeEventListener("click", sinkWater);


      document.querySelector("#sink_water").style.animationPlayState = "running";
      document.querySelector("#sink_2_").addEventListener("click", offSink);
    }
  }

  document.querySelector("#lightswitch").addEventListener("click", offLight);
  document.querySelector("#lightswitch_back").addEventListener("click", onLight);

  function offLight() {
    document.querySelector("#light").classList.toggle("hide");
    document.querySelector("#lightswitch_off_sfx").play();
    document.querySelector("#lightswitch").classList.toggle("hide");

  }

  function onLight() {
    document.querySelector("#lightswitch").classList.toggle("hide");
    document.querySelector("#light").classList.toggle("hide");
    document.querySelector("#lightswitch_off_sfx").play();


  }
  document.querySelector("#shower_head").addEventListener("click", offShower);

  function offShower() {
    if (showerRunning === false) {
      showerRunning = true;
      showerDrop();

    } else {
      showerRunning = false;

    }
  }

}

function showerDrop() {
  let ranDrop = Math.floor(Math.random() * 4) + 1;


  console.log(`#shower_drops_2_ #shower_drop${ranDrop}`);
  document.querySelector(`#shower_drops_2_ #showerdrop${ranDrop}`).classList.toggle("drop_shower");
  document.querySelector(`#shower_drops_2_ #showerdrop${ranDrop}`).addEventListener("animationend", rippleEffect);

  function rippleEffect() {
    console.log("ripple")
    document.querySelector(`#shower_drop_sfx`).play();


    document.querySelector(`#shower_drops_2_ #showerdrop${ranDrop}`).removeEventListener("animationend", rippleEffect);

    document.querySelector(`#puddle_ring${ranDrop}`).classList.remove("hide");

    document.querySelector(`#puddle_ring${ranDrop} #ripple_outer`).classList.add("ripple");
    document.querySelector(`#puddle_ring${ranDrop} #ripple_inner`).classList.add("ripple2");

    document.querySelector(`#puddle_ring${ranDrop} #ripple_outer`).addEventListener("animationend", anotherDrop);

    function anotherDrop() {
      console.log("another")
      document.querySelector(`#puddle_ring${ranDrop} #ripple_outer`).removeEventListener("animationend", anotherDrop);

      document.querySelector(`#shower_drops_2_ #showerdrop${ranDrop}`).classList.toggle("drop_shower");

      document.querySelector(`#puddle_ring${ranDrop}`).classList.add("hide");

      document.querySelector(`#puddle_ring${ranDrop} #ripple_outer`).classList.remove("ripple");
      document.querySelector(`#puddle_ring${ranDrop} #ripple_inner`).classList.remove("ripple2");

      if (showerRunning === true) {
        setTimeout(showerDrop, 50);

      }
    }

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