'use strict'

function hand(cards) {
    zone.call(this,cards);
}

hand.prototype = new zone;

hand.prototype.animate = function (x,y,w,h,selectedCardIndex,renderingPlayersHand,revealedCards){
    if (selectedCardIndex >= 0){
	this.container.removeChild( this.cards[selectedCardIndex].container );
	this.container.addChild( this.cards[selectedCardIndex].container );
    }
    for (var i = 0; i < this.cards.length; i++){
	this.cards[i].container.position.x = x + (w/this.cards.length)*i;
	this.cards[i].container.position.y = y ;
	var aspectRatio = this.cards[i].container.height/this.cards[i].container.width;
	this.cards[i].container.scale.x = min((w/this.cards.length),(h/aspectRatio))/this.cards[i].container.width;
	this.cards[i].container.scale.y = min((w/this.cards.length),(h/aspectRatio))/this.cards[i].container.width;
	if (i == selectedCardIndex) {
	    this.cards[i].container.scale.x = ((h+5)/aspectRatio)/this.cards[i].container.width;
	    this.cards[i].container.scale.y = ((h+5)/aspectRatio)/this.cards[i].container.width;
	}
	this.cards[i].draggable = true;
	this.cards[i].flipped = renderingPlayersHand ^ (revealedCards.includes(i));
    }
}

hand.prototype.removeCard = function (index) {
    this.container.removeChild( this.cards[index].container );
    return this.cards.splice(index,1);
}

hand.prototype.insertCard = function (card,index) {
    this.cards.splice(index,0,card);
    this.comtainer.addChild(card.container)
}

