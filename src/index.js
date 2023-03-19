require("dotenv").config()
const { Client, IntentsBitField } = require('discord.js');

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

bot.on('ready', (client) => {
    console.log(`${client.user.tag} is online.`)
})

bot.on('guildMemberAdd', (member) => {
    console.log(`${member.user.tag} joined the server.`)
    bot.channels.fetch(member.guild.systemChannelId)
        .then(channel => channel.send(`${member.user} joined the server.`))


})

bot.on('messageCreate', message => {
    if(message.author.bot){
        return
    }
    if(message.content == "purge"){
        message.channel.bulkDelete(100)
    }
})

bot.login(process.env.TOKEN);