"use strict"

const client = require("./client");
const db = require("../firebase").database();

async function addDefaultRole(member, guild) {
    const user = guild.members.cache.find((m) => m.user.tag === member.tag);
    await db.ref("defaults/roles").once('value', async (snapshot) => {
        for (const role of snapshot.val()) {
            if (role.guild_id == guild.id && !member.bot) {
                const guildRole = guild.roles.cache.find(r => r.id === role.role_id);
                if (typeof guildRole !== 'undefined') {
                    user.roles.add(guildRole);
                    console.log(`Role [${guildRole.name}] has been successfully added to user: ${member.tag}`)
                }
            }
        }
    })
}

async function assignRole(member, guild, roleId) {
    const guildRole = guild.roles.cache.find(r => r.id === roleId);

    if (typeof guildRole !== 'undefined') {
        await member.roles.add(guildRole);
        console.log(`User [${member.nickname}] has been assigned the role []`)
    }
}

async function unassignRole(member, guild, roleId) {
    const guildRole = guild.roles.cache.find(r => r.id === roleId);

    if (typeof guildRole !== 'undefined') {
        await member.roles.remove(guildRole);
        console.log(`User [${member.nickname}] has been unassigned the role []`)
    }
}


module.exports = {
    addDefaultRole,
    assignRole,
    unassignRole
}