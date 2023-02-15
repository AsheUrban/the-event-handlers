import "./css/styles.css";
import { Game } from "./js/game";

export class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        this.game.keys.up = true;
        this.game.keys.lastPressed = "up";
      }
      if (e.key === "ArrowDown") {
        this.game.keys.down = true;
        this.game.keys.lastPressed = "down";
      }
      if (e.key === " ") {
        this.game.keys.shoot = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") {
        this.game.keys.up = false;
      }
      if (e.key === "ArrowDown") {
        this.game.keys.down = false;
      }
      if (e.key === " ") {
        this.game.keys.shoot = false;
      }
    });
  }
}

export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Papyrus";
    this.color = "lightpink";
  }
  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.font = this.fontSize + "px " + this.fontFamily;
    //score
    context.fillText("Score: " + this.game.score, 20, 40);
    // Timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText("Timer:" + formattedTime, 20, 100);
    // game over messages
    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        message1 = "You win!";
        message2 = "Don't let it go to your head.";
      } else {
        message1 = "You lose!";
        message2 = "No surprise there.";
      }
      context.font = "50px " + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 40
      );
      context.font = "25px " + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 40
      );
    }
    //ammo

    if (this.game.player.powerUp) context.fillStyle = "cyan";
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
    context.restore();
  }
}

// class Layer {}

// class Background {}


window.addEventListener("load", () => {
  //canvas setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1500;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  // animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
