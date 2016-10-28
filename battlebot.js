/*Variable area*/
var config = require("./config.json"); // Must be first because it is the settings for most of below
var Discordbot = require('discord.io');
var bot = new Discordbot.Client({
  token: config.token,
  autorun: true
});
const trigger = ">>>poke";
const fs = require('fs');
const request = require('request');
var colors = require('colors/safe');
var battle = require("./battle.js");
const botVersion = 0.5 // Will change to 1.0 upon release
//var battleStarted = false;
//
//bot.battleStarted = battleStarted;
bot.trigger = trigger;
bot.request = request;
bot.fs = fs;

bot.on("ready", function(rawEvent) {
  quitStatus = false;
  console.log(colors.gray("Connected!"));
  console.log(colors.cyan("Logged in as: " + bot.username + " - (" + bot.id + ")"));
});

bot.on("disconnect", function(rawEvent){

});

bot.on("message", function(user, userID, channelID, message, rawEvent){
  var serverName = "";
  var serverID = 0;
  if(!(channelID in bot.directMessages)){
    serverID = bot.channels[channelID].guild_id;
  }

  var channelName = "";
  var command = message.split(" ");
  var cmnd = command[0];
  //console.log(trigger.length);
  var triggerCheck = cmnd.substring(0,trigger.length);
  var mainCmnd = cmnd.substring(trigger.length, cmnd.length).toLowerCase();
  command.shift();

  var msgID = rawEvent.d.id; //For future reference?
  var serverName, channelName;
  if(!(channelID in bot.directMessages)){
    for (var i in bot.servers) {
      if (i == bot.channels[channelID].guild_id) {
        serverName = bot.servers[i].name;
        channelName = bot.servers[i].channels[channelID].name
      }
    }
  } else {
    serverName = "Direct Message";
    channelName = user;
  }
  if(triggerCheck == trigger || userID === bot.id) {
    message = command.join(" ");

    if(triggerCheck == trigger) {

      // // if(bot.battleStarted) {
      // //   battle.checkStatus();
      // // }
      // else{
        var msg = message.split(' ');
        console.log(msg);
        if(msg[0] == "start") {
          var bat = new battle.Battle(msg[1], msg[2], channelID);
          bat.startBattle();
          bot.battleStarted = true;
          console.log(bat);
      //  }
      // Do other commands
      }

    }
  }
});
