const express = require("express");
const {
  createUser,
  getUserByEmail,
  deleteUser,
  updateUser,
} = require("../services/user-service");
const { comparePassword } = require("../utils/password-util");
const { generateToken } = require("../utils/jwt-util");
const { deleteProperty } = require("../utils/object-property");
const { createComponent } = require("../services/component-service");
const { v4: uuid } = require("uuid");

const userRoute = express.Router();

userRoute.post("/sign-in", async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user || !comparePassword(req.body.password, user?.password)) {
      return res
        .status(400)
        .send({ message: "Email or Password is incorrect" });
    }
    return res.status(200).send(generateToken({ email: user.email }));
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

userRoute.post("/sign-up", async (req, res) => {
  try {
    const user = await createUser(req.body);
    const response = deleteProperty(user, "password");
    const componentID = uuid();
    await createComponent({
      id: componentID,
      title: "Home",
      type: "Room",
      createdBy: user.email,
    });
    await updateUser(user.email, { home: componentID });
    return res.status(201).send(response);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

userRoute.get("/me", async (req, res) => {
  try {
    const { email } = req.token;
    const user = await getUserByEmail(email);
    const response = deleteProperty(user, "password");
    return res.status(response ? 200 : 400).send(
      response ?? {
        message: `Not found user ${email}`,
      }
    );
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

// userRoute.delete("", async (req, res) => {
//   try {
//     const { email } = req.query;
//     const response = await deleteUser(email);
//     return res
//       .status(response ? 200 : 400)
//       .send(response ?? { message: `Not found user ${email}` });
//   } catch (e) {
//     return res.status(400).send({ message: e.message });
//   }
// });

module.exports = {
  userRoute,
};
