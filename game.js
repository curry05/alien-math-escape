<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Alien Math Escape</title>
  <style>
    canvas {
      display: block;
      margin: 30px auto;
      border: 2px solid #ccc;
    }
    body {
      background: #111;
      color: white;
      font-family: sans-serif;
      text-align: center;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.min.js"></script>
</head>
<body>
  <h1>Alien Math Escape 👾</h1>
  <p>Use arrow keys to move. Type your answer and reach the door!</p>
  <script>
    let screen = "start";
    let score = 0;
    let level = 1;
    let userAnswer = "";
    let question = "";
    let correctAnswer;

    let player = {x: 50, y: 300, size: 30};
    let alien = {x: 400, y: 300, size: 30, speed: 1.5};

    function setup() {
      createCanvas(400, 400);
      generateQuestion();
    }

    function draw() {
      background(0);
      if (screen === "start") drawStart();
      else if (screen === "game") drawGame();
      else if (screen === "win") drawWin();
      else if (screen === "gameOver") drawGameOver();
    }

    function drawStart() {
      background(30, 30, 80);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("👾 Alien Math Escape 👩‍🚀", width/2, 100);
      textSize(18);
      text("Solve math to unlock the door.", width/2, 160);
      text("Avoid the alien!", width/2, 190);
      text("Click to start", width/2, 250);
    }

    function drawWin() {
      background(0, 150, 50);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("🎉 You Escaped! 🎉", width/2, 150);
      textSize(18);
      text("Final Score: " + score, width/2, 200);
      text("Click to play again", width/2, 240);
    }

    function drawGameOver() {
      background(150, 0, 0);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("💀 Game Over 💀", width/2, 150);
      textSize(18);
      text("You were caught!", width/2, 200);
      text("Score: " + score, width/2, 230);
      text("Click to try again", width/2, 260);
    }

    function drawGame() {
      background(0, 0, 50);
      fill(100, 100, 255);
      rect(370, 150, 20, 100);

      fill(255);
      ellipse(player.x, player.y, player.size);
      fill(0, 255, 0);
      ellipse(alien.x, alien.y, alien.size);

      // Alien movement
      alien.x += (player.x - alien.x) * 0.01 * alien.speed;
      alien.y += (player.y - alien.y) * 0.01 * alien.speed;

      // Player movement
      if (keyIsDown(LEFT_ARROW)) player.x -= 3;
      if (keyIsDown(RIGHT_ARROW)) player.x += 3;
      if (keyIsDown(UP_ARROW)) player.y -= 3;
      if (keyIsDown(DOWN_ARROW)) player.y += 3;

      if (dist(player.x, player.y, alien.x, alien.y) < (player.size + alien.size)/2) {
        screen = "gameOver";
      }

      fill(255);
      textAlign(LEFT, TOP);
      textSize(16);
      text("Level: " + level, 10, 10);
      text("Score: " + score, 10, 30);
      text("Q: " + question, 10, 50);
      text("Your Answer: " + userAnswer, 10, 70);
      textSize(12);
      text("Go to the door with correct answer!", 10, 100);

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
      let a = int(random(1, 10 + level));
      let b = int(random(1, 10 + level));
      correctAnswer = a + b;
      question = `${a} + ${b} = ?`;
    }

    function nextLevel() {
      userAnswer = "";
      player.x = 50;
      player.y = 300;
      alien.x = 400;
      alien.y = 300;
      alien.speed += 0.5;
      generateQuestion();
    }

    function mousePressed() {
      if (screen === "start" || screen === "gameOver" || screen === "win") {
        screen = "game";
        score = 0;
        level = 1;
        userAnswer = "";
        player.x = 50;
        player.y = 300;
        alien.x = 400;
        alien.y = 300;
        alien.speed = 1.5;
        generateQuestion();
      }
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
  </script>
</body>
</html>
