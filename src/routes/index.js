import { Router } from "express";

import stripeRoutes from "../stripe/routes.js";
import conektaRoutes from "../conekta/routes.js";


const router = Router();

router.get("/", (req, res) => {
	res.send("Running");
});

router.use("/stripe", stripeRoutes);
router.use("/conekta", conektaRoutes);


export default router;