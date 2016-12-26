'use strict'

//top of stack is top of deck
function library(cards) {
    zone.call(this,cards);
}

library.prototype = new zone;

library.prototype.animate = function (x,y){
    var dx = x;
    var dy = y;
    for (var i = 0; i < this.cards.length; i++){
	this.cards[i].container.position.x = dx;
	this.cards[i].container.position.y = dy;
	dx -= 0.5;
	dy -= 1;
    }
}

library.prototype.draw = function (n){
    var cardsDrawn = [];
    for (var i = 0; i < n; i++){
	cardsDrawn.push(this.popCard());
    }
    this.cards[this.cards.length-1].draggable = true;
    return cardsDrawn;
}

library.prototype.shuffle = function (){
    /**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
   // function shuffle(a) {
	for (let i = this.cards.length; i; i--) {
	    let j = Math.floor(Math.random() * i);
	    [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
	}
    //}
    for (var i = 0; i < this.cards.length; i++){
	this.container.removeChild(this.cards[i].container);
	this.container.addChild(this.cards[i].container);
	this.cards[i].draggable = ( i == this.cards.length-1);
    }
}

library.prototype.putOnBottom = function (card){
    this.cards.unshift(card);
    this.container.addChildAt(card.container,0);
}
library.prototype.insertRandomly = function (card){
    var p = Math.floor(Math.random() * this.cards.length)
    this.cards.splice(p,0,card);
    this.container.addChildAt(card.container,p);
    for (var i = 0; i < this.cards.length; i++){
	this.cards[i].draggable = ( i == this.cards.length-1);
    }
}

