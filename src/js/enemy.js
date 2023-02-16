export class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -2 - 0.5;
    this.speedY = Math.random() * -2 - 0.5;
    this.up;
    this.upTimer = 0;
    this.upInterval = 500;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    if (this.upTimer > this.upInterval) {
      this.upTimer = 0;
      if (this.up) {
        this.up = false;
      } else {
        this.up = true;
      }
    } else {
      this.upTimer += deltaTime;
    }

    if (this.up) {
      if (this.y > this.game.height) {
        this.up = !this.up;
      } else {
        this.y += this.speedY;
      }
    } else {
      if (this.y > this.game.height - 10) {
        this.up = !this.up;
      } else {
        this.y -= this.speedY;
      }
    }

    // if(this.up) {
    //   if(this.y < this.game.height-this.height) {
    //     this.y+=this.speedY;
    //   }
    // } else {
    //   if(this.y >= 0 ) {
    //     this.y-=this.speedY;
    //   }
    // }

    this.x += this.speedX;

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y);
    context.fillStyle = "blue";
    context.font = "20px Papyrus";
    context.fillText(
      this.lives,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }
}

export class Carl extends Enemy {
  constructor(game) {
    super(game);
    this.width = 80;
    this.height = 111;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 5;
    this.score = this.lives;
    this.image = document.getElementById("carl");
    //character animation
    //this.frameY = Math.floor(Math.random()* 3);
  }
}

export class Jake extends Enemy {
  constructor(game) {
    super(game);
    this.width = 200;
    this.height = 112;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 10;
    this.score = this.lives;
    this.image = document.getElementById("jake");
  }
}

export class Mitchell extends Enemy {
  constructor(game) {
    super(game);
    this.width = 50;
    this.height = 76;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 3;
    this.score = 15;
    this.type = "lucky";
    this.image = document.getElementById("mitchell");
  }
}

export class Jannon extends Enemy {
  constructor(game) {
    super(game);
    this.width = 50;
    this.height = 156;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 10;
    this.score = 50;
    this.image = document.getElementById("jannon");
  }
}

export class Ashe extends Enemy {
  constructor(game) {
    super(game);
    this.width = 149;
    this.height = 102;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 7;
    this.score = 30;
    this.image = document.getElementById("ashe");
  }
}
