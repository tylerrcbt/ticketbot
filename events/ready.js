module.exports = async (bot) => {
    console.log(`Bot is ready! Username: ${bot.user.username}#${bot.user.discriminator}`);

    bot.user.setActivity("Loading data...");

    setInterval(async() => {
        await bot.user.setActivity(`${bot.guilds.size} servers | /help`, {type: 'Watching'});
    });
}