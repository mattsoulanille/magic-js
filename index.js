//"use strict";
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var UUID = require('node-uuid');
var _ = require("underscore");
var Promise = require("bluebird");
// var fs = require('fs'),
//     PNG = require('pngjs').PNG;

var repl = require("repl");

var test = function() {
    return "did a test"
}

var local = repl.start();

local.context.io = io;

local.context.help = function() {
    console.log("Available commands:\n" +
	    "help()\tprints this help\n" + 
	    "list()\tlists players\n" +
	    "kick(uuid)\tkicks a player by uuid"
	       );

}

// lists players
local.context.list = function() {
    var formatted = {}
    _.each(players, function(p, key) {
	formatted[key] = {"ship":p.ship.name};
    });
    return formatted;
}

// kicks a player
var kick = function(UUID) {
    if (_.includes(Object.keys(players), UUID)) {
	players[UUID].io.disconnect();
    }

}

local.context.kick = kick;
local.context.test = test;

var gameTimeout;
var gameloop = function(system) {

    gameTimeout = setTimeout(function() {gameloop(system)}, 0);
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname))

var playercount = 0;
var players = {};
local.context.players = players;

io.on('connection', function(client){

    var userid = UUID();
    var owned_uuids = [userid];

    players[userid] = {"io":client};
    playercount = _.keys(players).length;

    console.log('a user connected. ' + playercount + " playing.");
    
    client.on('updateStats', function(stats) {
	var filtered_stats = {};
//	console.log(stats)
	_.each(stats, function(newStats, uuid) {
	    if (_.contains(owned_uuids, uuid)) {

		filtered_stats[uuid] = newStats;
	    }
	    else {
		console.log("client tried to change something it didn't own");
		console.log("Owned uuids: " + owned_uuids);
		console.log("Tried to change: " + uuid);
	    }

	});
	
	client.broadcast.emit('updateStats', filtered_stats);
    });

    client.on("test", function(data) {
	receives ++;
	console.log("test:");
	console.log(data);
    });
    
    
    client.on('pingTime', function(msg) {
	receives ++;
    	var response = {};
    	if (msg.hasOwnProperty('time')) {
    	    response.clientTime = msg.time;
    	    response.serverTime = new Date().getTime();
    	    client.emit('pongTime', response);
	    transmits ++;
    	}
    });

    client.on('getMissingObjects', function(missing) {
	var toSend = {};
	_.each(missing, function(uuid) {
	    if (currentSystem.multiplayer.hasOwnProperty(uuid)) {
//		console.log("Sending missing object: "+uuid);
		toSend[uuid] = currentSystem.multiplayer[uuid].buildInfo;
	    }
	    else {
		console.log("player " + userid + " requested nonexistant object " + uuid);
	    }
	});

	client.emit('addObjects', toSend);
    });

    client.on('disconnect', function() {
	receives ++;
	client.broadcast.emit('removeObjects', owned_uuids)

	delete players[userid];
	console.log('a user disconnected. ' + _.keys(players).length + " playing.");
    });
});




var port = 8000;
http.listen(port, function(){
    console.log('listening on *:'+port);
});
