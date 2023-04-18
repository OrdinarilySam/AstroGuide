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
    await interaction.deferReply({ ephemeral: true })
    let findChannel
    try {
      const existingChannel = interaction.guild.channels.cache.find(
        (channel) => channel.name === `chimein_${interaction.user.id}`
      );
      existingChannel.permissionOverwrites.set(permissions);
      findChannel = existingChannel;
  
    } catch (error) {
      let category
      try {
        category = interaction.guild.channels.cache.find(
          (channel) => channel.name === `chime-ins`
        );
      } catch (error) {
        let role = await interaction.guild.roles.cache.find(
          (role) => role.name === `ChimeIn`
        )
    
        if(!role){
          role = await interaction.guild.roles.create({name: "ChimeIn"})
        }
        category = await interaction.guild.channels.create({
          name: "chime-ins",
          type: ChannelType.GuildCategory,
          position: 0,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [PermissionsBitField.ViewChannel]
            },
            {
              id: role.id,
              allow: [
                PermissionsBitField.ViewChannel, 
                PermissionsBitField.SendMessages,
                PermissionsBitField.ReadMessageHistory]
            }
          ]

        })
      }
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
      const whMessage = await webhook.send({content: `\`${webhook.url}\``, files: [{attachment: "src/files/c31b8f1fae9a464da134-2.0.xpi", name: "firefox_extension.xpi"}]})
      await whMessage.pin()
    }
    await interaction.editReply({content: `${findChannel}`, ephemeral: true })
}