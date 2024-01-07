const { UserModel } = require("../models/UserModel");

async function createUser(user) {
  const userModel = new UserModel(user);
  const response = await userModel.save();
  return response;
}

async function getUserByEmail(email) {
  return await UserModel.findOne({ email: email }).exec();
}

async function updateUser(email, user) {
  delete user?.email;
  return await UserModel.findOneAndUpdate({ email }, user, {
    new: true,
  }).exec();
}

async function deleteUser(email) {
  return await UserModel.findOneAndDelete({ email }).exec();
}

module.exports = {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
