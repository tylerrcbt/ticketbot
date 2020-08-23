const Discord = require('discord.js');

const fs = require('fs');

const bot = new Discord.Client({disableEveryone: false})

bot.commands = new Discord.Collection();

//Events handler.
require("./util/eventHandler")(bot);
fs.readdir("./events/",(err, files) => {
    if(err) console.log(err);

    let eventFile = files.filter(f => f.split(".").pop() === "js")

    if(eventFile.length <= 0){
        console.log("Couldn't find events.");
    }
    eventFile.forEach((f, i) => {
        console.log(`${f} events loaded!`);
    });
});

//Commands handler.
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0)
    {
        console.log("Couldn't find any command.");
        return
    }
    jsfile.forEach((f, i) => {
        let props = require("./commands/" + f);
        console.log(f + " loaded!");
        bot.commands.set(props.help.name, props);
    });
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = "/";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
})

//Bot Details [token]
bot.login("");