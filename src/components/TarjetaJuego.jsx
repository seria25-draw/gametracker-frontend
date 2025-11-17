import React from 'react';
import { Link } from 'react-router-dom';

export default function TarjetaJuego({ juego, onEditar, onEliminar, onToggleCompletado }) {
  return (
    <div className="card carta-juego">
      <img src={juego.imagenPortada || 'https://via.placeholder.com/600x300?text=Portada'} alt={juego.titulo} className="card-media" />
      <h3>{juego.titulo}</h3>
      <p className="small">{juego.genero} • {juego.plataforma} • {juego.anoLanzamiento || '-'}</p>
      <p className="small">{juego.desarrollador || ''}</p>
      <div className="controls">
        <button className="btn" onClick={onToggleCompletado}>{juego.completado ? 'Marcar no completado' : 'Marcar completado'}</button>
        <button className="btn ghost" onClick={onEditar}>Editar</button>
        <button className="btn ghost" onClick={onEliminar}>Eliminar</button>
        <Link to={`/juego/${juego._id}`} className="btn ghost">Ver</Link>
      </div>
    </div>
  );
}
