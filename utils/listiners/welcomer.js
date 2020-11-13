"use strict"
const client = require("../client");
const path = require("path")
const Canvas = require("canvas");
const {MessageAttachment} = require('discord.js')

//Firebase database reference for channel defaults
const db = require("../../firebase").database();
const ref = db.ref("defaults/welcome");

client.on('guildMemberAdd', (member) => {
    ref.on("value", async function (snapshot) {
        const channel_id = snapshot.val().channel_id;
        const channel = member.guild.channels.cache.get(channel_id);

        const welcomeCanvas = Canvas.createCanvas(700, 250);
        const ctx = welcomeCanvas.getContext('2d');

        const background = await Canvas.loadImage(
            path.join(__dirname,'../../public/assets/images/deathmark-canvas-bg.png')
        );

        let x = 0;
        let y = 0;
        ctx.drawImage(background, x, y);

        const profileImage = await Canvas.loadImage(
            member.user.displayAvatarURL({format: 'png'})
        );

        x = welcomeCanvas.width / 2 - profileImage.width / 2;
        y = welcomeCanvas.height / 2 - profileImage.height / 2;
        ctx.drawImage(profileImage, x, y - 30);

        // User text
        ctx.fillStyle = '#ffffff' // White text
        ctx.font = '30px sans-serif'
        let text = `Welcome to the DeathMark ${member.user.tag}!`
        x = welcomeCanvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 60 + profileImage.height)

        // Member count
        ctx.font = '28px sans-serif'
        text = `Member #${member.guild.memberCount}`
        x = welcomeCanvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 100 + profileImage.height)

        //Attach to message and send
        const attachment = new MessageAttachment(welcomeCanvas.toBuffer());
        channel.send(`Welcome to the ***DeathMark 2.0*** ${member.user.toString()}. \n` +
            '- If this is your first time here, Yaay :smile: \n' +
            '- If this is not your first time here, Welcome back :) The original server got deleted due to some oopsies (we do not speak of the oopsies) :expressionless: \n', attachment);
    }, function (err) {
        console.log(err);
    });
});