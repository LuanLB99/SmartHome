import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { financesRouter } from "./routers/index.js";

const app = express();
dotenv.config();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("NArutinho!"))
  .use("/finances", financesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`The magic is happen on ${port}`));
