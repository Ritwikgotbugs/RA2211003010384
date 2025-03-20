import express from "express";
import { fetchNumbers } from "../controllers/controller";

const router = express.Router();

router.get("/:id", fetchNumbers);

export default router;
