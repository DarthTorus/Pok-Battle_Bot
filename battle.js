var bot = process.DiscordBot;
var p = require("./pokemon.json");
var m = require("./moves.json")
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz0123456789-_";
class Battle {
	constructor(user1, user2, cID) {
		this.players = [new Player(user1), new Player(user2)];
		this.chID = cID;
	}
	endBattle() {

	}

	startBattle() {

	}

	//IF move.category == "status", then don't calculate Damage. Go into status calculation


	//  this.generateID = function() {
	//    var idText = "";
	//    for(i=0; i< 18; i++) {
	//      var j = Math.floor(Math.random()*b64.length);
	//      idText += b64[j];
	//    }
	//   this.idString = idText;
	// };
	//
	// this.generateID();
	checkStatus() {}
}

class Player {
	constructor(user) {
		this.pokemon = [new Pokemon(), new Pokemon(), new Pokemon()];
		console.log(this.pokemon[0]);
		console.log(this.pokemon[1]);
		console.log(this.pokemon[2]);
		this.currentPoke = 0;
		this.userID = user;
	}
	update() {}

}

class Pokemon {
	constructor() {
		var pIndex = Math.floor(Math.random() * p.pokemon.length);
		//console.log(pIndex);
		this.name = p.pokemon[pIndex].name;
		this.isFainted = false;
		this.attIV = Math.floor(Math.random() * 16);
		//console.log("this.attIV = " + this.attIV);
		this.defIV = Math.floor(Math.random() * 16);
		//console.log("this.defIV = " + this.defIV);
		this.specIV = Math.floor(Math.random() * 16);
		//console.log("this.specIV = " + this.specIV);
		this.speedIV = Math.floor(Math.random() * 16);
		//console.log("this.speedIV = " + this.speedIV);

		this.level = Math.floor(Math.random() * 15) + 20;
		//console.log("this.level = " + this.level);

		this.hpIV = this.calcHealthIV();
		//console.log("this.healthIV = " + this.hpIV);
		this.hp = this.getHealthVal(this.level, this.hpIV, p.pokemon[pIndex].stats.hp);
		this.defense = this.getStatVal(this.level, this.defIV, p.pokemon[pIndex].stats.defense);
		this.attack = this.getStatVal(this.level, this.attIV, p.pokemon[pIndex].stats.attack);
		this.specatt = this.getStatVal(this.level, this.specIV, p.pokemon[pIndex].stats.special_attack);
		this.specdef = this.getStatVal(this.level, this.specIV, p.pokemon[pIndex].stats.special_defense);
		this.speed = this.getStatVal(this.level, this.speedIV, p.pokemon[pIndex].stats.speed);
	}
	calcHealthIV() {
		//console.log("got to calcHealthIV()");
		var hIV = 0;
		if (this.attIV % 2 == 1) {
			hIV += 8;
		}
		if (this.defIV % 2 == 1) {
			hIV += 4;
		}
		if (this.specIV % 2 == 1) {
			hIV += 2;
		}
		if (this.speedIV % 2 == 1) {
			hIV += 1;
		}
		//console.log("hIV = " + hIV);
		return hIV;
	}

	getStatVal(level, iv, base) {
		var stat = 0;

		stat = (base + iv);
		stat *= 2;
		stat += Math.floor(Math.ceil(Math.sqrt(0)) / 4);
		stat *= level;
		stat = Math.floor(stat / 100);
		stat += (level + 10);

		return stat;
	}

	getHealthVal(level, iv, base) {
		var stat = 0;

		stat = (base + iv);
		stat *= 2;
		stat += Math.floor(Math.ceil(Math.sqrt(0)) / 4);
		stat *= level;
		stat = Math.floor(stat / 100);
		stat += 5;

		return stat;
	}

	// this.moves = new Array(4);
	// for (var i = 0; i < 4; i++) {
	// 	var moveIndex = Math.floor(Math.random() * p.pokemon[pIndex].moves.length);
	// 	console.log(p.pokemon[pIndex].moves[moveIndex])
	// 	this.moves[i] = new Move(p.pokemon[pIndex].moves[moveIndex]);
	//   //console.log(m.moves[moveIndex]);
	// }

}

class Move {
	constructor(mIndex) {
		this.name = m.moves[mIndex].name;
		this.mIndex = mIndex;
		this.pp = m.moves[mIndex].pp;
		this.power = m.moves[mIndex].power;
		this.accuracy = m.moves[mIndex].accuracy;
		this.type = m.moves[mIndex].type;
	}
}

class Potions {
	constructor() {
		this.healthBoost = 20;
	}
}


var battleObj = {
	Battle: Battle
};
module.exports = battleObj;
