"use strict";

window.addEventListener("DOMContentLoaded", setupGame);

let isPlaying = false;

let svg;

// SNIF
let snif;
let snifX;
let snifY;

// TV
let tvX;
let tvY;
let walkingToTv = false;

// RADIATOR
let RadiatorX;
let RadiatorY;
let walkingToRadiator = false;

// SPEAKERS
let speakerX;
let speakerY;
let clickedSpeaker;
let walkingToSpeaker = false;

// FLOOR LAMP
let walkingToFloorLamp = false;

// IPAD
let walkingToIpad = false;

// FAN
let walkingToFan = false;

// CEILING LIGHTS
let walkingToLeftLight = false;
let walkingToRightLight = false;

let livingroomListeners = false;
let bathroomListeners = false;

// BATHROOM PATH
let bathroomPath = `path("M250.9,440.3c0,0,102.3-25.4,128.8-69.8S247.1,237.6,247.1,237.6S189,250.9,199.9,277s154.2,82.1,139.9,93.5 c-27.6,22.2-59.3,47.7-92.4,48.5c-47.8,1.2-166.1-39.8-124.3-84.3c16.7-17.7-38,26.6-38,26.6s-10.5,2,10.5,17.8 C108.6,399.2,192.8,436.7,250.9,440.3z")`;

// WASHING MACHINE
let walkingToWashing = false;

// SHOWER
let walkingToShower = false;

// WASHING MACHINE
let walkingToSink = false;

// GAME MECHANICS
let score = 0;
const timer = {
  timeCounter: 60,
  timeLeft: 600,
  totalTimeScore: "",
};

// ENERGY SOURCE PROTOTYPE
const LivingRoomEnergySource = {
  id: "",
  isTurnedOn: false,
};

// ARRAY FOR ALL ENERGY SOURCES IN LIVING ROOM
const allLivingRoomSources = [];

// CURRENT PLAYING LEVEL
let currentLevel = "livingroom";

// SETUP GAME
function setupGame() {
  document.querySelector("#start-button").addEventListener("click", startGame);
  document.querySelector("#game").style.display = "none";
}

// STATRT THE GAME
function startGame() {
  isPlaying = true;

  document.querySelector("#start-screen").style.display = "none";
  document.querySelector("#game").style.display = "flex";
  if (currentLevel === "livingroom") {
    loadLivingRoom();
  } else if (currentLevel === "bathroom") {
    showBathroom();
  }
}

// load livingroom svg
function loadLivingRoom() {
  console.log("load livingroom");
  fetch("livingroom_done.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("livingroom SVG loaded");
      document.querySelector("#living-room").innerHTML = svgData;
      document.querySelector("#living-room").classList.add("fade-in");

      // document.querySelector("#living-room").addEventListener("animationend", () => {
      //   document.querySelector("#living-room").classList.remove("fade-in");
      // });

      currentLevel = "livingroom";
      loadSnif();
    });
}

// load bathroom svg
function loadBathroom() {
  console.log("load bathroom");
  fetch("bathroom_snif.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("bathroom SVG loaded");
      document.querySelector("#bathroom").innerHTML = svgData;
      document.querySelector("#bathroom").classList.add("fade-in");

      loadSnif();
    });
}

function loadSnif() {
  fetch("snif_sprite.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("Snif loaded");
      console.log("\n");
      document.querySelector("#hidden-snif").innerHTML = svgData;

      document.querySelector("#snif_front_right").style.display = "none";
      //document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";

      if (currentLevel === "livingroom") {
        prepareLivingroom();
        randomizeLivingroom(); // randomize states of energy sources
        runLoop(); // run the game loop
      } else if (currentLevel === "bathroom") {
        prepareBathroom();
        randomizeBathroom(); // randomize states of energy sources
        if (livingroomListeners === true) {
        } else if (livingroomListeners === false) {
          runLoop(); // run the game loop
        }

        playBathRoom();
      }
    });
}

function runLoop() {
  if (isPlaying === true) {
    if (currentLevel === "livingroom") {
      if (document.querySelector("#living-room #snif").style.animationPlayState === "paused" || timer.timeLeft === 0) {
      } else {
        playLivingRoom();
      }
    } else if (currentLevel === "bathroom") {
      if (document.querySelector("#bathroom #snif").style.animationPlayState === "paused" || timer.timeLeft === 0) {
      } else {
        playBathRoom();
      }
    }

    // check time left
    if (timer.timeCounter > 0) {
      timer.timeCounter--;
      if (timer.timeCounter === 0) {
        // console.log("one second passed");
        timer.timeCounter = 60;
        if (timer.timeLeft > 0) {
          timer.timeLeft--;
          showTimeLeft();
        }
      }
    }

    if (timer.timeLeft > 0) {
      requestAnimationFrame(runLoop);
    } else {
      endGame();
    }
  }
}

// LIVING ROOM LEVEL
function prepareLivingroom() {
  // adding animation classes to objects and snif
  document.querySelector("#living-room #snif").classList.add("follow-path");
  document.querySelector("#hidden-snif #snif_front_right").classList.add("walk");
  document.querySelector("#hidden-snif #snif_back_right").classList.add("walk");
  document.querySelector("#hidden-snif #snif_front_left").classList.add("walk");
  document.querySelector("#hidden-snif #snif_back_left").classList.add("walk");

  // randomizeLivingroom(); // randomize states of energy sources
  // runLoop(); // run the game loop
}

function randomizeLivingroom() {
  // give every object an energy-source class
  document.querySelector("#floor_lamp").classList.add("energy-source");
  document.querySelector("#fan").classList.add("energy-source");
  document.querySelector("#ipad").classList.add("energy-source");
  document.querySelector("#tv").classList.add("energy-source");
  document.querySelector("#radiator_x5F_hot").classList.add("energy-source");
  // document.querySelector("#radiator_2_").classList.add("energy-source");
  document.querySelector("#left_speaker").classList.add("energy-source");
  document.querySelector("#right_speaker").classList.add("energy-source");
  document.querySelector("#lightswitch_left_2_").classList.add("energy-source");
  //document.querySelector("#lightswitch_left_1_").classList.add("energy-source");
  document.querySelector("#lightswitch_right_1_").classList.add("energy-source");
  //document.querySelector("#lightswitch_left_3_").classList.add("energy-source");

  const powerStates = [true, false];
  document.querySelectorAll(".energy-source").forEach((svgObj) => {
    const isTurnedOn = powerStates[Math.round(Math.random(powerStates.length))];
    const energyObj = Object.create(LivingRoomEnergySource);
    energyObj.id = svgObj.id;
    energyObj.isTurnedOn = isTurnedOn;
    allLivingRoomSources.push(energyObj);

    // random tv
    if (energyObj.id === "tv" && energyObj.isTurnedOn === true) {
      document.querySelector("#tv_static").classList.remove("hide");
    } else if (energyObj.id === "tv" && energyObj.isTurnedOn === false) {
      document.querySelector("#tv_static").classList.add("hide");
    }

    // random speakers
    if ((energyObj.id === "left_speaker" && energyObj.isTurnedOn === true) || (energyObj.id === "right_speaker" && energyObj.isTurnedOn === true)) {
      animateSpeaker(energyObj);
    } else if ((energyObj.id === "left_speaker" && energyObj.isTurnedOn === false) || (energyObj.id === "right_speaker" && energyObj.isTurnedOn === false)) {
      let noteId;
      if (energyObj.id === "left_speaker") {
        noteId = "1";
      } else {
        noteId = "2";
      }
      document.querySelector(`#${energyObj.id} #note1_${noteId}_`).classList.add("hide");
      document.querySelector(`#${energyObj.id} #note2_${noteId}_`).classList.add("hide");
      document.querySelector(`#${energyObj.id} #note3_${noteId}_`).classList.add("hide");
    }

    // random radiator
    if (energyObj.id === "radiator_x5F_hot" && energyObj.isTurnedOn === true) {
      document.querySelector(`#${energyObj.id}`).classList.remove("hide");
      document.querySelector(`#radiator_2_`).classList.add("hide");
    } else if (energyObj.id === "radiator_x5F_hot" && energyObj.isTurnedOn === false) {
      document.querySelector(`#${energyObj.id}`).classList.add("hide");
      document.querySelector(`#radiator_2_`).classList.remove("hide");
    }

    // random floor lamp
    if (energyObj.id === "floor_lamp" && energyObj.isTurnedOn === true) {
      document.querySelector("#floor_lamp #light_1_").classList.remove("hide");
    } else if (energyObj.id === "floor_lamp" && energyObj.isTurnedOn === false) {
      document.querySelector("#floor_lamp #light_1_").classList.add("hide");
    }

    // random ipad
    if (energyObj.id === "ipad" && energyObj.isTurnedOn === true) {
      document.querySelector("#ipad_screen").classList.remove("hide");
    } else if (energyObj.id === "ipad" && energyObj.isTurnedOn === false) {
      document.querySelector("#ipad_screen").classList.add("hide");
    }

    // random fan
    if (energyObj.id === "fan" && energyObj.isTurnedOn === true) {
      document.querySelector("#fan_blades").classList.add("spin");
    }

    // random left ceiling light
    if (energyObj.id === "lightswitch_left_2_" && energyObj.isTurnedOn === true) {
      document.querySelector("#left_ceiling_lamp_1_ #light_4_").classList.remove("hide");
      document.querySelector("#lightswitch_left_2_").classList.remove("hide");
    } else if (energyObj.id === "lightswitch_left_2_" && energyObj.isTurnedOn === false) {
      document.querySelector("#left_ceiling_lamp_1_ #light_4_").classList.add("hide");
      document.querySelector("#lightswitch_left_2_").classList.add("hide");
    }

    // random right ceiling light
    if (energyObj.id === "lightswitch_right_1_" && energyObj.isTurnedOn === true) {
      document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.remove("hide");
      document.querySelector("#lightswitch_right_1_").classList.remove("hide");
    } else if (energyObj.id === "lightswitch_right_1_" && energyObj.isTurnedOn === false) {
      document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.add("hide");
      document.querySelector("#lightswitch_right_1_").classList.add("hide");
    }
  });
  console.log(allLivingRoomSources);
}

function animateSpeaker(energyObj) {
  let noteId;
  if (energyObj.id === "left_speaker") {
    noteId = "1";
  } else {
    noteId = "2";
  }

  if (energyObj.isTurnedOn === true) {
    // remove hide from notes

    // animate notes
    document.querySelectorAll(`#${energyObj.id} #music_x5F_note_x5F_r_${noteId}`).forEach((g) => g.classList.remove("hide"));
    document.querySelector(`#${energyObj.id} #note1_${noteId}_`).classList.add("note");
    document.querySelector(`#${energyObj.id} #note1_${noteId}_`).classList.remove("hide");

    setTimeout(function () {
      document.querySelector(`#${energyObj.id} #note2_${noteId}_`).classList.add("note");
      document.querySelector(`#${energyObj.id} #note2_${noteId}_`).classList.remove("hide");
    }, 1000);

    setTimeout(function () {
      document.querySelector(`#${energyObj.id} #note3_${noteId}_`).classList.add("note");
      document.querySelector(`#${energyObj.id} #note3_${noteId}_`).classList.remove("hide");
    }, 2000);
    document.querySelector(`#${energyObj.id}_upper`).classList.add("scale2"); // add animation to speaker body
  } else {
    document.querySelectorAll(`#${energyObj.id} #music_x5F_note_x5F_r_${noteId}`).forEach((g) => g.classList.toggle("hide"));
    document.querySelector(`#${energyObj.id}_upper`).classList.remove("scale2");
  }
}

function playLivingRoom() {
  if (livingroomListeners === false) {
    document.querySelector("#living-room").classList.remove("hide");

    livingroomListeners = true;

    addGuiEvents();
    function addGuiEvents() {
      // add eventlisteners
      document.querySelector("#tv").addEventListener("click", goToTv); // add tv eventlistener
      document.querySelector("#radiator_x5F_hot").addEventListener("click", goToRadiator); // add hot radiator eventlistener
      document.querySelector("#radiator_2_").addEventListener("click", goToRadiator); // add normal radiator eventlistener
      document.querySelector("#left_speaker").addEventListener("click", goToSpeaker); // add left speaker eventlistener
      document.querySelector("#right_speaker").addEventListener("click", goToSpeaker); // add right speaker eventlistener
      document.querySelector("#floor_lamp").addEventListener("click", goToFloorLamp); // add floor lamp eventlistener
      document.querySelector("#ipad").addEventListener("click", goToIpad); // add ipad eventlistener
      document.querySelector("#fan").addEventListener("click", goToFan); // add fan eventlistener

      document.querySelector("#lightswitch_left_2_").addEventListener("click", goToLeftLight);
      document.querySelector("#lightswitch_left_1_").addEventListener("click", goToLeftLight);
      document.querySelector("#lightswitch_right_1_").addEventListener("click", goToRightLight);
      document.querySelector("#lightswitch_left_3_").addEventListener("click", goToRightLight);
    }
  }

  findSnifLocation();
  checkSnifLocation();
  checkLivingroomState();

  // CHECK SNIF LOCATION
  function checkSnifLocation() {
    if (walkingToTv === true) {
      inFrontTv();
    }

    if (walkingToRadiator === true) {
      inFrontRadiator();
    }

    if (walkingToSpeaker === true) {
      inFrontSpeaker();
    }

    if (walkingToFloorLamp === true) {
      inFrontFloorLamp();
    }

    if (walkingToIpad === true) {
      inFrontIpad();
    }

    if (walkingToFan === true) {
      inFrontFan();
    }

    if (walkingToLeftLight === true) {
      inFrontLeftLight();
    }

    if (walkingToRightLight === true) {
      inFrontRightLight();
    }
  }

  // FIND SNIF COORDINATES
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
    RadiatorX = document.querySelector("#radiator_x5F_hot").getBBox().x;
    RadiatorY = document.querySelector("#radiator_x5F_hot").getBBox().y;

    // console.log({ snifX, snifY });
  }

  // TV BELOW
  function goToTv() {
    walkingToTv = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontTv() {
    if (snifX > 315 && snifX < 335 && snifY > 300 && snifY < 312) {
      //console.log("snif x and y:", { snifX, snifY });
      //console.log("tv x and y:", { tvX, tvY });
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

      stopWalkAnimation();

      if (document.querySelector("#tv_static").classList.contains("hide")) {
        document.querySelector("#tv_static").classList.toggle("hide");
        console.log("snif tændte for tv'et");

        addPenalty();
      } else if (!document.querySelector("#tv_static").classList.contains("hide")) {
        document.querySelector("#tv_static").classList.toggle("hide");
        console.log("snif slukkede for tv'et");

        increaseScore();
      }

      const tvObj = allLivingRoomSources.find((element) => element.id === "tv");
      tvObj.isTurnedOn = !tvObj.isTurnedOn;
      console.log(tvObj);

      walkingToTv = false;
    }
  }

  // RADIATOR BELOW
  function goToRadiator() {
    walkingToRadiator = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontRadiator() {
    if (snifX > 170 && snifX < 190 && snifY > 250 && snifY < 270) {
      //console.log("snif x and y:", { snifX, snifY }, "radiator x and y:", { RadiatorX, RadiatorY });
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

      stopWalkAnimation();

      document.querySelector("#radiator_x5F_hot").classList.toggle("hide");
      if (document.querySelector("#radiator_x5F_hot").classList.contains("hide")) {
        document.querySelector(`#radiator_2_`).classList.toggle("hide");
        console.log(`snif skruede ned for radiatoren`);
        increaseScore();
      } else {
        document.querySelector(`#radiator_2_`).classList.toggle("hide");
        console.log(`snif tændte for radiatoren`);
        addPenalty();
      }

      const radiatorObj = allLivingRoomSources.find((element) => element.id === "radiator_x5F_hot");
      radiatorObj.isTurnedOn = !radiatorObj.isTurnedOn;
      console.log(radiatorObj);

      walkingToRadiator = false;
    }
  }

  // SPEAKERS BELOW
  function goToSpeaker() {
    if (this !== undefined) {
      const speaker = allLivingRoomSources.find((element) => element.id === this.id);
      // console.log(speaker);

      walkingToSpeaker = true;
      document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
      document.querySelector("#snif").style.animationPlayState = "running"; //run path animation

      if (speaker.id === "left_speaker") {
        speakerX = 224;
        speakerY = 252;
        clickedSpeaker = speaker;
      } else {
        speakerX = 416;
        speakerY = 357;
        clickedSpeaker = speaker;
      }
    }
  }

  function inFrontSpeaker() {
    if (speakerX === 224 && speakerY === 252) {
      if (snifX > 210 && snifX < 235 && snifY > 240 && snifY < 260) {
        document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation
        stopWalkAnimation();
        toggleSpeaker();
        walkingToSpeaker = false;
      }
    } else if (speakerX === 416 && speakerY === 357) {
      if (snifX > 405 && snifX < 425 && snifY > 350 && snifY < 365) {
        document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

        //pause all walk animations on all snif-sprites
        document.querySelectorAll("#hidden-snif .walk").forEach((sprite) => {
          sprite.addEventListener("animationiteration", toggleWalk);
          function toggleWalk() {
            sprite.classList.remove("walk");
            sprite.classList.add("walk");
            sprite.style.animationPlayState = "paused";
          }
          setTimeout(function () {
            sprite.removeEventListener("animationiteration", toggleWalk);
          }, 500);
        });
        toggleSpeaker();
        walkingToSpeaker = false;
      }
    }
  }

  function toggleSpeaker() {
    if (clickedSpeaker.isTurnedOn === true) {
      increaseScore();
      console.log(`snif slukkede for ${clickedSpeaker.id}`);
    } else {
      console.log(`snif tændte for ${clickedSpeaker.id}`);
      addPenalty();
    }

    clickedSpeaker.isTurnedOn = !clickedSpeaker.isTurnedOn;
    console.log(clickedSpeaker);
    animateSpeaker(clickedSpeaker);
  }

  // FLOOR LAMP BELOW
  function goToFloorLamp() {
    walkingToFloorLamp = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontFloorLamp() {
    if (snifX > 265 && snifX < 280 && snifY > 430 && snifY < 445) {
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation
      stopWalkAnimation();

      if (document.querySelector("#floor_lamp #light_1_").classList.contains("hide")) {
        document.querySelector("#floor_lamp #light_1_").classList.toggle("hide");
        console.log(`snif tændte for gulvlampen`);

        addPenalty();
      } else if (!document.querySelector("#floor_lamp #light_1_").classList.contains("hide")) {
        document.querySelector("#floor_lamp #light_1_").classList.toggle("hide");
        console.log(`snif slukkede for gulvlampen`);

        increaseScore();
      }

      const floorLampObj = allLivingRoomSources.find((element) => element.id === "floor_lamp");
      floorLampObj.isTurnedOn = !floorLampObj.isTurnedOn;
      console.log(floorLampObj);

      walkingToFloorLamp = false;
    }
  }

  // IPAD BELOW
  function goToIpad() {
    walkingToIpad = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontIpad() {
    if (snifX > 215 && snifX < 235 && snifY > 330 && snifY < 360) {
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

      stopWalkAnimation();

      if (document.querySelector("#ipad_screen").classList.contains("hide")) {
        document.querySelector("#ipad_screen").classList.toggle("hide");
        console.log(`snif tændte for iPad'en`);

        addPenalty();
      } else if (!document.querySelector("#ipad_screen").classList.contains("hide")) {
        document.querySelector("#ipad_screen").classList.toggle("hide");
        console.log(`snif slukkede for iPad'en`);

        increaseScore();
      }

      const ipadObj = allLivingRoomSources.find((element) => element.id === "ipad");
      ipadObj.isTurnedOn = !ipadObj.isTurnedOn;
      console.log(ipadObj);

      walkingToIpad = false;
    }
  }

  // FAN BELOW
  function goToFan() {
    walkingToFan = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontFan() {
    if (snifX > 240 && snifX < 255 && snifY > 375 && snifY < 385) {
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

      stopWalkAnimation();

      if (document.querySelector("#fan_blades").classList.contains("spin")) {
        document.querySelector("#fan_blades").classList.remove("spin");
        console.log(`snif slukkede for blæseren`);

        increaseScore();
      } else if (!document.querySelector("#fan_blades").classList.contains("hide")) {
        document.querySelector("#fan_blades").classList.add("spin");
        console.log(`snif tændte for blæseren`);

        addPenalty();
      }

      const fanObj = allLivingRoomSources.find((element) => element.id === "fan");
      fanObj.isTurnedOn = !fanObj.isTurnedOn;
      console.log(fanObj);

      walkingToFan = false;
    }
  }

  // LEFT CEILING LIGHT
  function goToLeftLight() {
    walkingToLeftLight = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontLeftLight() {
    if (snifX > 95 && snifX < 105 && snifY > 335 && snifY < 350) {
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation
      stopWalkAnimation();

      if (document.querySelector("#lightswitch_left_2_").classList.contains("hide")) {
        document.querySelector("#left_ceiling_lamp_1_ #light_4_").classList.toggle("hide");
        document.querySelector("#lightswitch_left_2_").classList.toggle("hide");
        console.log(`snif tændte for venstre loftslampe`);

        addPenalty();
      } else if (!document.querySelector("#lightswitch_left_2_").classList.contains("hide")) {
        document.querySelector("#left_ceiling_lamp_1_ #light_4_").classList.toggle("hide");
        document.querySelector("#lightswitch_left_2_").classList.toggle("hide");
        console.log(`snif slukkede for venstre loftslampe`);

        increaseScore();
      }

      const leftLightObj = allLivingRoomSources.find((element) => element.id === "lightswitch_left_2_");
      leftLightObj.isTurnedOn = !leftLightObj.isTurnedOn;
      console.log(leftLightObj);

      walkingToLeftLight = false;
    }
  }

  // RIGHT CEILING LIGHT
  function goToRightLight() {
    walkingToRightLight = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontRightLight() {
    if (snifX > 210 && snifX < 235 && snifY > 240 && snifY < 260) {
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation
      stopWalkAnimation();

      if (document.querySelector("#lightswitch_right_1_").classList.contains("hide")) {
        document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.toggle("hide");
        document.querySelector("#lightswitch_right_1_").classList.toggle("hide");
        console.log(`snif tændte for højre loftslampe`);

        addPenalty();
      } else if (!document.querySelector("#lightswitch_right_1_").classList.contains("hide")) {
        document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.toggle("hide");
        document.querySelector("#lightswitch_right_1_").classList.toggle("hide");
        console.log(`snif slukkede for højre loftslampe`);

        increaseScore();
      }

      const rightLightObj = allLivingRoomSources.find((element) => element.id === "lightswitch_right_1_");
      rightLightObj.isTurnedOn = !rightLightObj.isTurnedOn;
      console.log(rightLightObj);

      walkingToRightLight = false;
    }
  }

  // STOP SNIF WALK ANIMATION
  function stopWalkAnimation() {
    //pause all walk animations on all snif-sprites
    document.querySelectorAll("#hidden-snif .walk").forEach((sprite) => {
      sprite.addEventListener("animationiteration", toggleWalk);
      function toggleWalk() {
        sprite.classList.remove("walk");
        sprite.classList.add("walk");
        sprite.style.animationPlayState = "paused";
      }
      setTimeout(function () {
        sprite.removeEventListener("animationiteration", toggleWalk);
      }, 500);
    });
  }

  // CHOOSE CORRECT SNIF SPRITE FOR WALKING DIRECTION
  function chooseSnifDirection(positionOnPath) {
    // console.log(positionOnPath);
    let snifDirection;

    if (positionOnPath < 310 && positionOnPath > 200) {
      snifDirection = "back right";
      showSnifDirection(snifDirection);
    } else if ((positionOnPath < 210 && positionOnPath > 110) || positionOnPath > 650) {
      snifDirection = "front right";
      showSnifDirection(snifDirection);
    } else if (positionOnPath < 100 || positionOnPath > 482) {
      snifDirection = "front left";
      showSnifDirection(snifDirection);
    } else if (positionOnPath < 50) {
      snifDirection = "back left";
      showSnifDirection(snifDirection);
    }
  }

  // SHOW CORRECT SNIF SPRITE FOR WALKING DIRECTION
  function showSnifDirection(snifDirection) {
    if (snifDirection === "back right") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_back_right").style.display = "inline";
    } else if (snifDirection === "front right") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";

      // show correct direction
      document.querySelector("#snif_front_right").style.display = "inline";
    } else if (snifDirection === "back left") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_back_left").style.display = "inline";
    } else if (snifDirection === "front left") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_front_left").style.display = "inline";
    }
  }

  // ADD TIME PENALTY FOR WRONGLY CLICKED OBJECT
  function addPenalty() {
    timer.timeLeft = timer.timeLeft + 5; // add penalty score
  }

  // CHECK IF ALL ENERGY SOURCES ARE TURNED OFF
  function checkLivingroomState() {
    if (allLivingRoomSources.every((obj) => obj.isTurnedOn === false)) {
      console.log("room complete!");
      hideLivingRoom();
    }
  }

  function hideLivingRoom() {
    setTimeout(function () {
      document.querySelector("#living-room").style.animationDirection = "reverse";
      document.querySelector("#living-room").classList.remove("fade-in");
      void document.querySelector("#living-room").offsetHeight;
      document.querySelector("#living-room").classList.add("fade-in");
      document.querySelector("#living-room").addEventListener("animationend", hideRoom);

      function hideRoom() {
        document.querySelector("#living-room").classList.add("hide");
        document.querySelector("#living-room").removeEventListener("animationend", hideRoom);
      }

      setTimeout(showBathroom, 1500);
    }, 1000);
  }
}

// BATHROOM LEVEL
function showBathroom() {
  currentLevel = "bathroom";
  if (currentLevel === "livingroom") {
    setTimeout(loadBathroom, 1000);
  } else if (currentLevel === "bathroom") {
    loadBathroom();
  }
}

function prepareBathroom() {
  // make snif follow the path
  document.querySelector("#bathroom #snif").classList.add("follow-path");
  document.querySelector("#bathroom #snif").style.offsetPath = bathroomPath;
  document.querySelector("#hidden-snif #snif_front_right").classList.add("walk");
  document.querySelector("#hidden-snif #snif_back_right").classList.add("walk");
  document.querySelector("#hidden-snif #snif_front_left").classList.add("walk");
  document.querySelector("#hidden-snif #snif_back_left").classList.add("walk");
}

function randomizeBathroom() {
  // idk fammmm
}

function playBathRoom() {
  if (bathroomListeners === false) {
    document.querySelector("#bathroom #snif").style.animationPlayState = "paused";
    document.querySelector("#bathroom").style.display = "block";
    document.querySelector("#bathroom").classList.remove("hide");

    bathroomListeners = true;

    addGuiEvents();
    function addGuiEvents() {
      // add eventlisteners
      document.querySelector("#washer_2_").addEventListener("click", goToWashing);
      document.querySelector("#shower").addEventListener("click", goToShower);
      document.querySelector("#sink_2_").addEventListener("click", goToSink);
    }

    setTimeout(function () {
      //endGame();
      console.log("idk");
    }, 7500);
  }

  findSnifLocation();
  checkSnifLocation();

  function checkSnifLocation() {
    // sink, washing machine, shower
    if (walkingToSink === true) {
      inFrontSink();
    }

    if (walkingToWashing === true) {
      inFrontWashing();
    }

    if (walkingToShower === true) {
      inFrontShower();
    }
  }

  // FIND SNIF COORDINATES
  function findSnifLocation() {
    svg = document.querySelector("#bathroom svg");

    calcSnifCoordinates();
    function calcSnifCoordinates() {
      //snif vector coordinates
      snif = document.querySelector("#bathroom #snif");
      const percent = snif.computedStyleMap().get("offset-distance").value;

      // find coordinates from the path
      const path = document.querySelector("#bathroom #path");
      const length = path.getTotalLength();
      const positionOnPath = (length * percent) / 100;
      const point = path.getPointAtLength(positionOnPath);
      snifX = Math.floor(point.x);
      snifY = Math.floor(point.y);

      chooseSnifDirection(positionOnPath);
    }

    // console.log({ snifX, snifY });
  }

  // WASHING MACHINE
  function goToWashing() {
    walkingToWashing = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#bathroom #snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontWashing() {
    if (snifX > 370 && snifX < 380 && snifY > 370 && snifY < 380) {
      document.querySelector("#bathroom #snif").style.animationPlayState = "paused"; //pause path animation
      stopWalkAnimation();
      walkingToWashing = false;
    }
  }

  // WASHING MACHINE
  function goToShower() {
    walkingToShower = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#bathroom #snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontShower() {
    if (snifX > 205 && snifX < 225 && snifY > 240 && snifY < 255) {
      document.querySelector("#bathroom #snif").style.animationPlayState = "paused"; //pause path animation
      stopWalkAnimation();
      walkingToShower = false;
    }
  }

  // WASHING MACHINE
  function goToSink() {
    walkingToSink = true;
    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#bathroom #snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontSink() {
    if (snifX > 115 && snifX < 125 && snifY > 325 && snifY < 340) {
      document.querySelector("#bathroom #snif").style.animationPlayState = "paused"; //pause path animation
      stopWalkAnimation();
      walkingToSink = false;
    }
  }

  // STOP SNIF WALK ANIMATION
  function stopWalkAnimation() {
    //pause all walk animations on all snif-sprites
    document.querySelectorAll("#hidden-snif .walk").forEach((sprite) => {
      sprite.addEventListener("animationiteration", toggleWalk);
      function toggleWalk() {
        sprite.classList.remove("walk");
        sprite.classList.add("walk");
        sprite.style.animationPlayState = "paused";
      }
      setTimeout(function () {
        sprite.removeEventListener("animationiteration", toggleWalk);
      }, 500);
    });
  }

  // CHOOSE CORRECT SNIF SPRITE FOR WALKING DIRECTION
  function chooseSnifDirection(positionOnPath) {
    // console.log(positionOnPath);
    let snifDirection;

    if ((positionOnPath > 0 && positionOnPath < 141) || positionOnPath > 869) {
      snifDirection = "front right";
      showSnifDirection(snifDirection);
    } else if (positionOnPath > 141 || positionOnPath < 880) {
      snifDirection = "front left";
      showSnifDirection(snifDirection);
    } else if (positionOnPath < 50) {
      snifDirection = "back left";
      showSnifDirection(snifDirection);
    }
  }

  // SHOW CORRECT SNIF SPRITE FOR WALKING DIRECTION
  function showSnifDirection(snifDirection) {
    if (snifDirection === "back right") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_back_right").style.display = "inline";
    } else if (snifDirection === "front right") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";

      // show correct direction
      document.querySelector("#snif_front_right").style.display = "inline";
    } else if (snifDirection === "back left") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_front_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_back_left").style.display = "inline";
    } else if (snifDirection === "front left") {
      //console.log(snifDirection)
      document.querySelector("#snif_back_right").style.display = "none";
      document.querySelector("#snif_back_left").style.display = "none";
      document.querySelector("#snif_front_right").style.display = "none";

      // show correct direction
      document.querySelector("#snif_front_left").style.display = "inline";
    }
  }
}

//
//
//
//
//
// GAME MECHANICS
function increaseScore() {
  score++;
  document.querySelector(".score").textContent = `score: ${score}`;
}

function showTimeLeft() {
  document.querySelector(".time").textContent = `time left: ${timer.timeLeft}`;
}

function endGame() {
  if (isPlaying === true) {
    isPlaying = false;
    console.log("game finished");

    document.querySelector("#game").style.animationDirection = "reverse";
    document.querySelector("#game").classList.remove("fade-in");
    void document.querySelector("#game").offsetHeight;
    document.querySelector("#game").classList.add("fade-in");
    document.querySelector("#game").addEventListener("animationend", hideGameSection);

    function hideGameSection() {
      document.querySelector("#game").removeEventListener("animationend", hideGameSection);
      document.querySelector("#game").style.display = "none";
      document.querySelector("#end-screen").style.display = "flex";
    }

    timer.totalTimeScore = -timer.timeLeft + 60;
    const timeScore = document.querySelector("#end-screen .time-score");
    timeScore.textContent = `you finished the game in: ${timer.totalTimeScore} seconds!`;
    console.log(`You finished the game in ${timer.totalTimeScore} seconds!`);
  }

  document.querySelector("#play-again").addEventListener("click", resetGame);
}

function resetGame() {
  document.querySelector;
  document.querySelector("#end-screen").style.display = "none";
  document.querySelector("#game").style.display = "flex";
  document.querySelector("#game").style.animationDirection = "normal";
  document.querySelector("#game").style.display = "flex";
  document.querySelector("#living-room").style.animationDirection = "normal";
  document.querySelector("#living-room").classList.remove("fade-in");
  document.querySelector("#living-room").classList.remove("hide");
  document.querySelector("#bathroom").classList.remove("fade-in");
  document.querySelector("#bathroom").style.display = "none";

  // RESET CORE MECHANICS
  isPlaying = true;
  timer.timeCounter = 60;
  timer.timeLeft = 60;
  timer.totalTimeScore = "";
  currentLevel = "livingroom";

  // RESET LIVINGROOM
  walkingToTv = false;
  walkingToRadiator = false;
  clickedSpeaker = "";
  walkingToSpeaker = false;
  walkingToFloorLamp = false;
  walkingToIpad = false;
  walkingToFan = false;
  walkingToLeftLight = false;
  walkingToRightLight = false;
  livingroomListeners = false;

  allLivingRoomSources.splice(0, 9);

  // RESET BATHROOM
  bathroomListeners = false;
  walkingToWashing = false;
  walkingToShower = false;
  walkingToSink = false;

  document.querySelector(".time").textContent = `time left: 60`;

  startGame();
}
