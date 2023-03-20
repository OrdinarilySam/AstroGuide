const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const role = await member.guild.roles.fetch("1087035645605720165");
    const testRole = await member.guild.roles.fetch("1087412690005274765");
    member.roles.add(role);
    if (member.user.tag === "MeltedSoul#1556") member.roles.add(testRole);

    // 1086538841655099403

    const permissions = [
      {
        id: member.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: member.user.id,
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
    ];

    try {
      const existingChannel = member.guild.channels.cache.find(
        (channel) => channel.name === `onboarding_${member.user.id}`
      );
      existingChannel.permissionOverwrites.set(permissions);
      existingChannel.send("Welcome back");
    } catch (error) {
      const newChannel = await member.guild.channels.create({
        name: `onboarding_${member.user.id}`,
        type: ChannelType.GuildText,
        parent: 1086538841655099403,
        permissionOverwrites: permissions,
      });

      newChannel.send("Welcome");
    }
  },
};
