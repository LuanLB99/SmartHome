import { Router } from "express";
import {
  listSheets,
  addNewSpent,
  addNewInvest,
} from "../../controllers/index.js";

const financesRouter = Router();

financesRouter
  .get("/mySheets", listSheets)
  .post("/newSpent", addNewSpent)
  .post("/newInvest", addNewInvest);

export { financesRouter };
