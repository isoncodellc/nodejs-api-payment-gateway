import { Router } from "express";

import stripeRoutes from "../stripe/routes.js";

const router = Router();

router.get("/", (req, res) => {
	res.send("Running");
});

router.use("/stripe", stripeRoutes);

export default router;