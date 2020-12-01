"use strict"
const client = require("../client");
const { assignRole, unassignRole } = require('../roles');

client.on('message', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('*initiate'))
        await assignRole(message.member, message.guild, '775617736960114709');
        await unassignRole(message.member, message.guild, '778904695967449109');
})