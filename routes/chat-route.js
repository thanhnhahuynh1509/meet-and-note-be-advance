const express = require("express");
const { listChatsByParentID } = require("../services/chat-service");

const chatRoute = express.Router();

chatRoute.get("/parent/:id", async (req, res) => {
  try {
    const { pageSize = 1, pageNumber = 10 } = req.query;
    const chats = await listChatsByParentID(
      req.params.id,
      pageNumber,
      pageSize
    );
    if (!chats) {
      return res.status(400).send({ message: "Not found chat" });
    }
    return res.status(200).send(chats);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

module.exports = {
  chatRoute,
};
