'use strict'

//top of stack is top of deck
function library(cards) {
    zone.call(this,cards);
}

library.prototype = new zone;

library.prototype.draw = function (n){
    var cardsDrawn = [];
    for (var i = 0; i < n; i++){
	cardsDrawn.push(this.cards.pop());
    }
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
    
}

library.prototype.putOnBottom = function (card){
    this.cards.unshift(card);
}
library.prototype.insertRandomly = function (card){
    this.cards.splice(Math.floor(Math.random() * this.cards.length),0,card);
}

