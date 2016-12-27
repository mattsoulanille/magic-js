"use strict";

var stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,
				       {backgroundColor : 0xffffff,
					resolution: window.devicePixelRatio || 1,
					autoResize: true
});

document.body.appendChild(renderer.view);

window.onresize = function() {
    renderer.resize(window.innerWidth, window.innerHeight);
}

var loadJSON = function(url) {
    return new Promise(function(fulfill, reject) {
    var loader = new PIXI.loaders.Loader();
    var data;
    loader
	.add(url)
	.load(function(loader, resource) {
	    data = resource[url].data;
	})
	.once('complete', function() {fulfill(data)} );
    });
}


var cards;
var lib1;
var hand1;
loadJSON('images/manifest.json')
    .then(function(data) {cards = data.cards})
    .then(function() {
	var loadedCards = cards.map( function(value, index) {
	    return new card(value, []);
	});

	lib1 = new library(loadedCards);
	stage.addChild(lib1.container);
	lib1.shuffle();
	lib1.animate(300,300);
	hand1 = new hand(lib1.draw(7));
	stage.addChild(hand1.container);
	hand1.animate(0,400,1000,200,-1,true,[]);
    })
    .then(function() {requestAnimationFrame(animate)});

//var all = 


var testCard = new card("last", ["not real"]);
testCard.container.position.x = 200;
testCard.container.position.y = 200;
stage.addChild(testCard.container);

function animate() {

    renderer.render(stage);
//    console.log('animating');
    requestAnimationFrame(animate);
}


