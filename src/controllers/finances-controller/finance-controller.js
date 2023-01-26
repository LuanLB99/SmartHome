import { response as res, request as req } from "express";
import drive, {
  useServiceAccountAuth,
} from "../../services/auth-service/auth.js";
import { GoogleSpreadsheet } from "google-spreadsheet";

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

export async function listSheetByName(req, res) {
  const name = "Mais Novo Integrante";
  try {
    const files = await drive.files.list();

    const spreadsheet = files.data.files;

    const archive = spreadsheet.find((i) => i.name === name);

    const document = await useServiceAccountAuth(archive.id);

    const sheetIndex = document.sheetsByIndex.findIndex(
      (i) => i.title === "New Sheet"
    );
    if (sheetIndex === -1) {
      throw {
        message: "Sheet not found",
      };
    }

    const sheet = document.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    const novaDespesa = await sheet.addRow({
      Despesa: "Cortezinho da Massa",
      Data_Pagamento: "20/08/2023",
      Forma_de_Pagamento: "Cartão",
      Valor_a_Pagar: 285,
      Nome_do_Favorecido: "Calos Batista Jr",
    });
    return res.send(novaDespesa);
  } catch (error) {
    return res.send(error);
  }
}

export async function addDiarySpend(req, res) {
  try {
    const files = await drive.files.list();

    const myFile = files.data.files;

    const archive = myFile.find((i) => i.name === "Diario Janeiro");
    const document = await useServiceAccountAuth(archive.id);
    const sheetIndex = document.sheetsByIndex.findIndex(
      (i) => i.title === "01-01"
    );
    if (sheetIndex === -1) {
      throw {
        message: "Sheet not found",
      };
    }

    const sheet = document.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    console.log(rows[0]);
    return res.send("ok");
  } catch (error) {
    return res.send(error);
  }
}
