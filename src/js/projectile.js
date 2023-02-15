export class Projectile {
  constructor(game, x, y, angle) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 13;
    this.markedForDeletion = false;
    this.angle = angle;
    
  }
  update() {
    this.x += this.speed;
    if (this.angle === 'up') {
      this.y += this.speed/10;
    } else if (this.angle === 'down') {
      this.y -= this.speed/10;
    }
    
    if(this.x > this.game.width * 0.95) this.markedForDeletion = true;
  }    
  draw(context) {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}