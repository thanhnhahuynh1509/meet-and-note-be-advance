const { Schema, default: mongoose } = require("mongoose");
const { hashPassword } = require("../utils/password-util");

const schema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: async function (value) {
        const count = await this.model("User").countDocuments({ email: value });
        return count === 0;
      },
      message: "Email must be unique",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: { type: String, default: "unknown.jpg" },
  home: String,
  rooms: [String],
  sharedRooms: [{ id: { type: String }, permission: [String] }],
});

schema.pre("save", { document: true, query: false }, function () {
  this.password = hashPassword(this.password);
});

const UserModel = mongoose.model("User", schema);

module.exports = {
  UserModel,
};
