'use strict';


function card(name,types) {
    this.counters = [];
    this.name = name;
    this.tapped = false;
    this.types = types;
    this.flipped = false;
    this.buildGraphics();
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

    var onDragStart = function(event) {
	// store a reference to the data
	// the reason for this is because of multitouch
	// we want to track the movement of this particular touch
	this.drag = {};
	this.drag.data = event.data;
	this.drag.startPoint = this.drag.data.getLocalPosition(this.container.parent);
	this.drag.dragPoint = new PIXI.Point(this.drag.startPoint.x - this.container.position.x,
					     this.drag.startPoint.y - this.container.position.y);

	this.drag.dragging = false;
	this.drag.startedDrag = true;
    }.bind(this);
    
    var onDragEnd = function() {
	if ( (typeof this.drag !== 'undefined') && (!this.drag.dragging) ) {
	    this.tap();
	}

	this.container.alpha = 1;
	// set the interaction data to null
	this.drag = undefined;
    }.bind(this);

    var onDragMove = function() {
	var dist2 = function(p1,p2) {
	    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}

	if ( (typeof this.drag !== 'undefined') && (this.drag.startedDrag) && (!this.drag.dragging) &&
	     dist2(this.drag.startPoint, this.drag.data.getLocalPosition(this.container.parent)) > 100 ) {
	    this.drag.dragging = true;
	    this.container.alpha = 0.5;
	}
	if ( (typeof this.drag !== 'undefined') && (this.drag.dragging)) {
	    
            var newPosition = this.drag.data.getLocalPosition(this.container.parent);
            this.container.position.x = newPosition.x - this.drag.dragPoint.x;
            this.container.position.y = newPosition.y - this.drag.dragPoint.y;
	}
    }.bind(this);
    
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
