function deleteProperty(document, property) {
  if (document) {
    document = document.toObject();
    delete document[property];
  }
  return document;
}

module.exports = { deleteProperty };
