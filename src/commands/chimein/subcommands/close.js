module.exports = async (interaction) => {
    try{
      const channel = await interaction.guild.channels.cache.find(
        (channel) => channel.name === `chimein_${interaction.user.id}`)
      await channel.delete(`${interaction.user.tag} closed their chimein`)
      try {
        await interaction.reply({content: "Channel deleted", ephemeral: true})
      } catch (error) {
        await interaction.user.send("Your channel has been deleted")
      }
    }catch (error) {
      await interaction.reply({content: "You don't have a chime in channel", ephemeral: true})
    }
}