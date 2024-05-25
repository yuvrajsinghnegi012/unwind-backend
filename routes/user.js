import express from 'express';
import { newUser, login, logout, getSingleUser, getAllUsers, getWishlist, toggleWishlist } from "../controllers/user.js";

const router = express.Router();

router.post("/new", newUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/wishlist/:userId/:propertyId", toggleWishlist);
router.get("/wishlist/:id", getWishlist);

export default router;

