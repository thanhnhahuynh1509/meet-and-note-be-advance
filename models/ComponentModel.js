const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema({
  id: { type: String, required: [true, "ID is required"], unique: true },
  parent: { type: String },
  title: { type: String },
  type: { type: String, required: [true, "Type is required"] },
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number },
  content: Schema.Types.Mixed,
  attributes: Schema.Types.Mixed,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number },
  createdBy: { type: String },
  updatedBy: { type: String },
});

const ComponentModel = mongoose.model("Component", schema);

module.exports = {
  ComponentModel,
};
