const express = require("express");

const games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "get successful" });
});

server.get("/games", async (req, res) => {
  const rows = await games.getAll();

  res.status(200).json(rows);
});

server.post("/games", async (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res
      .status(422)
      .json({
        message: "Unable to complete server request. Missing required field(s)"
      });
  } else {
    const games = await games.getAll();

    res.status(201).json(games);
  }
});

module.exports = server;
