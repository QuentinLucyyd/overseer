require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
/* Setup Discord.js client */
const client = require("./utils/client")

/* Setup Express app */
app.use(express.static("public"));

app.get('/', ((req, res) => {
    res.send('Overseer is running')
}))

app.listen(port);
console.log(`App started on port ${port}`)