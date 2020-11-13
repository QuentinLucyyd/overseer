require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

/* Setup Discord.js client */
const client = require("./utils/client");
const welcomer = require("./utils/listiners/welcomer");
const cron = require("./utils/crons/daily-cron");

/* Setup Express app */
app.use(express.static("public"));

app.get('/', ((req, res) => {
    return res.send('Overseer is running')
}))

app.listen(port, () => {
    cron.dailycron.start();
});
console.log(`App started on port ${port}`)

module.exports = app
