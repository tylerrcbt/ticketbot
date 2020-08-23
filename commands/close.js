const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(message.content.startsWith("-close"))
    {
        //Your Discord Server ID.
        const guild = bot.guilds.get("Your Discord server id");

        //LogoURL Shortcut.
        const LogoURL = "https://i.imgur.com/jBfkR8t.jpg";

        //Role access to clone tickets.
        if(!message.member.roles.exists('name', "RoleName")) return message.reply("Sorry, you don't have enough permissions.");

        //Delete only tickets.
        if(!message.channel.name.startsWith('ticket-')) return message.reply('You can use this cmd only on tickets.');

        let args2 = message.content.slice(7).trim().split(' ');

        const reason = args2.join(" ");

        //Each Staff member must specify a reason to close tickets.
        if(!reason) return message.reply({embed: {color: 0x030056, fields: [{name: 'Ticket Status', value: `יש לציין סיבה כדי לסגור כרטיס תמיכה.`}], timestamp: new Date(), footer: {text: 'Powered by tylerr#4047(niso)'}}});

        //Tickets-logs channel name
        const Logs = guild.channels.find('name', "tickets-logs");
        if(!Logs) return;

        Logs.send({embed: {color: 0x030056, author: {name: 'Ticket Closed', icon_url: 'https://cdn.discordapp.com/emojis/274790281277079552.png?v=1'},
        description: `Closed by: \`${message.author.tag}\`\ \nReason: \`${reason}\`\ \nAdmin-id: \`${message.author.id}\`\ \nTicket closed: \`ticket-${message.author.id}\`\ `,
        thumbnail: {url: LogoURL}, timestamp: new Date(), footer: {text: 'Powered by tylerr#4047(niso)'}}});
        message.channel.send({embed: {color: 0x030056, fields: [{name: 'Ticket Status', value: `status changed: close in **10 seconds** | **${reason}**`}], timestamp: new Date(), footer: {text: 'Powered by tylerr#4047(niso)'}}});

        setTimeout(function(){
            message.channel.delete();
        }, 10000);
    }
}

module.exports.help = {
    name: 'close'
}