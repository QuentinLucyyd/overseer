"use strict"
const client = require("../client");

/*
'id' => {
    msgCount: 0,
    prevMessage: 'message',
    warn: false,
    timer: fn();
*/

const spamMap = new Map();
client.on('message', (message) => {
   if (message.author.bot) return;

   if (spamMap.has(message.author.id)) {
       const userData = spamMap.get(message.author.id);
       let count = userData.msgCount;

       if (parseInt(count) > 4 && userData.warn === false) {
           userData.warn = true;
           spamMap.set(message.author.id, userData);

           const channel = message.guild.channels.cache.get(message.channel.id);
           channel.send(`<@${message.author.id}>, please don't spam the channels`);
       } else {
           count++;
           userData.msgCount = count;
           spamMap.set(message.author.id, userData);
       }
   } else {
       spamMap.set(message.author.id, {
          msgCount: 1,
          prevMessage: message,
          timer: null
       });
       setTimeout(() => {
           spamMap.delete(message.author.id);
           console.log(`User ${message.author.username} has been removed from the spam map`);
       }, 5000);
   }
});