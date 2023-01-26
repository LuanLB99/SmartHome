import { google } from "googleapis";
import { credentials } from "./credentials.js";
import { GoogleSpreadsheet } from "google-spreadsheet";

import dotenv from "dotenv";

dotenv.config();

const drive = google.drive({
  version: "v3",
  auth: new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/drive"]
  ),
});

export async function useServiceAccountAuth(spreadSheetId) {
  const document = new GoogleSpreadsheet(spreadSheetId);
  await document.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });
  await document.loadInfo();

  return document;
}

export default drive;
