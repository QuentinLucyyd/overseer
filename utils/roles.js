"use strict"

const client = require("./client");
const db = require("../firebase").database();

async function addDefaultRole(member, guild) {
    const user = guild.members.cache.find((m) => m.user.tag === member.tag);
    await db.ref("defaults/roles").once('value', async (snapshot) => {
        for (const role of snapshot.val()) {
            if (role.guild_id == guild.id) {
                const guildRole = guild.roles.cache.find(r => r.id === role.role_id);
                if (typeof guildRole !== 'undefined') {
                    user.roles.add(guildRole);
                    console.log(`Role [${guildRole.name}] has been successfully added to user: ${member.tag}`)
                }
            }
        }
    })
}

module.exports = {
    addDefaultRole
}