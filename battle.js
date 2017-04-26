var bot = process.DiscordBot;
var p = require("./pokemon.json");
var m = require("./moves.json")
//var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz0123456789-_";
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
	//    for(i=0; i < 18; i++) {
	//      var j = random(b64.length);
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
		// console.log(this.pokemon[0]);
		// console.log(this.pokemon[1]);
		// console.log(this.pokemon[2]);
		this.currentPoke = 0;
		this.userID = user;
	}
	update() {}

}

// Replaces Math.random() and uses an argument array
// 0 args: between 0 and 1 by default
// 1 arg: 0 and arg-1
// 2 args: min and max-1 
// This is a [min, max) in inequality notation. so random(256) → 0-255
function random() {
	var min, max, num = 0;
	if (arguments.length == 1) {
		max = arguments[0];
		min = 0;
	} else if (arguments.length == 2) {
		min = arguments[0];
		max = arguments[1];
	} else {
		return Math.random();
	}

	num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}

class Pokemon {
	
	constructor() {
		this.moveSet = new Array(4);
		this.pIndex = random(p.pokemon.length);
		console.log(this.pIndex); // THANK YOU DANIEL SHIFFMAN. I FORGOT THE THIS DOT
		if(this.pIndex >= 142) { // Make legendary Pokemon rare to get
			var q = random(256);
			var thresh = random(256);
			if(thresh > q) {
				this.pIndex = random(p.pokemon.length);
			}
		}
		//console.log(pIndex);
		this.name = p.pokemon[this.pIndex].name;
		this.isFainted = false;
		this.status = null;
		this.attIV = random(16);
		//console.log("this.attIV = " + this.attIV);
		this.defIV = random(16);
		//console.log("this.defIV = " + this.defIV);
		this.specIV = random(16);
		//console.log("this.specIV = " + this.specIV);
		this.speedIV = random(16);
		//console.log("this.speedIV = " + this.speedIV);

		this.level =random(20,36);
		//console.log("this.level = " + this.level);

		this.hpIV = this.calcHealthIV();
		//console.log("this.healthIV = " + this.hpIV);
		// This could use cleanup. Idk how
		this.hp = this.getHealthVal(this.level, this.hpIV, p.pokemon[this.pIndex].stats.hp);
		this.defense = this.getStatVal(this.level, this.defIV, p.pokemon[this.pIndex].stats.defense);
		this.attack = this.getStatVal(this.level, this.attIV, p.pokemon[this.pIndex].stats.attack);
		this.specatt = this.getStatVal(this.level, this.specIV, p.pokemon[this.pIndex].stats.special_attack);
		this.specdef = this.getStatVal(this.level, this.specIV, p.pokemon[this.pIndex].stats.special_defense);
		this.speed = this.getStatVal(this.level, this.speedIV, p.pokemon[this.pIndex].stats.speed);
		this.getMoveSet();
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

	// ---Commented out for right now because Moves.json isn't done

	getMoveSet() {
		var i = 0;
		var moveIndex = 0;
		while(i < this.moveSet.length) {
			// I know I need to pick a random move however, I can't pick the same move twice.
			// random() is a self made function to make Math.random() easier to work with
			// Each pokemon has a list of moves they can use when levelled up to the highest move they can learn
			// Ekans has 7 moves it can learn. I want to pick 4 of the 7 (the numbers are the indices of the moves in the moves.json)
			// so I need to create an array of move indices to make sure they aren't picked twice?
			var mIndex = p.pokemon[this.pIndex].moves[moveIndex]; //Makes it easier to reference a move
			var mLength = p.pokemon[this.pIndex].moves.length; // References the length of a pokemon's moveset array
			moveIndex = random(mLength); //get a random index from current pokemon moves array
			if (this.moveSet.indexOf() == -1) { // If index isn't already in array, add it. Skip it if otherwise
				//this.moveSet[i] = mIndex; // Just store the index for now.
				this.moveSet[i] = new Move(moveIndex);
				
				//console.log(mindex);
				i += 1; // increment counter only if adding move is successful
			}
			// this gives the respective index a Move Object, written below
		  
		}
		console.log(this.moveSet);
	}
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
