song1 = "";
song2 = "";
left_wrist_y = 0;
rigth_wrist_y = 0;
left_wrist_x = 0;
rigth_wrist_x = 0;
left_wrist_confidence = 0;
right_wrist_confidence = 0;
song_status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    posenetmodel = ml5.poseNet(webcam, modelloaded);
    posenetmodel.on("pose", giveposes);

}

function modelloaded() {
    console.log("Posenet Model Is Loaded");
}

function draw() {
    image(webcam, 0, 0, 600, 450);
    song_status = song1.isPlaying();
    stroke("black");
    fill("blue");
    if (left_wrist_confidence > 0.2) {
        circle(left_wrist_x, left_wrist_y, 25);
        song2.stop();
        if (song_status == false) {
            song1.play();
            document.getElementById("songnamelabel").innerHTML = "Song 1 is playing";
        }
    }

    song_status = song2.isPlaying();
    stroke("black");
    fill("blue");
    if (right_wrist_confidence > 0.2) {
        circle(right_wrist_x, right_wrist_y, 25);
        song1.stop();
        if (song_status == false) {
            song2.play();
            document.getElementById("songnamelabel").innerHTML = "Song 2 is playing";
        }
    }
}

function giveposes(resultsarray) {
    if (resultsarray.length > 0) {
        console.log(resultsarray);
        left_wrist_x = resultsarray[0].pose.leftWrist.x;
        right_wrist_x = resultsarray[0].pose.rightWrist.x;
        left_wrist_y = resultsarray[0].pose.leftWrist.y;
        right_wrist_y = resultsarray[0].pose.rightWrist.y;
        left_wrist_confidence = resultsarray[0].pose.keypoints[9].score;
        right_wrist_confidence = resultsarray[0].pose.keypoints[10].score;
    }
}