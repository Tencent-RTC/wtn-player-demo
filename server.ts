import express from "express";
import http from "http";

import cors from "cors";

const TLSSigAPIv2 = require("tls-sig-api-v2");

import config from "./config";

var sig = new TLSSigAPIv2.Api(config.sdkappid, config.secret);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/pusher", async (req, res) => {
  res.sendFile(__dirname + "/public/pusher.html");
});

app.get("/player", async (req, res) => {
  res.sendFile(__dirname + "/public/player.html");
});

app.get("/", async (req, res) => {
  res.redirect("/player");
});

app.post("/config", async (req, res) => {
  let userid = req.body.userid;

  let userSig = sig.genSig(userid, 3600 * 24);

  res.json({
    userSig: userSig,
    sdkappid: config.sdkappid,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
