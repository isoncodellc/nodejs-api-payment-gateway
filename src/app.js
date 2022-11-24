import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index.js";
import { error404handler, errorGenericHandler } from "./middleware.js"

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(error404handler);
app.use(errorGenericHandler);

export default app;
