"use strict"
const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/dankmemes/hot/.json?limit=100'
const client = require("../client");

client.on('message', async (message) => {
    if (message.content.startsWith('*pls meme')) {
        https.get(url, (result) => {
            let body = '';
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                const response = JSON.parse(body);
                const index = response.data.children[Math.floor(Math.random() * 99) + 1].data;

                if (index.post_hint !== 'image') {
                    const text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)
                    message.channel.send(textembed)
                }
                const image = index.preview.images[0].source.url.replace('&amp;', '&'), title = index.title,
                    link = 'https://reddit.com' + index.permalink, subRedditName = index.subreddit_name_prefixed;
                if (index.post_hint !== 'image') {
                    const textembed = new Discord.RichEmbed()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }
                console.log(image);
                const imageembed = new Discord.MessageEmbed()
                    .setTitle(subRedditName)
                    .setImage(image)
                    .setColor(9384170)
                    .setDescription(`[${title}](${link})`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                message.channel.send(imageembed)
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
    }
});