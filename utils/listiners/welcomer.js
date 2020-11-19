"use strict"
const client = require("../client");
const { MessageAttachment } = require('discord.js')
const { getWelcomeCard } = require('../canvas');
const { addDefaultRole } = require('../roles');

//Firebase database reference for channel defaults
const db = require("../../firebase").database();

client.on('guildMemberAdd', async (member) => {
    await db.ref("defaults/welcome").once('value', async (snapshot) => {
        for (const item of snapshot.val()) {
            if (item.guild_id == member.guild.id) {
                const card = await getWelcomeCard(member, member.guild);
                const attachment = new MessageAttachment(card);
                const channel = member.guild.channels.cache.get(item.channel_id);

                await addDefaultRole(member.user, member.guild);
                channel.send(`Welcome to the ***DeathMark 2.0*** ${member.user.toString()}. \n` +
                    '- If this is your first time here, Yaay :smile: \n' +
                    '- If this is not your first time here, Welcome back :) The original server got deleted due to some oopsies (we do not speak of the oopsies) :expressionless: \n', attachment);
            }
        }
    }, err => {
        console.log(err);
    });
})