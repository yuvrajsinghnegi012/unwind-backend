import express from 'express';
import { testApi } from "../controllers/user.js";

const router = express.Router();

router.get("/test", testApi);

export default router;

