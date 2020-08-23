const Discord = require('discord.js');

module.exports.run = async (bot, message, args ) => {

    if(message.content.startsWith("-adduser"))
    {
        //Role access for adding users to tickets.
        if(!message.member.roles.find('name', "StaffRoleName")) return message.channel.send({embed: {color: 0x030056, fields: [{name: 'Access Denind', value: `Error: you don't have enough permissions. ${message.author}`}], footer: {text: "Powered by tylerr#4047(niso)"}}})
        
        let user = message.mentions.members.first()

        if(!user) return message.reply("Please, tag user");

        message.channel.overwritePermissions(user.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true})
        
        message.channel.send({embed: {color: 0x030056, fields: [{name: 'User added', value: `Successfully added ${message.mentions.members.first()} to this ticket.`}], footer: {text: "Powered by tylerr#4047(niso)"}}})
    }
}

module.exports.help = {
    name: "adduser",
}