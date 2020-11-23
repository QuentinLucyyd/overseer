require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

/* Setup Discord.js client */
const client = require("./utils/client");
const cron = require("./utils/crons/daily-cron");

/* Listeners */
const welcomer = require("./utils/listiners/welcomer");
const antispam = require("./utils/listiners/anti-spam");
const meme = require("./utils/listiners/meme");

/* Setup Express app */
app.use(express.static("public"));

app.get('/', ((req, res) => {
    return res.send('Overseer is running')
}))

app.listen(port, () => {
    console.log(`App started on port ${port}`)
    cron.dailycron.start();
});

module.exports = app
