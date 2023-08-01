require("../index");

const Discord = require("discord.js");
const client = require("../index");

client.on("ready", (client) => {
  console.log(`Logado, segurança verificada é confirmada, pronto para uso :D`);
  client.user.setActivity('© Made widh RoniereMarques', { type: Discord.ActivityType.Playing });
});