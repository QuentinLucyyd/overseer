"use strict"
const https = require('https');
const Discord = require('discord.js');
const config = require('../../config/reddit-config.json');
const client = require("../client");

client.on('message', async (message) => {
    if (message.content.toLocaleLowerCase().startsWith('*pls')) {
        const pieces = message.content.toLocaleLowerCase().split(' ');
        const subreddit = pieces[pieces.length - 1];

        for (const item of config) {
            if (subreddit === item.command) {
                const url = item.url;
                https.get(url, (result) => {
                    let body = '';
                    result.on('data', (chunk) => {
                        body += chunk
                    })

                    result.on('end', () => {
                        const response = JSON.parse(body);
                        const index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
                        const image = index.preview.images[0].source.url.replace('&amp;', '&'), title = index.title,
                            link = 'https://reddit.com' + index.permalink,
                            subRedditName = index.subreddit_name_prefixed;

                        if (index.post_hint !== 'image') {
                            const text = index.selftext
                            const textembed = new Discord.MessageEmbed()
                                .setTitle(subRedditName)
                                .setColor(9384170)
                                .setDescription(`[${title}](${link})\n\n${text}`)
                                .setURL(`https://reddit.com/${subRedditName}`)
                            message.channel.send(textembed)
                        }
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
        }
    }
});