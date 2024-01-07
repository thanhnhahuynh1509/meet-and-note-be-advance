const { verify } = require("../utils/jwt-util");

const NOT_AUTHENTICATION_LIST = [
  "/api/users/sign-up",
  "/api/users/sign-in",
  "/sign-in",
  "/sign-up",
];

function authentication(req, res, next) {
  try {
    console.log(req.url);
    if (NOT_AUTHENTICATION_LIST.includes(req.url)) {
      return next();
    }
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decodedToken = verify(token);
    req.token = decodedToken;
    return next();
  } catch (e) {
    return res.status(403).send({ message: "Please authentication!" });
  }
}

module.exports = {
  authentication,
};
