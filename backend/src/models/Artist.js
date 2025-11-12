import db from "../config/db.js";

export const getAllArtists = async () => {
  const [rows] = await db.query("SELECT * FROM artists");
  return rows;
};

export const createArtist = async (artist) => {
  const { nombre, spotify, youtube, web, drive } = artist;
  const [result] = await db.query(
    "INSERT INTO artists (nombre, spotify_url, youtube_url, web_url, drive_url) VALUES (?, ?, ?, ?, ?)",
    [nombre, spotify, youtube, web, drive]
  );
  return result.insertId;
};
