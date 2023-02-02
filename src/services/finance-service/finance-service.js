import drive, { useServiceAccountAuth } from "../auth-service/auth.js";

export default async function addSpent(
  planilha,
  Despesa,
  Forma_de_Pagamento,
  Valor,
  Nome_do_Favorecido
) {
  const files = await drive.files.list();

  const spreadsheet = files.data.files;

  const archive = spreadsheet.find((i) => i.name === planilha);

  const document = await useServiceAccountAuth(archive.id);

  const sheetIndex = document.sheetsByIndex.findIndex(
    (i) => i.title === "New Sheet"
  );

  if (sheetIndex === -1) {
    throw {
      message: "Sheet not found",
    };
  }

  try {
    const sheet = document.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    const emptyRow = rows.findIndex((i) => i.Despesa === undefined);
    rows[emptyRow].Despesa = Despesa;
    rows[emptyRow].Data_Pagamento = "01/02/2023";
    rows[emptyRow].Forma_de_Pagamento = "Débito";
    rows[emptyRow].Valor = Valor;
    rows[emptyRow].Nome_do_Favorecido = "Luan";
    await rows[emptyRow].save();
  } catch (error) {
    throw {
      name: "Error to update row",
      message: "Error to update new row",
    };
  }

  return {
    Planilha: planilha,
    Despesa: Despesa,
    Data: "01/02/2023",
    Forma: "Débito",
    Valor: Valor,
    Nome: "Luan",
  };
}
