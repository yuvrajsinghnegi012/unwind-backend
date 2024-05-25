import express from "express";
import { getAllProperties, getSingleProperty, newProperty } from "../controllers/property.js";

const router = express.Router();

router.post("/new/:id", newProperty);
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);

export default router;