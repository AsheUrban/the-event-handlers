import { Particle } from './particle';
import { Player } from './player';
import { Angler1, Angler2, LuckyFish } from './enemy';
import { InputHandler, UI } from './../index';




export class Game {
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
    this.winningScore = 100;
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
  }
  checkCollision(rect1, rect2){
    const checkLeft = rect1.x < rect2.x + rect2.width;
    const checkRight = rect1.x + rect1.width > rect2.x;
    const checkBottom = rect1.y < rect2.y + rect2.height;
    const checkTop = rect1.height +rect1.y > rect2.y;
    return (checkLeft && checkRight && checkTop && checkBottom);
  }
}