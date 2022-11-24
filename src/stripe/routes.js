import { Router } from "express";

import { charges } from "./controller.js";

const router = Router();

router.post("/charges", charges);

export default router;
