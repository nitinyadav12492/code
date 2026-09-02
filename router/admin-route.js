import express from "express";
import { getAllUsers, deleteUser,updateUser, getAllContacts } from "../controller/admin-controller.js";
import authMiddleware from "../Middleware/auth-middleware.js";
import adminMiddleware from "../Middleware/admin-middleware.js";
const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.patch("/users/:id", updateUser);



router.delete("/users/:id", deleteUser);

router.route("/contacts").get( getAllContacts);

export default router;