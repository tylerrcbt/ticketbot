const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(message.content.startsWith("-removeuser"))
    {
        //Role access to remove users from tickets.
        if(!message.member.roles.find('name', "StaffRoleName")) return message.channel.send({embed: {color: 0x030056, fields: [{name: 'Access Denind', value: `Error: you don't have enough permissions. ${message.author}`}], footer: {text: "Powered by tylerr#4047(niso)"}}})

        let user = message.mentions.members.first()

        message.channel.overwritePermissions(user.id, {'VIEW_CHANNEL': false, 'SEND_MESSAGES': false})

        message.channel.send({embed: {color: 0x030056, fields: [{name: 'User Removed', value: `Successfully removed ${message.mentions.members.first()} from this ticket.`}], footer: {text: "Powered by tylerr#4047(niso)"}}})
    }
}

module.exports.help = {
    name: "removeuser",
}