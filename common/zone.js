'use strict'


function zone(cards) {
    this.cards = cards;
    this.container = new PIXI.Container();
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
