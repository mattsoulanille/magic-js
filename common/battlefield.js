'use strict'

function battlefield(cards) {
    zone.call(this,cards);
    for (var i = 0; i < this.cards.length; i++){
	this.cards[i].draggable = true;
    }
}

battlefield.prototype = new zone;

battlefield.prototype.animate = function (){
    //do nothing, no animations needed, cards will sit where they lie, players enforce rules, the battlefield acts like a tabletop
}

