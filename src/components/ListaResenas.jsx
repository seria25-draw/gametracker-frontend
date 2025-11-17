import React from 'react';
import { resenasAPI } from '../api/api';


export default function ListaResenas({ resenas, onEditar, onEliminar }) {
  if (!resenas?.length) {
    return <p className="small">Aún no hay reseñas para este juego.</p>;
  }

  return (
    <div className="list">
      {resenas.map((r) => (
        <div key={r._id} className="card">
          <h4>⭐ {r.puntuacion} / 5</h4>
          <p>{r.textoResena}</p>
          <p className="small">
            Horas jugadas: {r.horasJugadas} | Dificultad: {r.dificultad}
          </p>
          <p className="small">
            {r.recomendaria ? '✅ Recomendado' : '❌ No recomendado'}
          </p>
          <div className="controls">
            <button className="btn ghost" onClick={() => onEditar(r)}>Editar</button>
            <button className="btn ghost" onClick={() => onEliminar(r._id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
