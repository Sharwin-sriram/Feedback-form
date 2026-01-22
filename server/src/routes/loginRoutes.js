import express from "express";
import { login, signUp, getUSers } from "../controller/loginController.js";

const router = express.Router();

router.get("/Users", getUSers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
