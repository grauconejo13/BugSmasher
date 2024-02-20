//Vanessa Victorino - 301201653
//Circa JAN2022

"use strict";

// Create the canvas
var canvas = document.getElementById("canvas");
canvas.width = 981;
canvas.height = 552;
canvas.style.cursor = "pointer";

var catx2d = canvas.getContext("2d");
var canLeft = canvas.offsetLeft;
var canTop = canvas.offsetTop;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "wall2-2.jpg";


// bug objects
var bugReady = false;
var bugImage = new Image();
var bug = {};
var score = 0;
bugImage.onload = function() {
    bugReady = true;
};
bugImage.src = "scarab1.png";

// Speed / time variables 
var speed = 2000;
var newSpeed = speed;
var speedFactor = 1.2;

// Changes in the game when the user clicks on the bug
var reset = function() {
    // Places the bug randomly on the canvas
    bug.x = 60 + (Math.random() * (canvas.width - 120));
    bug.y = 60 + (Math.random() * (canvas.height - 120));
};

// Reset the game score when the user clicks reset score button
function resetScore() {
    newSpeed = speed;
    score = 0;
    reset();
    then = Date.now();
}

// Reset speed of bug object 
function resetSpeed() {
    newSpeed = speed;
    then = Date.now();
}

// Event listeners 
function pickBug(e) {
    var x = e.pageX - canLeft;
    var y = e.pageY - canTop;

    if (y > bug.y && y < bug.y + 551 && x > bug.x && x < 980) {
        score++;
        reset();
        newSpeed = newSpeed / speedFactor;
        then = Date.now();
    }
}

// Draw everything
var render = function() {
    if (bgReady) {
        catx2d.drawImage(bgImage, 0, 0);
    }

    if (bugReady) {
        catx2d.drawImage(bugImage, bug.x, bug.y);
    }

    // Score indicator in the canvas
    catx2d.fillStyle = "rgb(232, 100, 12)";
    catx2d.font = "28px arial";
    catx2d.textAlign = "left";
    catx2d.textBaseline = "top";
    catx2d.fillText("Score: " + score, 20, 20);
};


// The main game loop
var main = function() {
    var now = Date.now();
    var difNum = now - then;

    if (difNum > newSpeed) {
        reset();
    }
    render();

    if (difNum > newSpeed) {
        then = Date.now();
    }

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var d = window;
requestAnimationFrame = d.requestAnimationFrame || d.webkitRequestAnimationFrame || d.msRequestAnimationFrame || d.mozRequestAnimationFrame;

function createEventListeners() {
    addEventListener("mousedown", pickBug, false);
    document.getElementById("resetScore").addEventListener("click", resetScore, false);
    document.getElementById("resetSpeed").addEventListener("click", resetSpeed, false);
}

// Start game
var then = Date.now();
reset();
main();

//19FEB2024_issue - bug multiplying ~ need to be fix.
/*function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const container = canvas.parentElement; // Assuming the canvas is directly inside the container div

    // Set the maximum canvas size
    const maxWidth = container.offsetWidth;
    const maxHeight = window.innerHeight * 0.8; // Example: 80% of the viewport height

    // Calculate aspect ratio, for example, 16:9
    const aspectRatio = 16 / 9;

    // Adjust width and height based on the aspect ratio
    let newWidth = maxWidth;
    let newHeight = newWidth / aspectRatio;

    // If the new height exceeds maxHeight, adjust based on height instead
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
    }

    canvas.width = newWidth;
    canvas.style.width = `${newWidth}px`; // For CSS size
    canvas.height = newHeight;
    canvas.style.height = `${newHeight}px`; // For CSS size
}

// Listen for window resize events
window.addEventListener('resize', resizeCanvas);

// Initialize canvas size on load
window.addEventListener('load', resizeCanvas);*/

window.addEventListener("load", createEventListeners, false);