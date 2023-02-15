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
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.image1 = document.getElementById('background1');
    this.image2 = document.getElementById('background2');
    this.image3 = document.getElementById('background3');
    this.image4 = document.getElementById('background4');
    this.image5 = document.getElementById('background5');
    this.layer1 = new Layer(this.game, this.image1, 0);
    this.layer2 = new Layer(this.game, this.image2, 0.5);
    this.layer3 = new Layer(this.game, this.image3, 0.25);
    this.layer4 = new Layer(this.game, this.image4, 0.75);
    this.layer5 = new Layer(this.game, this.image5, 1.1);
    this.layers = [this.layer1, this.layer2, this.layer4];
  }
  update(){
    this.layers.forEach(layer => layer.update());
  }
  draw(context){
    this.layers.forEach(layer => layer.draw(context));
  }
}