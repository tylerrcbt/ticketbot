const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(message.content.startsWith("-new") && message.channel.id === "open-ticket") //Any channel you want to be default for createing tickts.
    {
        //Your Discord Server ID.
        const guild = bot.guilds.get("Your Discord server ID");

        //LogoURL Shortcut.
        const LogoURL = "https://i.imgur.com/jBfkR8t.jpg";

        if(message.guild.channels.exists('name', "ticket-" + message.author.username)) return message.reply("Sorry, you already have opened a ticket!");

        let args2 = message.content.slice(5).trim().split(' ')

        const reason = args2.join(" ");

        if(!reason) return message.reply("You must specify a reason to create a support ticket!");

        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            const Category = message.guild.channels.find(c => c.name == "Tickets" && c.type == "category"); // c.name =  Category name.
            if(!Category) console.info(`Couldn't find ${c.name}.`);
            c.setParent(Category.id);

            //Roles actions.
            let staff = guild.roles.find('name', "Example"); //Staff role name to see the support tickets.
            let everyone = guild.roles.find('name', "@everyone");

            c.overwritePermissions( staff, { SEND_MESSAGES: true, READ_MESSAGES: true});
            c.overwritePermissions( everyone, { SEND_MESSAGES: false, READ_MESSAGES: false});
            c.overwritePermissions( message.author, { SEND_MESSAGES: true, READ_MESSAGES: true});
            
            message.reply("Your ticket has been created!");

            message.author.send({embed: {color: 0x030056, author: {name: 'Tickets', icon_url: LogoURL},
            description: `Hey, ${message.author}\nYour support ticket has been created\n\nTicket: \`ticket-${message.author.username}\`\ \nServername: \`${message.guild.name}\`\ \nYou must follow server rules.`,
            thumbnail: {url: LogoURL}, timestamp: new Date(), footer: {text: 'Powered by tylerr#4047(niso)'}}});

            //Logs channel finder.
            const Logs = guild.channels.find('name', 'tickets-logs');
            if(!Logs) return;

            Logs.send({embed: {color: 0x030056, author: {name: 'Ticket Created', icon_url: 'https://cdn.discordapp.com/emojis/274790281189130242.png?v=1'},
            description: `Created by: \`${message.author.tag}\`\ \nReason: \`${reason}\`\ \nUserid: \`${message.author.id}\`\ \nTicket: \`ticket-${message.author.id}\`\ `,
            thumbnail: {url: LogoURL}, timestamp: new Date(), footer: {text: 'Powered by tylerr#4047(niso)'}}});

            c.send({embed: {color: 0x030056, author: {name: `Hey, ${message.author.tag}`},
            description: `Support ticket created you must wait for Staff team.`,
            thumbnail: {url: LogoURL},
            fields: [{name: 'Ticket reason', value: reason, inline: false}], timestamp: new Date(), footer: {text: 'Powered by tylerr#4047(niso)'}}})
        })
    }
}

module.exports.help = {
    name: 'new'
}