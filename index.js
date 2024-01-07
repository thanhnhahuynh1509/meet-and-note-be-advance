const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const { linkPreviewRoute } = require("./routes/link-preview-route");
const { userRoute } = require("./routes/user-route");
const app = express();
const server = require("http").createServer(app);
const { authentication } = require("./middlewares/authentication-middleware");
const { runSocket } = require("./socket/socket");
const { uploadRoute } = require("./routes/upload-route");
const { componentRoute } = require("./routes/component-route");

runSocket(server);

app.use(cors({ origin: "*", methods: "*" }));
app.use(express.static("public/upload"));
app.use(express.json());
app.use(authentication);
app.use("/api/link-preview", linkPreviewRoute);
app.use("/api/users", userRoute);
app.use("/api/components", componentRoute);
app.use("/api/upload", uploadRoute);

server.listen(config.PORT, async () => {
  await mongoose.connect(`${config.DB_HOST}/${config.DB_NAME}`);
  console.log(`Connecting to mongodb successfully!`);
  console.log(`Listening on port ${config.PORT}...`);
});
