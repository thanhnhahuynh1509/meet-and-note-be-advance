const { ChatModel } = require("../models/ChatModel");

async function createChat(chat) {
  const chatModel = new ChatModel(chat);
  return await chatModel.save();
}

async function listChatsByParentID(id, pageNumber, pageSize) {
  return await ChatModel.find({ parent: id })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdDate: -1 })
    .exec();
}

async function deleteChat(id) {
  return await ChatModel.findOneAndDelete({ id: id }).exec();
}

async function deleteChatsByParent(id) {
  return await ChatModel.deleteMany({ parent: id }).exec();
}

module.exports = {
  createChat,
  listChatsByParentID,
  deleteChat,
  deleteChatsByParent,
};
