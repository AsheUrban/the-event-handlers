import { Particle } from "./particle";
import { Player } from "./player";
import { Carl, Jake, Mitchell, Jannon, Ashe } from "./enemy";
import { InputHandler, UI } from "./../index";
import { Background } from "./layers.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.keys = { up: false, down: false, shoot: false, lastPressed: "up" };
    this.enemies = [];
    this.particles = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.ammo = 20;
    this.maxAmmo = 50;
    this.firingInterval = 0;
    this.ammoTimer = 0;
    this.ammoInterval = 200;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 500;
    this.gameTime = 0;
    this.timeLimit = 60000;
    this.speed = 1;
  }
  update(deltaTime) {
    this.firingInterval += deltaTime;
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    this.background.update();
    this.background.layer5.update();
    this.player.update(deltaTime);
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
      }
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        for (let i = 0; i < 2; i++) {
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
        }
        if (enemy.type === "lucky") this.player.enterPowerUp();
        else if (!this.gameOver) this.score = 0;
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;

          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            for (let i = 0; i < 4; i++) {
              this.particles.push(
                new Particle(
                  this,
                  enemy.x + enemy.width * 0.5,
                  enemy.y + enemy.height * 0.5
                )
              );
            }
            if (!this.gameOver) this.score += enemy.score;
            if (this.score >= this.winningScore) this.gameOver = true;
          }
        }
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0 + this.gameTime * 0.005;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.ui.draw(context);
    this.particles.forEach((particle) => particle.draw(context));
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.background.layer5.draw(context);
  }
  addEnemy() {
    const randomize = Math.random();
    if (0 < randomize && randomize < 0.2) this.enemies.push(new Carl(this));
    else if (0.2 < randomize && randomize < 0.4)
      this.enemies.push(new Jake(this));
    else if (0.4 < randomize && randomize < 0.6)
      this.enemies.push(new Jannon(this));
    else if (0.6 < randomize && randomize < 0.8)
      this.enemies.push(new Ashe(this));
    else if (0.8 < randomize && randomize < 1)
      this.enemies.push(new Mitchell(this));
  }
  checkCollision(rect1, rect2) {
    const checkLeft = rect1.x < rect2.x + rect2.width;
    const checkRight = rect1.x + rect1.width > rect2.x;
    const checkBottom = rect1.y < rect2.y + rect2.height;
    const checkTop = rect1.height + rect1.y > rect2.y;
    return checkLeft && checkRight && checkTop && checkBottom;
  }
}
