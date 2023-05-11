const express = require("express");
const { userRegister, userLogin } = require("../Controller/userController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const userRoute = express.Router();

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

userRoute.post("/register", validator.body(registerSchema), userRegister);
userRoute.post("/login", validator.body(loginSchema), userLogin);

module.exports = userRoute;
