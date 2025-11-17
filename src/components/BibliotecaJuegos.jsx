import React, { useEffect, useState } from 'react';
import { juegosAPI } from '../api/api';
import TarjetaJuego from './TarjetaJuego';
import FormularioJuego from './FormularioJuego';
import FiltrosJuegos from './FiltrosJuegos';

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [todos, setTodos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchJuegos();
  }, []);

  // Obtener todos los juegos del backend
  async function fetchJuegos() {
    setLoading(true);
    try {
      const res = await juegosAPI.all();
      setJuegos(res.data);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      alert('Error cargando juegos');
    } finally {
      setLoading(false);
    }
  }

  // Crear un nuevo juego
  async function handleCreate(data) {
    try {
      await juegosAPI.create(data);
      fetchJuegos();
    } catch (err) {
      console.error(err);
      alert('Error creando juego');
    }
  }

  //Actualizar un juego existente
  async function handleUpdate(id, data) {
    try {
      await juegosAPI.update(id, data);
      setEdit(null);
      fetchJuegos();
    } catch (err) {
      console.error(err);
      alert('Error actualizando juego');
    }
  }

  //Eliminar un juego
  async function handleDelete(id) {
    if (!confirm('¿Eliminar este juego?')) return;
    try {
      await juegosAPI.remove(id);
      fetchJuegos();
    } catch (err) {
      console.error(err);
      alert('Error eliminando juego');
    }
  }

  //Cambiar el estado "completado"
  async function toggleCompletado(juego) {
    try {
      await juegosAPI.update(juego._id, { ...juego, completado: !juego.completado });
      fetchJuegos();
    } catch (err) {
      console.error(err);
    }
  }

  // Aplicar filtros
  function filtrarJuegos(filtros) {
    let resultado = [...todos];

    // Filtro de texto (título o desarrollador)
    if (filtros.texto) {
      const q = filtros.texto.toLowerCase();
      resultado = resultado.filter(
        (j) =>
          j.titulo.toLowerCase().includes(q) ||
          j.desarrollador?.toLowerCase().includes(q)
      );
    }

    // Filtro por género
    if (filtros.genero) {
      resultado = resultado.filter((j) => j.genero === filtros.genero);
    }

    // Filtro por plataforma
    if (filtros.plataforma) {
      resultado = resultado.filter((j) => j.plataforma === filtros.plataforma);
    }

    // Filtro por completado
    if (filtros.completado !== '') {
      const estado = filtros.completado === 'true';
      resultado = resultado.filter((j) => j.completado === estado);
    }

    setJuegos(resultado);
  }

 return (
  <div className="biblioteca-container">
    {/* Título */}
    <h1 className="titulo-biblioteca">GameTracker Library</h1>

    <div className="contenido-biblioteca">
      {/* Columna izquierda: formulario + filtros */}
      <div className="col-formulario">
        <h3>{edit ? "Editar juego" : "Agregar juego"}</h3>
        <FormularioJuego
          initial={edit}
          onSubmit={(data) =>
            edit ? handleUpdate(edit._id, data) : handleCreate(data)
          }
        />

        {/*  Filtros */}
        <div style={{ marginTop: 20 }}>
          <FiltrosJuegos onFiltrar={filtrarJuegos} />
        </div>
      </div>

      {/*  Columna derecha: lista de juegos */}
      <div className="col-juegos">
        <h2 className="subtitulo">Mis juegos</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : juegos.length === 0 ? (
          <p className="small">No hay juegos que coincidan con los filtros.</p>
        ) : (
          <div className="grid-juegos">
            {juegos.map((j) => (
              <TarjetaJuego
                key={j._id}
                juego={j}
                onEditar={() => setEdit(j)}
                onEliminar={() => handleDelete(j._id)}
                onToggleCompletado={() => toggleCompletado(j)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

}

