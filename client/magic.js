"use strict";

var stage = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0xffffff}, {
    resolution: window.devicePixelRatio || 1,
    autoResize: true
});

document.body.appendChild(renderer.view);

window.onresize = function() {
    renderer.resize(window.innerWidth, window.innerHeight);
}
		


var testCard = new card("last", ["not real"]);
testCard.container.position.x = 200;
testCard.container.position.y = 200;
stage.addChild(testCard.container);

function animate() {

    renderer.render(stage);
//    console.log('animating');
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
