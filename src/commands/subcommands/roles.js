const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Everything to do with reaction roles')
    .addSubcommand(subcommand => 
      subcommand
        .setName('start')
        .setDescription('Starts the reaction role process'))
    .addSubcommand(subcommand => 
      subcommand
        .setName("add")
        .setDescription("Adds a role"))
    .addSubcommand(subcommand => 
      subcommand
        .setName("remove")
        .setDescription("Removes a role")),
  async execute(interaction, client) {

    switch(interaction.options.getSubcommand()){
      case "start": 

        break;
      case "add":
        
        break;
      case "remove":
        
        break;
      default:
        break;
    }
  }
}