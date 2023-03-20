module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    const number = Math.floor(Math.random() * 15);
    if (number === 0) message.reply("who asked?");
  },
};
