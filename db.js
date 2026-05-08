const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,

  ssl: {
    rejectUnauthorized: false
  }
});

pool.getConnection((err, conn) => {

  if (err) {
    console.error("❌ Error de conexión:", err);
  } else {
    console.log("✅ Conectado a Railway MySQL");
    conn.release();
  }

});

module.exports = pool.promise();