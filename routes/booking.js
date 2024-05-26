import express from "express";
const router = express.Router();

import { newBooking } from "../controllers/booking.js";

router.post("/new/:userId/:propertyId", newBooking);

export default router;