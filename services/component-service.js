const { ComponentModel } = require("../models/ComponentModel");

async function createComponent(component) {
  const componentModel = new ComponentModel(component);
  return await componentModel.save();
}

async function listComponentsByParentID(id) {
  return await ComponentModel.find({ parent: id }).exec();
}

async function getComponentByID(id) {
  return await ComponentModel.findOne({ id: id }).exec();
}

async function updateComponent(id, component) {
  delete component.createdAt;
  delete component.createdBy;
  return await ComponentModel.findOneAndUpdate({ id: id }, component, {
    new: true,
  }).exec();
}

async function trashComponent(id) {
  return await ComponentModel.findByIdAndUpdate(
    { id: id },
    { isActive: false },
    { new: true }
  ).exec();
}

async function restoreComponent(id) {
  return await ComponentModel.findByIdAndUpdate(
    { id: id },
    { isActive: true },
    { new: true }
  ).exec();
}

async function deleteComponent(id) {
  return await ComponentModel.findOneAndDelete({ id: id }).exec();
}

async function deleteComponentsByParent(id) {
  return await ComponentModel.deleteMany({ parent: id }).exec();
}

module.exports = {
  createComponent,
  listComponentsByParentID,
  getComponentByID,
  updateComponent,
  trashComponent,
  restoreComponent,
  deleteComponent,
  deleteComponentsByParent,
};
