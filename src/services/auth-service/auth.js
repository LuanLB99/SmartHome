import { google } from "googleapis";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dotenv from "dotenv";

dotenv.config();
const email = process.env.CREDENTIALS_EMAIL;
const key = process.env.PRIVATE_KEY;

const drive = google.drive({
  version: "v3",
  auth: new google.auth.JWT(email, null, key, [
    "https://www.googleapis.com/auth/drive",
  ]),
});

export async function useServiceAccountAuth(spreadSheetId) {
  const document = new GoogleSpreadsheet(spreadSheetId);
  await document.useServiceAccountAuth({
    client_email: email,
    private_key: key,
  });
  await document.loadInfo();

  return document;
}

export default drive;
