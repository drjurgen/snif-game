"use strict";

window.addEventListener("DOMContentLoaded", loadSVG);

let svg;
let snif;
let snifX;
let snifY;

let tvX;
let tvY;
let walkingToTv = false;

let RadiatorX;
let RadiatorY;
let walkingToWindow = false;

let objectClicked = 0;
let livingroomListeners = false;

let score = 0;
const timer = {
  timeCounter: 60,
  timeLeft: 60,
};

function loadSVG() {
  console.log("load the SVG");
  fetch("livingroom_done.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("SVG loaded");
      document.querySelector("#living-room").innerHTML = svgData;
      document.querySelector("#living-room").classList.add("fade-in");

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
      prepareLivingroom();
    });
}

function prepareLivingroom() {
  // adding animation classes to objects and snif
  document.querySelector("#living-room #snif").classList.add("follow-path");
  document.querySelector("#hidden-snif #snif_front_right").classList.add("walk");
  document.querySelector("#hidden-snif #snif_back_right").classList.add("walk");
  document.querySelector("#hidden-snif #snif_front_left").classList.add("walk");
  document.querySelector("#hidden-snif #snif_back_left").classList.add("walk");

  addGuiEvents(); // add eventlisteners to liviingroom objects
  animateSpeaker(); // start livingroom speaker animation

  runLoop(); // run the game loop
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
  document.querySelector("#lightswitch_left_1_").addEventListener("click", offCeilingLeft);
  document.querySelector("#lightswitch_right_1_").addEventListener("click", offCeilingRight);
  document.querySelector("#lightswitch_left_3_").addEventListener("click", offCeilingRight);

  function offCeilingLeft() {
    console.log("yo");
    document.querySelector("#left_ceiling_lamp_1_ #light_4_").classList.toggle("hide");
    document.querySelector("#lightswitch_left_2_").classList.toggle("hide");
  }

  function offCeilingRight() {
    console.log("yo2");

    document.querySelector("#right_ceiling_lamp_1_ #light_5_").classList.toggle("hide");
    document.querySelector("#lightswitch_right_1_").classList.toggle("hide");
  }

  //speaker listeners
  document.querySelector("#left_speaker").addEventListener("click", stopLeftSpeaker);
  document.querySelector("#right_speaker").addEventListener("click", stopRightSpeaker);

  function stopLeftSpeaker() {
    document.querySelectorAll("#left_speaker #music_x5F_note_x5F_r").forEach((g) => g.classList.toggle("hide"));
    document.querySelector("#left_speaker_inner1").classList.toggle("speaker");
    document.querySelector("#left_speaker_inner2").classList.toggle("speaker");
    document.querySelector("#left_speaker_inner3").classList.toggle("speaker");
    document.querySelector("#left_speaker_upper").classList.toggle("scale2");
  }

  function stopRightSpeaker() {
    document.querySelectorAll("#right_speaker #music_x5F_note_x5F_r_1_").forEach((g) => g.classList.toggle("hide"));
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
    document.querySelector("#radiator_2_").classList.toggle("hide");
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
  if (document.querySelector("#snif").style.animationPlayState === "paused" || timer.timeLeft === 0) {
  } else {
    playLivingRoom();
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

function playLivingRoom() {
  if (livingroomListeners === false) {
    livingroomListeners = true;

    // add eventlisteners to tv and radiator
    document.querySelector("#tv").addEventListener("click", tvClick);
    document.querySelector("#radiator_x5F_hot").addEventListener("click", radiatorClick);
  }

  const checkpoints = [
    { x: 231, y: 355 },
    { x: 274, y: 438 },
    { x: 416, y: 357 },
    { x: 325, y: 306 },
    { x: 224, y: 252 },
    { x: 140, y: 292 },
    { x: 101, y: 323 },
  ];

  findSnifLocation();

  function tvClick() {
    objectClicked++;
    if (objectClicked === 1) {
      console.log({ objectClicked });
      setTimeout(function () {
        objectClicked = 0;
        goToTv();
      }, 100);
    }
  }

  function radiatorClick() {
    objectClicked++;
    if (objectClicked === 1) {
      console.log({ objectClicked });
      setTimeout(function () {
        objectClicked = 0;
        goToRadiator();
      }, 100);
    }
  }

  if (walkingToTv === true) {
    inFrontTv();
  }

  if (walkingToWindow === true) {
    inFrontRadiator();
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
    RadiatorX = document.querySelector("#radiator_x5F_hot").getBBox().x;
    RadiatorY = document.querySelector("#radiator_x5F_hot").getBBox().y;

    // console.log({ snifX, snifY });
  }

  function goToTv() {
    walkingToTv = true;
    walkingToWindow = false;
    const tvCheckpoint = { x: 325, y: 306 };

    if (tvX - snifX > 100) {
      console.log("direction should be clockwice");
      // const path = getPath(tvCheckpoint, true);
      // console.log(path);
      // document.querySelector("#snif").style.offsetPath = `path("M${path}")`;
      // document.querySelector("#path").setAttribute("d", `M${path}`);
    } else if (tvX - snifX < 100) {
      console.log("direction should be counter clockwice");
      // const path = getPath(tvCheckpoint, false);
      // console.log(path);
      // document.querySelector("#snif").style.offsetPath = `path("M${path}")`;
      // document.querySelector("#path").setAttribute("d", `M${path}`);
    }

    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontTv() {
    if (snifX > 315 && snifX < 335 && snifY > 300 && snifY < 312) {
      //console.log("snif x and y:", { snifX, snifY });
      //console.log("tv x and y:", { tvX, tvY });
      console.log("snif kan nu slukke tv");
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

      //pause all walk animations on all snif-sprites
      document.querySelectorAll("#hidden-snif .walk").forEach((sprite) => {
        sprite.addEventListener("animationiteration", toggleWalk);
        function toggleWalk() {
          sprite.classList.remove("walk");
          sprite.offsetHeight;
          sprite.classList.add("walk");
          sprite.style.animationPlayState = "paused";
          console.log("pause walk animation");
        }
        setTimeout(function () {
          sprite.removeEventListener("animationiteration", toggleWalk);
        }, 500);
      });

      increaseScore();
      walkingToTv = false;
    }
  }

  function goToRadiator() {
    walkingToWindow = true;
    walkingToTv = false;
    const radiatorCheckpoint = { x: 140, y: 292 };

    if (RadiatorX - snifX > -300) {
      console.log("direction should be clockwice");
      // const path = getPath(radiatorCheckpoint, true);
      // console.log(path);
      // document.querySelector("#snif").style.offsetPath = `path("M${path}")`;
      // document.querySelector("#path").setAttribute("d", `M${path}`);
    } else if (RadiatorX - snifX < -300) {
      console.log(RadiatorX - snifX);
      // console.log("direction should be counter clockwice");
      // const path = getPath(radiatorCheckpoint, false);
      // console.log(path);
      // document.querySelector("#snif").style.offsetPath = `path("M${path}")`;
      // document.querySelector("#path").setAttribute("d", `M${path}`);
    }

    document.querySelectorAll(".walk").forEach((sprite) => (sprite.style.animationPlayState = "running")); //start all walk animations on all snif-sprites
    document.querySelector("#snif").style.animationPlayState = "running"; //run path animation
  }

  function inFrontRadiator() {
    if (snifX > 120 && snifX < 160 && snifY > 280 && snifY < 310) {
      console.log("snif x and y:", { snifX, snifY }, "radiator x and y:", { RadiatorX, RadiatorY });
      console.log("snif kan nu skrue ned for radiatoren");
      document.querySelector("#snif").style.animationPlayState = "paused"; //pause path animation

      //pause all walk animations on all snif-sprites
      document.querySelectorAll("#hidden-snif .walk").forEach((sprite) => {
        sprite.addEventListener("animationiteration", toggleWalk);
        function toggleWalk() {
          sprite.classList.remove("walk");
          sprite.classList.add("walk");
          sprite.style.animationPlayState = "paused";
          console.log("pause walk animation");
        }
        setTimeout(function () {
          sprite.removeEventListener("animationiteration", toggleWalk);
        }, 500);
      });

      increaseScore();
      walkingToWindow = false;
    }
  }

  function chooseSnifDirection(positionOnPath) {
    //console.log(positionOnPath);
    let snifDirection;

    if (positionOnPath < 310 && positionOnPath > 200) {
      snifDirection = "back right";
      showSnifDirection(snifDirection);
    } else if (positionOnPath < 210 && positionOnPath > 110) {
      snifDirection = "front right";
      showSnifDirection(snifDirection);
    } else if (positionOnPath < 100) {
      snifDirection = "front left";
      showSnifDirection(snifDirection);
    } else if (positionOnPath < 50) {
      snifDirection = "back left";
      showSnifDirection(snifDirection);
    }
  }

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

  function getPath(checkpointTo, isClockwice) {
    let checkpointReached = false;
    let i = checkpoints.findIndex((cp) => cp.x == snifX && cp.y == snifY);
    let path = `${snifX},${snifY}`;

    while (!checkpointReached) {
      if (isClockwice) {
        i--;
        if (i < 0) {
          i = checkpoints.length - 1;
        }
      } else {
        i++;
        if (i >= checkpoints.length) {
          i = 0;
        }
      }

      const cpX = checkpoints[i].x;
      const cpY = checkpoints[i].y;
      path += ` ${cpX},${cpY}`;
      // console.log({ cpX, cpY });
      if (checkpointTo.x == cpX && checkpointTo.y == cpY) {
        checkpointReached = true;
      }
    }
    return path;
  }
}

function increaseScore() {
  score++;
  document.querySelector(".score").textContent = `score: ${score}`;
}

function showTimeLeft() {
  document.querySelector(".time").textContent = `time left: ${timer.timeLeft}`;
}

function endGame() {
  console.log("game finished");
  document.querySelector("#living-room").style.animationDirection = "reverse";
  document.querySelector("#living-room").classList.remove("fade-in");
  void document.querySelector("#living-room").offsetHeight;
  document.querySelector("#living-room").classList.add("fade-in");
}
