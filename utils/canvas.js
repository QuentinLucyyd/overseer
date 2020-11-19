"use strict"

const { Canvas, resolveImage } = require('canvas-constructor');
const path = require("path")

async function getWelcomeCard(member, guild) {
    const background = await resolveImage(path.join(__dirname, '../public/assets/images/deathmark-canvas-bg.png'));
    const profileImage = await resolveImage(member.user.displayAvatarURL({format: 'png', dynamic: true, size: 256}));
    const longName = member.user.tag.length > 25;

    return  new Canvas(500, 230)
        .setColor("#1a1a1a")
        .printRectangle(0, 0, 500, 230)
        .printImage(background, 5, 5, 490, 220)
        .printCircularImage(profileImage, 250, 70, 50, { fit: "fill" })
        .setColor('#FFFFFF')
        .setTextAlign("center")
        .setTextFont('20px sans-serif')
        .printText(`${(longName) ? member.user.tag + '\n' : ''}`, 250, 150, 450)
        .printText(`${(longName) ? '' : member.user.tag} has joined the Deathmark`, 250, ((longName) ? 180 : 150), 450)
        .setTextFont('18px sans-serif')
        .printText(`Member #${guild.memberCount}`, 250, ((longName) ? 210 : 180))
        .toBuffer();
}

module.exports = {
    getWelcomeCard
}