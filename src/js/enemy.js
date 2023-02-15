export class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = (Math.random() * -2 -.5);
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

export class Angler1 extends Enemy {
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

export class Angler2 extends Enemy {
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

export class LuckyFish extends Enemy {
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

export class Jannon extends Enemy {
  constructor(game) {
    super(game);
    this.width = 156;
    this.height = 50;
  }
}