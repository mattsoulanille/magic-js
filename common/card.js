'use strict';


function card(name,types) {
    this.counters = [];
    this.name = name;
    this.tapped = false;
    this.types = types;
    this.flipped = false;
    this.buildGraphics();
    this.draggable = false;
}

card.prototype.scale = 0.5;
card.prototype.addCounter = function(initialVal,name) {
    this.counters.push( new counter(initialVal,name));
}


card.prototype.duplicateCounter = function(name,newName){
    for (var i = 0; i < this.counters.length; i++){
	if (this.counters[i].name == name){
	    this.addCounter(this.counters[i].value,newName);
	    break;
	}
    }
}
card.prototype.findCounter = function(name){
    for (var i = 0; i < this.counters.length; i++){
	if (this.counters[i].name == name){
	    return this.counters[i];
	}
    }
}



card.prototype.buildGraphics = function() {
    this.container = new PIXI.Container();
    this.backTexture = new PIXI.Texture.fromImage('images/back.jpg');
    this.frontTexture = new PIXI.Texture.fromImage('images/cards/' + this.name + '.jpg');
    this.cardSprite = new PIXI.Sprite(this.backTexture);
    this.cardSprite.interactive = true;
    this.cardSprite.anchor.x = 0.5;
    this.cardSprite.anchor.y = 0.5;
    this.cardSprite.scale.x = this.scale;
    this.cardSprite.scale.y = this.scale;
    this.container.addChild(this.cardSprite);


    this.buildActions();
    
}
card.prototype.cardDimensions = {};
card.prototype.cardDimensions.x = 150;
card.prototype.cardDimensions.y = 208;

card.prototype.flip = function() {
    this.flipped = !this.flipped;
    var texture;
    if (this.flipped) {
	texture = this.frontTexture;
    }
    else {
	texture = this.backTexture;
    }

    this.cardSprite.scale.x = this.cardDimensions.x / texture._frame.width;
    this.cardSprite.scale.y = this.cardDimensions.y / texture._frame.height;
    this.cardSprite.texture = texture;
}

card.prototype.tap = function() {
    this.tapped = !this.tapped;

    if (this.tapped) {
	this.container.rotation = Math.PI/2;
    }
    else {
	this.container.rotation = 0;
    }
}



card.prototype.buildActions = function() {

    this.cardSprite.on('click', this.tap.bind(this));
    this.cardSprite.on('touch', this.tap.bind(this));

}
