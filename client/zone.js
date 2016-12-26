'use strict'


function zone(cards) {
    this.cards = cards;
}

zone.prototype.addCard = function (card){
    this.cards.push(card);
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
    return this.cards.splice(this.findCardIndex(name),1)
}
