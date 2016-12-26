'use strict'

function scryZone(cards) {
    zone.call(this,cards);
    for (var i = 0; i < this.cards.length; i++){
	this.cards[i].draggable = true;
    }
}

scryZone.prototype = new zone;

scryZone.prototype.animate = function (renderingPlayersHand,revealedCards){
    for (var i = 0; i < this.cards.length; i++){
	this.cards[i].draggable = true;
	this.cards[i].flipped = renderingPlayersHand ^ (revealedCards.includes(i));
    }
}
