'use strict'

function counter(initialValue,Name) {
    this.value = initialValue;
    this.name = Name;
}

counter.prototype.inc = function(){
    this.value += 1;
}
counter.prototype.dec = function(){
    this.value -= 1;
}
