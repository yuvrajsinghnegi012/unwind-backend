import express from 'express';
import { newUser, testApi } from "../controllers/user.js";

const router = express.Router();

router.get("/test", testApi);
router.post("/new", newUser);

export default router;

