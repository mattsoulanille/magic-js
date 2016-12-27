'use strict'


function zone(cards) {
    var cards = cards || [];
    this.cards = [];
    this.container = new PIXI.Container();
    cards.forEach(function(value, index) {
	this.addCard(value);
    }.bind(this));
}
zone.prototype.removeCardsOutsideArea = function (x,y,w,h){
    var cardsTaken = [];
    for (var i = 0; i < this.cards.length; i++){
	if ((this.cards[i].container.position.x < x | this.cards[i].container.position.x > x + w) | (this.cards[i].container.position.y < y | this.cards[i].container.position.y > y + h)){
	    cardsTaken.push(this.cards.splice(i,1));
	    this.container.removeChild(cardsTaken[cardsTaken.length-1]);
	}
    }
    return cardsTaken;
}
zone.prototype.removeCardsInsideArea = function (x,y,w,h){
    var cardsTaken = [];
    for (var i = 0; i < this.cards.length; i++){
	if (!((this.cards[i].container.position.x < x | this.cards[i].container.position.x > x + w) | (this.cards[i].container.position.y < y | this.cards[i].container.position.y > y + h))){
	    cardsTaken.push(this.cards.splice(i,1));
	    this.container.removeChild(cardsTaken[cardsTaken.length-1]);
	}
    }
    return cardsTaken;
}


zone.prototype.addCard = function (card){
    this.cards.push(card);
    this.container.addChild(card.container);
}

zone.prototype.popCard = function (){
    var card = this.cards.pop();
    this.container.removeChild(card.container);
    return card;
}
zone.prototype.findCard = function (name){
    for (var i = 0; i < this.cards.length; i++){
	if (this.cards[i].name == name){
	    return this.cards[i];
	}
    }
}
zone.prototype.findCardIndex = function (name){
    for (var i = 0; i < this.cards.length; i++){
	if (this.cards[i].name == name){
	    return i;
	}
    }
}

zone.prototype.delCard = function (name){
    var card =  this.cards.splice(this.findCardIndex(name),1)
    this.container.removeChild(card.container);
    return card;
}
