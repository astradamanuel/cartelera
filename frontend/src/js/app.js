async function cargarArtistas() {
  const res = await fetch("http://localhost:3000/api/artists");
  const artistas = await res.json();

  const contenedor = document.getElementById("artist-list");
  artistas.forEach(art => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${art.nombre}</h2>
      <a href="${art.spotify_url}" target="_blank">Spotify</a> |
      <a href="${art.youtube_url}" target="_blank">YouTube</a> |
      <a href="${art.web_url}" target="_blank">Web</a> |
      <a href="${art.drive_url}" target="_blank">Drive</a>
    `;
    contenedor.appendChild(div);
  });
}

cargarArtistas();

