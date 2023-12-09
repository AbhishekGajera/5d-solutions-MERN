const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validators.js");
const { validate } = require("../validators/validate.js");

module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Register new User      
  router.post("/register", validate(registerSchema), auth.register);

  // Login existing User
  router.post("/login", validate(loginSchema), auth.login);

  app.use("/api/auth", router);
};
