"use strict"
const client = require("../client");
const cron = require('node-cron');
const helpers = require("../helpers");

//Firebase database reference for channel defaults
const db = require("../../firebase").database();

const dailycron = cron.schedule('0 0 0 * * *', () => {
    db.ref("defaults/daily").once('value', (snapshot) => {
        for (const item of snapshot.val()) {
            client.guilds.fetch(item.guild_id).then(guild => {
                guild.channels.cache.get(item.channel_id).setName(`☀ ${helpers.getDay()} Session`).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        }
    })
});

module.exports = {
    dailycron
};