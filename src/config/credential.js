import drive from "../services/auth-service/auth.js";

async function addCredential(fileId, email, role) {
  await drive.permissions.create({
    fileId,
    requestBody: {
      type: "user",
      role,
      emailAddress: email,
    },
  });
}

/* type: "user",
      role: "owner",
      emailAddres: "luanlealboni@gmail.com", */

(async () => {
  /* await addCredential(file.id, "luanlealboni@gmail.com", "writer"); */
})();
