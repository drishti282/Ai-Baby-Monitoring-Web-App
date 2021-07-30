i = "";
status = "";
objects = [];
song = "";

function setup() {
  c = createCanvas(500, 380);
  c.position(390, 145);
  v = createCapture(VIDEO);
  v.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function preload() {}

function modelLoaded() {
  console.log("modelLoaded!");
  status = true;
  document.getElementById("status").innerHTML = "Status : Finding Baby ...";
  song = loadSound("ambulance_alert.mp3");
}

function draw() {
  image(v, 0, 0, 500, 380);

  if (status != "") {
    objectDetector.detect(v, gotResult);
    song.play();

    for (f = 0; f < objects.length; f++) {

      document.getElementById("no").innerHTML =
        "Number of objects detected are : " + objects.length;
      document.getElementById("status").innerHTML = "Status : Baby Found";
      fill("#FF0000");
      percent = floor(objects[f].confidence * 100);
      text(objects[f].label + " " + percent + "%", objects[f].x, objects[f].y);
      noFill();
      stroke("#FF0000");
      rect(
        objects[f].x,
        objects[f].y,
        objects[f].width - 200,
        objects[f].height - 100
      );
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}
