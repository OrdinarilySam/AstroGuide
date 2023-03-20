const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Returns an embed about the bot.'),
  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true
    });

    //<@560869616495231015>
    const owner = await interaction.guild.fetchOwner()

    const embed = new EmbedBuilder()
      .setTitle("About")
      .setDescription("Simple bot with limited functionality.")
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(interaction.guild.iconURL())
      .setAuthor({
        name: owner.user.tag,
        iconURL: owner.displayAvatarURL()
      })
      .setColor(000000)

    await interaction.editReply({
      embeds: [embed]
    })
  }
}