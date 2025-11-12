// backend/src/controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chalk from "chalk";
import db from "../db.js";

// ---------------- REGISTRO ----------------
export const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );

    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    console.log(chalk.green(`[INFO] Usuario registrado correctamente: ${nombre} (${email})`));

    res.status(201).json({
      message: "Registrado correctamente",
      user: { id: result.insertId, nombre, email },
      token,
    });
  } catch (error) {
    console.error(chalk.red("[ERROR]"), error.message);
    res.status(500).json({ error: "Error en el registro" });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      console.log(chalk.yellow(`[WARN] Intento de login con email inexistente: ${email}`));
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log(chalk.yellow(`[WARN] Contraseña incorrecta para: ${email}`));
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    console.log(chalk.green(`[INFO] Usuario logueado correctamente: ${user.nombre} (${email})`));

    res.json({
      message: "Login exitoso",
      user: { id: user.id, nombre: user.nombre, email: user.email },
      token,
    });
  } catch (error) {
    console.error(chalk.red("[ERROR]"), error.message);
    res.status(500).json({ error: "Error en el login" });
  }
};
