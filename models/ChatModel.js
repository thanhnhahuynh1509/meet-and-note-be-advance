const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema({
  id: { type: String, required: [true, "ID is required"], unique: true },
  parent: { type: String },
  content: Schema.Types.Mixed,
  belongTo: { type: String },
  createdDate: { type: Number, default: Date.now() },
});

const ChatModel = mongoose.model("Chat", schema);

module.exports = {
  ChatModel,
};
