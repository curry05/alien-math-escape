// Alien Math Escape Game
// Author: Karisha Negi

var screen = "start";
var score = 0;
var level = 1;
var userAnswer = "";
var question = "";
var correctAnswer = 0;

var player = {
    x: 50,
    y: 300,
    size: 30
};

var alien = {
    x: 350,
    y: 300,
    size: 30,
    speed: 1.5
};

function setup() {
    createCanvas(400, 400);
    generateQuestion();
}

function draw() {
    background(0);

    if (screen === "start") {
        drawStart();
    } else if (screen === "game") {
        drawGame();
    } else if (screen === "win") {
        drawWin();
    } else if (screen === "gameOver") {
        drawGameOver();
    }
}

function drawStart() {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("👾 Alien Math Escape 👾", 200, 100);
    textSize(16);
    text("Press ENTER to Start", 200, 150);
}

function drawWin() {
    background(0, 150, 50);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("🎉 You Escaped! 🎉", 200, 150);
    textSize(16);
    text("Final Score: " + score, 200, 200);
}

function drawGameOver() {
    background(150, 0, 0);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("💀 Game Over 💀", 200, 150);
    textSize(16);
    text("You were caught!", 200, 190);
    text("Score: " + score, 200, 220);
}

function drawGame() {
    fill(0, 255, 0);
    ellipse(player.x, player.y, player.size, player.size);

    fill(255, 0, 0);
    ellipse(alien.x, alien.y, alien.size, alien.size);

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

    // Win condition: go to right edge with correct answer
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

function generateQuestion() {
    var a = int(random(1, 10 + level));
    var b = int(random(1, 10 + level));
    correctAnswer = a + b;
    question = a + " + " + b + " = ?";
}

function nextLevel() {
    player.x = 50;
    player.y = 300;
    alien.x = 350;
    alien.y = 300;
    userAnswer = "";
    alien.speed += 0.5;
    generateQuestion();
}

function keyTyped() {
    if (screen === "game") {
        if (key >= '0' && key <= '9') {
            userAnswer += key;
        } else if (key === 'Backspace') {
            userAnswer = userAnswer.slice(0, -1);
        }
    }
}

function keyPressed() {
    if (screen === "start" && keyCode === ENTER) {
        screen = "game";
    }
    if ((screen === "gameOver" || screen === "win") && keyCode === ENTER) {
        screen = "start";
        level = 1;
        score = 0;
        userAnswer = "";
        alien.speed = 1.5;
        player.x = 50;
        player.y = 300;
        alien.x = 350;
        alien.y = 300;
        generateQuestion();
    }
}
