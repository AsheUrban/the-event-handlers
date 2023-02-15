import { Projectile } from './projectile';

export class Player {
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