import express from "express";
import { home, register, login ,user} from "../controller/auth-controller.js";
import validate from "../Middleware/validate-middleware.js";
import signupSchema from "../validators/auth-validator.js";


import authMiddleware from "../Middleware/auth-middleware.js";

const router = express.Router();

router.route("/").get(home);

router.route("/register").post(validate(signupSchema), register);

router.route("/login").post(login);


router.route("/user").get(authMiddleware,user);

export default router;
