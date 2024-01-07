const express = require("express");
const { getLinkPreview } = require("link-preview-js");

const linkPreviewRoute = express.Router();

linkPreviewRoute.get("", async (req, res) => {
  try {
    const { url } = req.query;
    const response = await getLinkPreview(url);
    return res.send(response);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

module.exports = {
  linkPreviewRoute,
};
