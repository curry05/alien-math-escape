// Alien Math Escape Game
// The user will move their circle until they know the answer and will go to the right when they know the answer ; WHILE ALL THIS THEY HAVE TO ESCAPE FROM THE GREEN ALIEN 
// AS IT WILL BE FOLLOWING THEM. THERE ARE FIVE ROUNDS AND NO RETRY. 

var screen = "start"; // for the start
var score = 0; // initial score 
var level = 1; // initial level 
var userAnswer = ""; // EMPTY 
var question = ""; // EMPTY 
var correctAnswer = 0; // initially 

var player = { // Initial 
    x: 50, // x position
    y: 300, // y position 
    size: 30 
};

var alien = { // Initial 
    x: 350, // x position
    y: 300, // y position 
    size: 30,
    speed: 1.0 // how fast it catches up with the user 
};

function setup() { // how the screen would look 
    createFirstCanvas(600, 400);
    Question();
}

function draw() {
    background(30, 30, 80);

    if (screen === "start") { // when the user starts 
        drawStart();
    } else if (screen === "game") { // while the user is playing 
        drawGame();
    } else if (screen === "win") { // when the user wins 
        drawWin();
    } else if (screen === "gameOver") { // when the user loses 
        drawGameOver();
    }
}

function drawStart() {
    background(30,30,30);
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("👾 Alien Math Escape 👾", width/2, 100);

    textSize(14);
    text("Solve the math question, type the answer,", width/2, 150);
    text("and move RIGHT when you know the answer!", width/2, 170);
    text("Avoid the red alien chasing you!", width/2, 190);
    
    textSize(16);
    text("Press ENTER to Start", width/2, 240);
}


function drawWin() { // screen when user wins 
    background(0, 150, 50);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("🎉 You Escaped! 🎉", width/2, 150); 
    textSize(20);
    text("Final Score: " + score, width/2, 180);
    text("Press ENTER to restart", width/2, 220);

}

function drawGameOver() { // screen when user loses
    background(150, 0, 0);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("💀 Game Over 💀", width/2, 150);
    textSize(20);
    text("You were caught!",width/2, 180);
    text("Score: " + score, width/2, 200, 220);
    text("Press ENTER to restart", width/2, 250);

}

function drawGame() { // screen when user is playing 
    fill(0, 255, 0);
    ellipse(player.x, player.y, player.size, player.size); // player circle 

    fill(255, 0, 0);
    ellipse(alien.x, alien.y, alien.size, alien.size); // alien circle 

    // myMusic = new sound("kahoot.mp3"); 
    // myMusic.play();
    // Move alien toward player
    alien.x += (player.x - alien.x) * 0.01 * alien.speed; 
    alien.y += (player.y - alien.y) * 0.01 * alien.speed;

    // Player movement
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= 3;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.x += 3;
    }
    if (keyIsDown(UP_ARROW)) {
        player.y -= 3;
    }
    if (keyIsDown(DOWN_ARROW)) {
        player.y += 3;
    }

    // Display question and input
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Level: " + level, 10, 10);
    text("Score: " + score, 10, 30);
    text("Q: " + question, 10, 50);
    text("Answer: " + userAnswer, 10, 70);

    // Collision with alien
    var distance = dist(player.x, player.y, alien.x, alien.y);
    if (distance < (player.size + alien.size) / 2) {
        screen = "gameOver";
    }

    // Win condition: go to the right with the correct answer
    if (player.x > 370 && int(userAnswer) === correctAnswer) {
        score += 10;
        level++;
        if (level > 5) {
            screen = "win";
        } else {
            nextLevel();
        }
    }
}

function Question() { // generating question 
    var a = int(random(1, 10 + level)); // a random number being added to the level
    var b = int(random(1, 10 + level)); // another random number being added to the level 
    correctAnswer = a + b; 
    question = a + " + " + b + " = ?"; // question to display 
}

function nextLevel() { // when the user reaches the next level 
    player.x = 50; // reset the initial x position 
    player.y = 300; // reset the initial y position 
    alien.x = 350; // reset the initial x position 
    alien.y = 300; // reset the initial y position 
    userAnswer = ""; // reset
    alien.speed += 0.3; // alien's speed increases 
    Question(); 
}


function keyPressed(e) {
  if (screen === "start" && keyCode === ENTER) {
    screen = "game";
  }

  if ((screen === "gameOver" || screen === "win") && keyCode === ENTER) {
    screen = "start";
    level = 1;
    score = 0;
    userAnswer = "";
    alien.speed = 1.0;
    player.x = 50;
    player.y = 300;
    alien.x = 350;
    alien.y = 300;
    Question();
  }

  if (screen === "game") {
    // Number input
    if (key >= '0' && key <= '9') {
      userAnswer += key;
    }

    // Backspace
    if (keyCode === BACKSPACE) {
      userAnswer = userAnswer.slice(0, -1);
      return false; // Prevent default browser behavior
    }
  }
}


