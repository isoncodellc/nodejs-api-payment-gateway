import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", routes);

export default app;
