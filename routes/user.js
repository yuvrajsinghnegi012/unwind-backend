import express from 'express';
import { newUser, login, testApi, logout, getSingleUser, getAllUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/new", newUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", getAllUsers);
router.get("/:id", getSingleUser)
router.get("/test", testApi);

export default router;

