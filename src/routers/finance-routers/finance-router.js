import { Router } from "express";
import {
  listSheets,
  addDiarySpend,
  addNewSpent,
} from "../../controllers/index.js";

const financesRouter = Router();

financesRouter
  .get("/mySheets", listSheets)
  .post("/newSpent", addNewSpent)
  .get("/diary", addDiarySpend);

export { financesRouter };
