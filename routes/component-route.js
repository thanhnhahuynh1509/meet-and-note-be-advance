const express = require("express");
const {
  getComponentByID,
  listComponentsByParentID,
} = require("../services/component-service");

const componentRoute = express.Router();

componentRoute.get("/:id", async (req, res) => {
  try {
    const component = await getComponentByID(req.params.id);
    if (!component) {
      return res.status(400).send({ message: "Not found component" });
    }
    return res.status(200).send(component);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

componentRoute.get("/parent/:id", async (req, res) => {
  try {
    const components = await listComponentsByParentID(req.params.id);
    if (!components) {
      return res.status(400).send({ message: "Not found component" });
    }
    return res.status(200).send(components);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

module.exports = {
  componentRoute,
};
