import express from "express";
import { listarArtistas, agregarArtista } from "../controllers/artistController.js";

const router = express.Router();

router.get("/", listarArtistas);
router.post("/", agregarArtista);

export default router;

