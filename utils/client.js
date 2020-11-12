require("dotenv").config();
const Discord = require("discord.js");

/* Setup Discord.js client */
const TOKEN = process.env.TOKEN;
const client = new Discord.Client();

client.login(TOKEN);
client.on("ready", () => {
    console.log(`Overseer bot online, started on [${new Date()}]`)
});

module.exports = client