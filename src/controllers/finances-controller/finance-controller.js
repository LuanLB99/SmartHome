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
    rows[2].Despesa = "Corte de Cabelo muito maneiro";
    await rows[2].save();
    console.log(rows[2]);
    return res.send("ok");
  } catch (error) {
    return res.send(error);
  }
}

export async function addDiarySpend(req, res) {
  try {
    const files = await drive.files.list();

    const myFile = files.data.files;

    const archive = myFile.find((i) => i.name === "Diario Janeiro");
    console.log(archive);
    const document = new GoogleSpreadsheet(archive.id);
    await document.useServiceAccountAuth({
      client_email:
        "ports-drivers@ordinal-crowbar-374323.iam.gserviceaccount.com",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCd7Og3HA+zsK+O\nt1yajpYhI+JE4fwRujQac8XgtCFTqmafc+e44mefScqP1STQW2TgQE7KIf3h2Pw8\nGQ7VIW6uGQic+SxfVoC03xlbcCAk9pvALS2xwrNMiqnqKT8TOh63nNw0JCngEqXe\np9+by0GsCA56DfhlOXiUVjcMFyAytdnOCwxMYWgSJ4hdx9vlEczr10g1LYS2OT4/\nUG6Bsx4NVZRPZCb92teIgK2J705FY5JF1Qw1GOJfw2tlmi5OLnsjJUI2lHG/8ihK\nm6sRF8D/8M4UaKhj6d38d68Du95dBwA6WH7xCrrf/meHjxfkEKRh8/mHcAjQb0Oh\nEkPAczJXAgMBAAECggEAHbxh7R6HhloadFDqSt/WPN8416eFgwEAlop+E9VXAR3w\nvM1iMFnRERkf3v1PNTxAPkldjInh+AiXVemR9WeaI4XrLUNtq3XqPiRT7feq1crp\ngMIA/JugjyT84W5qxgAHkKMkg1zb1aktOkN5wyf+cZoCv9CpmMW9gpDJRKmGEoYH\nQ47ysGikXDZJSf5eETm7NtwsmoTY/8/ZSlUROSBBDYIiW7gdq9j1Vg6KtSZml7wB\nAbTpg4gdl4D9U0FmQPwyCJyx9CJxDkT5x5a/WVBVoh+IJeqN6Zzk5+xIo7G6bb0O\n5Kq5AM7lozAiCk2EI74dBBzMmuZwWoRSdrRuclKR4QKBgQDawenDREIITtzNDhQM\nTUrk0N1E0ypWURdGDOlgde8eq5cjHghPkU1AEuhLiNJb4teoh/H9Ihiowx4OvRMv\nxDunSzuly89nnINNbvwvjinBssAcAnK7lLWMQjPj/jBbzuJQzHIYs7LHcZ4Q6jmA\ngqY8hxPy/Wkt862yB8vVLuV5jQKBgQC4z8GPafjv99kD1PqX65fYvczhzVx65BPs\nM8OsFNzuFb/Fy9H6sTUw6fBT/JvqNVmxhv71AjRlxCzFiu3cYjt1D561NiaaGQSi\n/8rSOf6y0u7tNNcPKRlMO9u4xBsbqx1epuAO3n871NKUTYPDAMcUvl/i3PIf93Zd\n1on0nFH4cwKBgBDnOvDjrVaHAXi2xcXNkyPrH63Zw0O4MFwxUzco5bkw+RS1lV7Q\nk2+IBnsPr3F6Lb/QAVrV76Hasc/hvEHMn+9lWM6O2Q/ggCTTlpj2GzPkZAPGDKeB\n7iVQWEIdug7eBY7IvWg7Om0+0j/sWVUcw0uaBGiaPC5YzesbvxxR61lhAoGAAZlS\njGIXVEQprX3POTdBlg92UVHMhgepIHcGL1vy2WB4y0ZLJ8cWtbigaqmZ07nob7/C\nPu5o86Rx2rer/Scgao/bCKhSRy0GPD7IS29TA8sNZCH75latsFooOX4A2glt9J6u\n+5HzOdpKhBvzkuFT15saC0VsFti2PnOXt/UORH8CgYBSWecWZazno2fUPqLqgvhv\n/ag1pMVvZfCOCb+PzVDXgRUmZYv5qSdLpeVdp8b5+GzPcmlmYJMM1JAnjTw8NsoC\n0l5MyeI1llwh7AZLsimN6jPVgYUr/PqBvQtndLwsKNT3655vpMqhOatZMJGzKA+5\n/Xn6Muc7HkgklPj9npDDEA==\n-----END PRIVATE KEY-----\n",
    });
    await document.loadInfo();
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
