import { Router } from "express";

import { charges, refund } from "./controller.js";

const router = Router();

router.post("/charges", charges);
router.post("/refund", refund);

export default router;
