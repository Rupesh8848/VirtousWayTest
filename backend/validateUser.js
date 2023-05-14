const jwt = require("jsonwebtoken");
const userModel = require("./Model/userModel");
const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const userToken = authorization?.split(" ")[1];
  if (authorization?.split(" ")[0] !== "Bearer") {
    return res.json("Bearer token missing.");
  }
  if (!userToken) {
    return res.json("User Token Couldn't be found");
  }

  try {
    const userId = await jwt.verify(userToken, process.env.JWT_KEY);

    console.log(userId);
    const user = await userModel.findById(userId.id);

    req.user = user;
    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = validateUser;
