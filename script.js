window.addEventListener("DOMContentLoaded", loadSVG);

function loadSVG() {
  console.log("load the SVG");
  fetch("livingroom.svg")
    .then((response) => response.text())
    .then((svgData) => {
      console.log("SVG loaded");
      document.querySelector("#living-room").innerHTML = svgData;
      document.querySelector("#living-room svg").setAttribute("viewBox", `100 100 200 103.75`);

      addAnimationClasses();
    });
}
function addAnimationClasses() {
  document.querySelector("svg #snif").classList.add("walk");
}
