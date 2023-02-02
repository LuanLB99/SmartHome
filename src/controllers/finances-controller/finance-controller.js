import { response as res, request as req } from "express";
import drive, {
  useServiceAccountAuth,
} from "../../services/auth-service/auth.js";
import { GoogleSpreadsheet } from "google-spreadsheet";
import addSpent from "../../services/finance-service/finance-service.js";

export async function listSheets(req, res) {
  try {
    const files = await drive.files.list({
      pageSize: 20,
      fields: "nextPageToken, files(id, name)",
    });
    res.send(files.data.files);
  } catch (error) {
    console.log(error);
  }
}

export async function addNewSpent(req, res) {
  const { Despesa, Forma_de_Pagamento, Valor, Nome_do_Favorecido } = req.body;

  const planilha = "Mais Novo Integrante";

  try {
    const newSpent = await addSpent(
      planilha,
      Despesa,
      Forma_de_Pagamento,
      Valor,
      Nome_do_Favorecido
    );
    return res.status(200).send(newSpent);
  } catch (error) {
    if (error.name === "Error to update row") {
      return res.sendStatus(400);
    }
    return res.sendStatus(404);
  }
}

export async function addDiarySpend(req, res) {
  try {
    const files = await drive.files.list();

    const myFile = files.data.files;

    const archive = myFile.find((i) => i.name === "Mais Novo Integrante");
    const document = await useServiceAccountAuth(archive.id);
    const sheetIndex = document.sheetsByIndex.findIndex(
      (i) => i.title === "New Sheet"
    );
    if (sheetIndex === -1) {
      throw {
        message: "Sheet not found",
      };
    }
    const colunaValorProcurado = "Despesa";
    const valorProcurado = "Dízimo";

    const sheet = document.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows({
      offset: 1,
      limit: 100,
      query: `${colunaValorProcurado} = "${valorProcurado}"`,
    });

    await sheet.setCell(rows[0]._rowNumber, "Valor_a_Pagar", 280);
    return res.send("ok");
  } catch (error) {
    return res.send(error);
  }
}
