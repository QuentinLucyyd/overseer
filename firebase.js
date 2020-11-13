require("dotenv").config();
const firebase = require("firebase-admin");

const serviceAccount = require("./overseer-ce7d7-firebase-adminsdk-lzlz7-07a5058980.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB
});

module.exports = firebase;