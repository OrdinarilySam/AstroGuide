const { SlashCommandBuilder } = require('discord.js')
const fs = require("fs")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chimein')
    .setDescription('Everything to do with chimein')
    .addSubcommand(subcommand => 
      subcommand
        .setName('start')
        .setDescription('Creates a channel for your chimin'))
    .addSubcommand(subcommand => 
      subcommand
        .setName('close')
        .setDescription('Deletes your chimein channel')),
  async execute(interaction, client) {

    const role = await interaction.guild.roles.cache.find(
      (role) => role.name === `ChimeIn`
    )

    if(!role){
      const newRole = await interaction.guild.roles.create({name: "ChimeIn"})
      await interaction.reply({content: `Role didn't exist, it has been created: ${newRole}`, ephemeral: true})
      return;
    }

    if(!interaction.member.roles.cache.has(role.id)){
      await interaction.reply({content: "You don't have the proper permissions for that", ephemeral: true})
      return;
    }

    const subcommands = {}
    const subcommandFiles = fs.readdirSync("./src/commands/chimein/subcommands").filter(file => file.endsWith(".js"))
    subcommandFiles.forEach(subcommand => {
      subcommands[subcommand.slice(0, -3)] = require(`./subcommands/${subcommand}`)
    })

    try{
      subcommands[interaction.options.getSubcommand()](interaction)
    }catch (error) {
      await interaction.reply({content: "Something went wrong...", ephemeral: true})
    }
  }
}