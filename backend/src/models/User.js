import db from "../config/db.js";

class User {
  static async create({ nombre, email, password }) {
    const [result] = await db.query(
      "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, password]
    );
    return { id: result.insertId, nombre, email };
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0]; // devuelve el primer usuario
  }
}

export default User;

