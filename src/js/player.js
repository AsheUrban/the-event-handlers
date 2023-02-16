import { Projectile } from "./projectile";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 96;
    this.height = 100;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.projectiles = [];
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;
    this.image = document.getElementById("player");
    this.powerUpImage = document.getElementById("playerpowerup");
  }
  update(deltaTime) {
    if (this.y > this.game.height - this.height * 0.1)
      this.y = -this.height * 0.9;
    else if (this.y < -this.height * 0.9) this.y = this.game.height * 0.9;
    if (this.game.keys.up === true && this.game.keys.down === true) {
      // evaluate this statement ? do this if statement true : do this if false
      this.game.keys.lastPressed === "up"
        ? (this.speedY = -this.maxSpeed)
        : (this.speedY = this.maxSpeed);
    } else if (this.game.keys.up) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.down) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }
    if (this.game.keys.shoot && this.game.firingInterval > 75)
      this.game.player.shootTop();
    this.y += this.speedY;
    //handle projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
    //power up
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
      } else {
        this.powerUpTimer += deltaTime;
        this.game.ammo += 0.1;
      }
    }
  }
  draw(context) {
    if (!this.powerUp) {
      context.drawImage(this.image, this.x, this.y);
    } else {
      context.drawImage(this.powerUpImage, this.x, this.y);
    }
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }
  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 50, this.y + 48, "straight")
      );
      // this.game.projectile.y
      this.game.ammo--;
    }
    this.game.firingInterval = 0;
    if (this.powerUp) this.shootBottom();
  }
  shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 60, this.y + 72, "up")
      );
      this.projectiles.push(
        new Projectile(this.game, this.x + 60, this.y + 24, "down")
      );
    }
  }
  enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;
    this.game.ammo = this.game.maxAmmo;
  }
}