import express from "express";
import { getAllProperties, getCategoryProperties, getSingleProperty, newProperty, searchProperties } from "../controllers/property.js";

const router = express.Router();

router.post("/new/:id", newProperty);
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);
router.get("/all/search", searchProperties);
router.get("/category/:category", getCategoryProperties);

export default router;