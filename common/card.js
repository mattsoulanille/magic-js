'use strict';


function card(name,types) {
    this.counters = [];
    this.name = name;
    this.tapped = false;
    this.types = types;
    this.flipped = false;
    card.prototype.buildGraphics();
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
    this.cardSprite = new PIXI.Sprite.fromImage('images/back.jpg');
    this.cardSprite.interactive = true;
    this.cardSprite.anchor.x = 0.5;
    this.cardSprite.anchor.y = 0.5;
    this.cardSprite.scale.x = this.scale;
    this.cardSprite.scale.y = this.scale;
    this.container.addChild(this.cardSprite);


    this.buildActions();
    
}

card.prototype.tap = function() {

    if (this.tapped) {
	this.tapped = false;
    }
    else {
	this.tapped = true;
    }
}



card.prototype.buildActions = function() {
    var tap = function() {
	this.tap();
	if (this.tapped) {
	    this.container.rotation = Math.PI/2;
	}
	else {
	    this.container.rotation = 0;
	}
    }.bind(this);

    
    this.cardSprite.on('mousedown', tap);
    this.cardSprite.on('touchstart', tap);


}
