import React, { useEffect, useState } from "react";
import { juegosAPI, resenasAPI } from "../api/api";
import ListaResenas from "./ListaResenas";
import FormularioResena from "./FormularioResena";

export default function JuegoDetalle({ juegoId }) {
  const [juego, setJuego] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchJuego();
    fetchResenas();
  }, [juegoId]);

  async function fetchJuego() {
    try {
      const res = await juegosAPI.getById(juegoId);
      setJuego(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar el juego");
    }
  }

  async function fetchResenas() {
    try {
      const res = await resenasAPI.byJuego(juegoId);
      setResenas(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar reseñas");
    }
  }

  async function handleCreate(data) {
    try {
      await resenasAPI.create({ ...data, juegoId });
      fetchResenas();
    } catch (err) {
      console.error(err);
      alert("Error al crear reseña");
    }
  }

  async function handleUpdate(id, data) {
    try {
      await resenasAPI.update(id, data);
      setEdit(null);
      fetchResenas();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar reseña");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar reseña?")) return;
    try {
      await resenasAPI.remove(id);
      fetchResenas();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar reseña");
    }
  }

  if (!juego) return <p>Cargando información del juego...</p>;

  return (
    <div className="juego-detalle-container">
  {/*Columna izquierda */}
  <div className="juego-info">
    <img src={juego.imagenPortada || "https://via.placeholder.com/600x300"} alt={juego.titulo} />
    <h2>{juego.titulo}</h2>
    <p>{juego.genero} • {juego.plataforma} • {juego.anoLanzamiento || "Sin año"}</p>
    <p>{juego.descripcion || "Sin descripción disponible."}</p>
  </div>

  {/* Columna derecha */}
  <div className="juego-reseñas">
    <h3>Reseñas</h3>
    <FormularioResena
      initial={edit}
      onSubmit={(data) =>
        edit ? handleUpdate(edit._id, data) : handleCreate(data)
      }
    />
    <ListaResenas
      resenas={resenas}
      onEditar={(r) => setEdit(r)}
      onEliminar={handleDelete}
    />
  </div>
</div>

  );
}

