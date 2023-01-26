import { Router } from "express";
import {
  listSheets,
  listSheetByName,
  addDiarySpend,
} from "../../controllers/index.js";

const financesRouter = Router();

financesRouter
  .get("/mySheets", listSheets)
  .get("/mySheetsByName", listSheetByName)
  .get("/diary", addDiarySpend);

export { financesRouter };
