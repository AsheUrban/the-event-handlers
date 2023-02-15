export class Layer {
  constructor(game, image, speedModifier){
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;

  }
  update(){
    if (this.x <= this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
    
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }

}

export class Background {
  constructor(game) {
    this.game = game;
    this.image1 = document.getElementById('background1');
    this.layer1 = new Layer(this.game, this.image1, 1);
    this.layers = [this.layer1];
  }
  update(){
    this.layers.forEach(layer => layer.update());

  }
  draw(context){
    this.layers.forEach(layer => layer.draw(context));
  }
}