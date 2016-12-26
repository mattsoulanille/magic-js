'use strict'


function card(name,types) {
    this.counters = [];
    this.name = name;
    this.tapped = false;
    this.types = types
    this.flipped = false;
}

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
