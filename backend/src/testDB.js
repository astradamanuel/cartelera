import pool from "./config/db.js";

const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexión exitosa a MySQL:", rows[0].result);
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  }
};

testConnection();

