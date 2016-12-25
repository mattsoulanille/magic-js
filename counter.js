'use strict'

function counter(initialValue,Name) {
    this.value = initialValue;
    this.name = Name;
}

counter.prototype.inc(){
    this.value += 1;
}
counter.prototype.dec(){
    this.value -= 1;
}
