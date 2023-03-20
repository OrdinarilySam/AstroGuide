module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const role = await member.guild.roles.fetch("1087035645605720165");
    member.roles.add(role);
  },
};
