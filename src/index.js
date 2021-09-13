// Import the functions you need from the SDKs you need
var firebaseApp = require('firebase/app');
var admin = require('firebase-admin')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
admin.initializeApp({
    apiKey: "AIzaSyDMUgLGL8_MA9vMgV7ixHTNyTYJmq8LcfA",
    authDomain: "polyaihackathon.firebaseapp.com",
    projectId: "polyaihackathon",
    storageBucket: "polyaihackathon.appspot.com",
    messagingSenderId: "348343745852",
    appId: "1:348343745852:web:6e0d0721c1020f10967239"
});
const db = admin.firestore();
const functions = require("firebase-functions");


const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
//app.use(cors({ origin: true }));

app.get('/test', (req, res) => res.send("Test works"));

app.get('/race/:code', async (req, res) =>  {
    var docRef = db.collection("races").doc(req.params.code);
    docRef.get().then((doc) => {
        if (doc.exists) {
            res.send(doc.data());
        } else {
            // doc.data() will be undefined in this case
            res.send("No data");
        }
    }).catch((error) => {
        res.send(error);
    });
});

app.post('/race/:code', async (req, res) => {

    db.collection("races").doc(req.params.code).set({
        status: req.body.status,
        standings: req.body.standings
    })
    .then(() => {
        res.send('written successfully')
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
});

exports.app = functions.https.onRequest(app)