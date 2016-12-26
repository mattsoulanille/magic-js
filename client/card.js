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
    this.cardSprite.on('tap', this.tap.bind(this));

    var onDragStart = function(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
	this.data = event.data;
	this.dragPoint = new PIXI.Point(this.data.global.x - this.parent.position.x,
					this.data.global.y - this.parent.position.y);
	this.alpha = 0.5;
	this.dragging = true;
    }
    
    var onDragEnd = function() {
	this.alpha = 1;
	
	this.dragging = false;
	
	// set the interaction data to null
	this.data = null;
	this.dragPoint = null;
    }

    var onDragMove = function() {
	if (this.dragging)
	{
            var newPosition = this.data.getLocalPosition(this.parent.parent);
            this.parent.position.x = newPosition.x - this.dragPoint.x;
            this.parent.position.y = newPosition.y - this.dragPoint.y;
	}
    }
    
    this.cardSprite
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
}
