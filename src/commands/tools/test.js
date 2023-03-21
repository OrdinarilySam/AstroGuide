const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Tests the current feature.'),
  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true
    });

    const newData = {
      1234: {
        messages: {
          1234: [123, 123]
        }
      }
    }
    client.writeJSON(newData)
    
    await interaction.editReply({
      content: "Check logs",
    })
  }
}