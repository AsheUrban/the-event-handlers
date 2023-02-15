import "./../css/styles.css";
window.addEventListener("load", () => {
  //canvas setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1500;
  canvas.height = 500;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', e => {
        if (e.key === "ArrowUp") {
          this.game.keys.up = true;
          this.game.keys.lastPressed = 'up';
        }
        if (e.key==="ArrowDown") {
          this.game.keys.down = true;
          this.game.keys.lastPressed = 'down';
        }
        if (e.key === " ") {
          this.game.keys.shoot = true;
        }
      });
      window.addEventListener('keyup', e => {
        if (e.key === "ArrowUp") {
          this.game.keys.up = false; 
        }
        if (e.key==="ArrowDown") {
          this.game.keys.down = false;
        }
        if (e.key === " ") {
          this.game.keys.shoot = false;
        }
      });
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 13;
      this.markedForDeletion = false;
    }
    update() {
      this.x += this.speed;
      if(this.x > this.game.width * 0.95) this.markedForDeletion = true;
    }    
    draw(context) {
      context.fillStyle = 'yellow';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  class Particle {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById("particles");
      this.frameX = Math.floor(Math.random() * 3);
      this.frameY = Math.floor(Math.random() * 3);
      this.spriteSize = 50;
      this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
      this.size = this.spriteSize * this.sizeModifier;
      this.speedX = Math.random() * 12 - 6;
      this.speedY = Math.random() * -15;
      this.gravity = 0.5;
      this.markedForDeletion = false;
      this.angle = 0;
      this.va = Math.random() * 0.2 - 0.1;
      this.bounced = 0;
      this.bottomBounceBoundary = Math.random() * 100 + 60;
    }
    update() {
      this.angle += this.va;
      this.speedY += this.gravity;
      //move particles forward with speed
      // this.x -= this.speedX + this.game.speed;
      this.x -= this.speedX;
      this.y += this.speedY;
      if(this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
      if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
        this.bounced++;
        this.speedY *= -0.7;
      }
    }
    draw(context) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
      context.restore();
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 120;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.maxSpeed = 5;
      this.projectiles = [];
      this.powerUp = false;
      this.powerUpTimer = 0;
      this.powerUpLimit = 10000;
    }
    update(deltaTime) {
      if (this.y > this.game.height - this.height * 0.1) this.y = -this.height * 0.9;
      else if (this.y < -this.height * 0.9) this.y = this.game.height * .9;
      if (this.game.keys.up === true && this.game.keys.down === true) {
        // evaluate this statement ? do this if statement true : do this if false
        this.game.keys.lastPressed === "up" ? this.speedY = -this.maxSpeed : this.speedY = this.maxSpeed;
      } else if (this.game.keys.up) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.down) {
        this.speedY = this.maxSpeed;
      } else {
        this.speedY = 0;
      }
      if (this.game.keys.shoot && this.game.firingInterval>75) this.game.player.shootTop();
      this.y += this.speedY;
      //handle projectiles
      this.projectiles.forEach(projectile => {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
      //power up
      if (this.powerUp){
        if (this.powerUpTimer > this.powerUpLimit){
          this.powerUpTimer = 0;
          this.powerUp = false;
          // this.frameY = 0;
        } else { 
          this.powerUpTimer += deltaTime;
          // this.frameY = 1;
          this.game.ammo += 0.1;
        }
      }
    }
    draw(context) {
      context.fillStyle = 'magenta';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach(projectile => {
        projectile.draw(context);
      });
    }
    shootTop(){ 
      if (this.game.ammo > 0){
        this.projectiles.push(new Projectile(this.game, this.x + 60,  this.y + 60));
        this.game.ammo--;
      }
      this.game.firingInterval = 0;
      if (this.powerUp) this.shootBottom();
    }
    shootBottom() {
      if (this.game.ammo>0) {
        this.projectiles.push(new Projectile(this.game, this.x + 60,  this.y + 90));
        this.projectiles.push(new Projectile(this.game, this.x + 60,  this.y + 30));
      }
    }
    enterPowerUp () {
      this.powerUpTimer = 0;
      this.powerUp = true;
      this.game.ammo = this.game.maxAmmo;
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
    }
    update() {
      this.x += this.speedX;
      if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
      context.fillStyle = 'orange';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = 'black';
      context.font = '20px Papyrus';
      context.fillText(this.lives, this.x + (this.width / 2), this.y + (this.height / 2));
    }
  }

  class Angler1 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 100 * .5;
      this.height = 100 * .5;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.lives = 5;
      this.score = this.lives;
      //character animation
      //this.image = document.getElementById('angler1');
      //this.frameY = Math.floor(Math.random()* 3);
    }
  }

  class Angler2 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 100 * .75;
      this.height = 100 * .75;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.lives = 10;
      this.score = this.lives;
      //character animation
      //this.image = document.getElementById('angler2');
      //this.frameY = Math.floor(Math.random()* 3);
    }
  }

  class LuckyFish extends Enemy {
    constructor(game) {
      super(game);
      this.width = 100 * .25;
      this.height = 100 * .25;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.lives = 3;
      this.score = 15;
      this.type = 'lucky';
      //character animation
      //this.image = document.getElementById('lucky');
      //this.frameY = Math.floor(Math.random()* 3);
    }
  }

  // class Layer {}

  // class Background {}

  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'Papyrus';
      this.color = 'lightpink';
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
      context.fillText('Timer:' + formattedTime, 20, 100);
      // game over messages
      if(this.game.gameOver) {
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
        context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
        context.font = "25px " + this.fontFamily;
        context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
      } 
      //ammo

      if (this.game.player.powerUp) context.fillStyle = 'cyan';
      for(let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }
      context.restore();
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = {up: false, down: false, shoot: false, lastPressed: 'up'};
      this.enemies = [];
      this.particles = [];
      this.enemyTimer=0;
      this.enemyInterval = 1000;
      this.ammo = 20;
      this.maxAmmo = 50;
      this.firingInterval = 0;
      this.ammoTimer = 0;
      this.ammoInterval = 200;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10;
      this.gameTime = 0;
      this.timeLimit = 30000;
      //this.speed = 1;
    }
    update(deltaTime) {
      this.firingInterval += deltaTime;
      if (!this.gameOver) this.gameTime += deltaTime;
      if (this.gameTime > this.timeLimit) this.gameOver = true;
      this.player.update(deltaTime);
      if(this.ammoTimer > this.ammoInterval) {
        if(this.ammo < this.maxAmmo) {
          this.ammo++;
        }
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }
      this.particles.forEach(particle => particle.update());
      this.particles = this.particles.filter(particle => !particle.markedForDeletion);
      this.enemies.forEach(enemy => {
        enemy.update();
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(this, enemy.x + enemy.width*0.5, enemy.y + enemy.height*0.5));
          }
          if (enemy.type === 'lucky') this.player.enterPowerUp();
          else this.score --;
        }
        this.player.projectiles.forEach(projectile => {
          if (this.checkCollision(projectile, enemy)){
            enemy.lives--;
            projectile.markedForDeletion = true;
            this.particles.push(new Particle(this, enemy.x + enemy.width*0.5, enemy.y + enemy.height*0.5));
            if (enemy.lives <= 0){
              enemy.markedForDeletion = true;
              for (let i = 0; i < 15; i++) {
                this.particles.push(new Particle(this, enemy.x + enemy.width*0.5, enemy.y + enemy.height*0.5));
              }
              if (!this.gameOver) this.score += enemy.score;
              if (this.score > this.winningScore) this.gameOver = true;
            }
          }
        });
      });

      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      this.player.draw(context);
      this.ui.draw(context);
      this.particles.forEach(particle => particle.draw(context));
      this.enemies.forEach(enemy => {
        enemy.draw(context);
      });
      //this.background.layer4.draw(context);
    }
    addEnemy() {
      const randomize = Math.random();
      if (randomize < 0.3) this.enemies.push(new Angler1(this));
      else if (randomize < 0.6) this.enemies.push(new Angler2(this));
      else this.enemies.push(new LuckyFish(this));
      // console.log(this.enemies);
    }
    checkCollision(rect1, rect2){
      const checkLeft = rect1.x < rect2.x + rect2.width;
      const checkRight = rect1.x + rect1.width > rect2.x;
      const checkBottom = rect1.y < rect2.y + rect2.height;
      const checkTop = rect1.height +rect1.y > rect2.y;
      return (checkLeft && checkRight && checkTop && checkBottom);
    }
  }
  
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
