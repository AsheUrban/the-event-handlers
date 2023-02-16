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
      if (this.game.score >= this.game.winningScore) {
        message1 = "You win!";
        message2 = "Don't let it go to your head.";
      } else {
        message1 = "You lose!";
        message2 = "No surprise there.";
      }
      context.font = "50px" + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 40
      );
      context.font = "25px" + this.fontFamily;
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

window.addEventListener("load", () => {
  //canvas setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1500;
  canvas.height = 500;
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  let reset = false;

  function readyToStart(event){
    if (event.key === "w") {
      animate(0);
      game.gameTime = 0;
    }
  }

  function splashScreen(context) {
    let mitchell = document.getElementById('mitchell');
    context.fillStyle = 'black';
    context.fillRect(0, 0,canvas.width, canvas.height);
    const string1 = "THE YEAR IS 3030.  LIZARD KING JACKSON HAS TAKEN OVER THE WORLD.";
    const string2 = 'THE REBELLIOUS CODING STUDENTS ARE TRYING TO START AN UPRISING AGAINST';
    const string3 = 'THE EMPIRE YOU ARE VS CODE, JACKSONS GREATEST WEAPON.  USE YOUR';
    const string4 = 'CONFUSING LOGIC AND SYNTAX TO FOIL THESE SILLY STUDENTS. COLLECT';
    const string5 = 'A      TO GAIN POWER AND TO GO SUPER SAIYAN FULL VISUAL STUDIO';
    const string6 = 'MODE TO DESTROY THOSE WEAKLINGS. PRESS SPACEBAR TO SHOOT, UP AND ';
    const string7 = 'DOWN ARROWS TO MOVE UP AND DOWN. WATCH YOUR AMMO AND TRY TO GET ';
    const string8 = 'THE HIGHEST SCORE BY DESTROYING THE FLYING HEADS.  PRESS W TO START!';
    context.drawImage(mitchell, 310, 200);
    context.font = "25px " + 'monospace';
    context.fillStyle = 'lightpink';
    context.fillText(string1, 300, 50);
    context.fillText(string2, 250, 100);
    context.fillText(string3, 300, 150);
    context.fillText(string4, 300, 200);
    context.fillText(string5, 275, 250);
    context.fillText(string6, 300, 300);
    context.fillText(string7, 300, 350);
    context.fillText(string8, 250, 400);
    window.addEventListener("keydown", readyToStart);
  }
  // animation loop
  function animate(timeStamp) {
   
    
    window.removeEventListener('keydown', readyToStart);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);

    if (!reset) {
          console.log('inside reset');
          reset = !reset;
          game.startedgametime = timeStamp;
        }

    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  splashScreen(ctx);
});