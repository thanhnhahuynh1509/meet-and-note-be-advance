const express = require("express");
const fs = require("fs");

const uploadRoute = express.Router();

uploadRoute.post("", async (req, res) => {
  try {
    const currentChunk = parseInt(req.header("Current-Chunk"));
    const totalChunks = parseInt(req.header("Total-Chunks"));
    const filename = req.header("File-Name");
    const fileType = req.header("File-Type");
    const componentId = req.header("Component-ID");

    const folder = `public/upload/${componentId}`;
    const filePath = `${folder}/${filename}`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const writeStream = fs.createWriteStream(filePath, { flags: "a" });

    req.pipe(writeStream);

    req.on("end", () => {
      if (currentChunk === totalChunks - 1) {
        return res.status(200).send({
          filename: filename,
          filePath: filePath.replace("public/upload/", ""),
          fileType: fileType,
        });
      } else {
        return res.sendStatus(200);
      }
    });

    req.on("error", (error) => {
      console.error("Error receiving chunk:", error);
      return res.sendStatus(500);
    });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

module.exports = {
  uploadRoute,
};
