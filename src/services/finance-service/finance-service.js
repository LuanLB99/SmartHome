import dayjs from "dayjs";
import drive, { useServiceAccountAuth } from "../auth-service/auth.js";

export async function addSpent(
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
    (i) => i.title === "Gastos"
  );

  if (sheetIndex === -1) {
    throw {
      message: "Sheet not found",
    };
  }
  const Data = dayjs().format("DD/MM/YYYY");
  if (Forma_de_Pagamento === undefined) Forma_de_Pagamento = "PIX";
  if (Nome_do_Favorecido === undefined) Nome_do_Favorecido = "Luan";

  try {
    const sheet = document.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    const emptyRow = rows.findIndex((i) => i.Despesa === undefined);
    rows[emptyRow].Despesa = Despesa;
    rows[emptyRow].Data_Pagamento = Data;
    rows[emptyRow].Forma_de_Pagamento = Forma_de_Pagamento;
    rows[emptyRow].Valor = Valor;
    rows[emptyRow].Nome_do_Favorecido = Nome_do_Favorecido;
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
    Data: Data,
    Forma: Forma_de_Pagamento,
    Valor: Valor,
    Nome: Nome_do_Favorecido,
  };
}

export async function addInvest(
  planilha,
  Ativo,
  Quantidade,
  Preço,
  Valor_Investido
) {
  const files = await drive.files.list();

  const spreadsheet = files.data.files;

  const archive = spreadsheet.find((i) => i.name === planilha);

  const document = await useServiceAccountAuth(archive.id);

  const sheetIndex = document.sheetsByIndex.findIndex(
    (i) => i.title === "Investimentos"
  );

  if (sheetIndex === -1) {
    throw {
      message: "Sheet not found",
    };
  }
  const Data = dayjs().format("DD/MM/YYYY");

  try {
    const sheet = document.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    const emptyRow = rows.findIndex((i) => i.Ativo === undefined);
    rows[emptyRow].Ativo = Ativo;
    rows[emptyRow].Quantidade = Quantidade;
    rows[emptyRow].Preço = Preço;
    rows[emptyRow].Valor_Investido = Valor_Investido;
    rows[emptyRow].Data_do_Investimento = Data;
    await rows[emptyRow].save();
  } catch (error) {
    throw {
      name: "Error to update row",
      message: "Error to update new row",
    };
  }

  return {
    Ativo,
    Quantidade,
    Preço,
    Valor_Investido,
    Data,
  };
}
