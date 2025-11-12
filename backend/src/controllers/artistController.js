import { getAllArtists, createArtist } from "../models/Artist.js";

export const listarArtistas = async (req, res) => {
  try {
    const artistas = await getAllArtists();
    res.json(artistas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const agregarArtista = async (req, res) => {
  try {
    const id = await createArtist(req.body);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

