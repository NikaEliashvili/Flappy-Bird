document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const groundAll = document.querySelectorAll(".ground");
  const countPipesEl = document.querySelector(".count-numb");
  const startBtn = document.querySelector(".start-btn");
  const startCont = document.querySelector(".start-cont");
  const playagainCont = document.querySelector(".playagain-cont");
  const playagainBtn = document.querySelector(".playagain-btn");
  const oldRecord = document.querySelector(".old-record");

  let birdLeft = 220;
  let birdBottom = 200;
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;
  let countPipes = 0;
  let record = localStorage.getItem("record") || 0;

  //
  //
  //
  //
  oldRecord.innerHTML = record;
  console.log(groundAll);
  startBtn.addEventListener("click", () => {
    groundAll.forEach((ground) => ground.classList.add("ground-moving"));
    startCont.style.display = "none";

    function startGame() {
      birdBottom -= gravity;
      bird.style.bottom = birdBottom + "px";
      bird.style.left = birdLeft + "px";
    }

    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
      if (e.keyCode === 32) {
        jump();
      } else {
        jump();
      }
    }

    function jump() {
      if (birdBottom < 500) birdBottom += 45;
      bird.style.bottom = birdBottom + "px";
    }

    document.addEventListener("keyup", control);
    document.addEventListener("click", control);

    function generateObstacle() {
      let obstacleLeft = 500;
      let randomHeight = Math.random() * 60;
      let obstacleBottom = randomHeight;
      let topObstacleBottom = obstacleBottom + gap;
      const obstacle = document.createElement("div");
      const topObstacle = document.createElement("div");
      if (!isGameOver) {
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("top-obstacle");
      }
      gameDisplay.appendChild(obstacle);
      gameDisplay.appendChild(topObstacle);
      obstacle.style.left = obstacleLeft + "px";
      obstacle.style.bottom = obstacleBottom + "px";
      topObstacle.style.left = obstacleLeft + "px";
      topObstacle.style.bottom = topObstacleBottom + "px";

      function moveObsticle() {
        if (isGameOver) {
          clearInterval(timerId);
        }
        obstacleLeft -= 2;
        obstacle.style.left = obstacleLeft + "px";
        topObstacle.style.left = obstacleLeft + "px";

        if (obstacleLeft === -60) {
          clearInterval(timerId);
          gameDisplay.removeChild(obstacle);
        }
        if (obstacleLeft === 170) {
          console.log(obstacleLeft);
          countPipes++;
        }
        if (
          (obstacleLeft > 175 &&
            obstacleLeft < 280 &&
            birdLeft === 220 &&
            (birdBottom <= obstacleBottom + 148 ||
              birdBottom >= topObstacleBottom - 200)) ||
          birdBottom === 0
        ) {
          //   countPipesContainer.style.display = "block";
          countPipesEl.innerHTML = countPipes;
          if (record <= countPipes) {
            record = countPipes;
            localStorage.setItem("record", record);
          }
          clearInterval(timerId);
          gameOver();
        }
        if (!isGameOver) return;
      }
      let timerId = setInterval(moveObsticle, 20);
      if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    function gameOver() {
      groundAll.forEach((ground) => ground.classList.remove("ground-moving"));

      playagainCont.style.display = "block";
      clearInterval(gameTimerId);
      isGameOver = true;
      document.removeEventListener("keyup", control);
      document.removeEventListener("click", control);

      playagainBtn.addEventListener("click", () => {
        window.location.href = "/";
      });
    }
  });
});
