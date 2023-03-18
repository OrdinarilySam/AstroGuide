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

bot.login(process.env.TOKEN);