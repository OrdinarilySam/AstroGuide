const { PermissionsBitField, ChannelType } = require("discord.js")

module.exports = async (interaction) => {
    const permissions = [
      {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: interaction.user.id,
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
    ];
    let findChannel
    try {
      const existingChannel = interaction.guild.channels.cache.find(
        (channel) => channel.name === `chimein_${interaction.user.id}`
      );
      existingChannel.permissionOverwrites.set(permissions);
      findChannel = existingChannel;
  
    } catch (error) {
      const category = interaction.guild.channels.cache.find(
        (channel) => channel.name === `chime-ins`
      );
      const newChannel = await interaction.guild.channels.create({
        name: `chimein_${interaction.user.id}`,
        type: ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: permissions,
      });
      findChannel = newChannel
      const webhook = await interaction.guild.channels.createWebhook({
        channel: findChannel.id,
        name: `ChimeIn ${interaction.user.id}`,
        avatar: `https://i.imgur.com/gIR3Vcm.png`,
        reason: `New webhook for ${interaction.user.tag}`
      })
      webhook.send(`\`${webhook.url}\``, )
      webhook.send({files: [{attachment: "src/files/c31b8f1fae9a464da134-2.0.xpi", name: "extension.xpi"}]})
    }
    await interaction.reply({content: `${findChannel}`, ephemeral: true })
}