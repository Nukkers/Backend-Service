const express = require("express");
const app = express();

let ipDB = {};

app.get("/subscribe", (req, res) => {
    // Get the IP address of the caller
    const usersIpAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Check if the IP address is stored already
    if (usersIpAddress in ipDB) {
        // Increment the number of streams associated with that IP address
        ipDB[usersIpAddress] += 1;

        let totalNumberOfStreams = ipDB[usersIpAddress];
        if (totalNumberOfStreams > 3) {
            res.json({
                statusCode: 200,
                message:
                    "You have more than 3 streams running concurrently. Please turn one stream off.",
                status: "failed",
            });
        } else {
            res.json({
                statusCode: 200,
                message:
                    "You have less than 3 streams running concurrently. Stream connected successfully",
                status: "success",
            });
        }
        console.log("We have this IP address stored!!: ", usersIpAddress);
    } else {
        ipDB[usersIpAddress] = 1;
        res.json({
            statusCode: 200,
            message:
                "You don't have any streams connected. Stream connected successfully",
            status: "success",
        });
    }
});

app.get("/unsubscribe", (req, res) => {
    // Get the IP address of the caller
    const usersIpAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Check if the IP address is stored already
    if (usersIpAddress in ipDB && ipDB[usersIpAddress] > 0) {
        // Decrement the number of streams associated with that IP address
        ipDB[usersIpAddress] -= 1;
        res.json({
            statusCode: 200,
            message:
                "You have unsubscribed successfully.",
            status: "success",
        });
    } else {
        res.json({
            statusCode: 200,
            message:
                "This device has not subscribed to this service.",
            status: "failed",
        });
    }
});

module.exports = app;