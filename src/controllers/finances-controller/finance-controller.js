import drive from "../../services/auth-service/auth.js";
import { addSpent, addInvest } from "../../services/index.js";

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

  const planilha = "Controle";

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

export async function addNewInvest(req, res) {
  const { Ativo, Quantidade, Preço, Valor_Investido } = req.body;

  const planilha = "Controle";
  try {
    const newInvest = await addInvest(
      planilha,
      Ativo,
      Quantidade,
      Preço,
      Valor_Investido
    );
    return res.send(newInvest);
  } catch (error) {
    if (error.name === "Error to update row") {
      return res.sendStatus(400);
    }
    return res.sendStatus(404);
  }
}
