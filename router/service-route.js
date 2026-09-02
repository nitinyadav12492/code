import express from "express";

import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../controller/service-controller.js";

const router = express.Router();
router.get("/", getAllServices);
router.post("/", createService);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);


export default router;