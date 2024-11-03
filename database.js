import "dotenv/config"; //exécute la config puis charge les variables d'environnement définis dans le fichier .env
import mysql from "mysql2/promise";

// configuration de l'accès à la BDD et préparation du pool de connexions avec les variables d'environnement
const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

export default database;
