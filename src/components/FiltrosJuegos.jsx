import React, { useState } from 'react';

export default function FiltrosJuegos({ onFiltrar }) {
  const [filtros, setFiltros] = useState({
    texto: '',
    genero: '',
    plataforma: '',
    completado: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFiltrar(filtros);
  }

  function limpiar() {
    const inicial = { texto: '', genero: '', plataforma: '', completado: '' };
    setFiltros(inicial);
    onFiltrar(inicial);
  }

  return (
    <div className="card">
      <h3>Filtros</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="texto"
          placeholder="Buscar por título o desarrollador..."
          value={filtros.texto}
          onChange={handleChange}
        />
        <select
          className="input"
          name="genero"
          value={filtros.genero}
          onChange={handleChange}
        >
          <option value="">Todos los géneros</option>
          <option value="Acción">Acción</option>
          <option value="RPG">RPG</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Aventura">Aventura</option>
          <option value="Simulación">Simulación</option>
        </select>

        <select
          className="input"
          name="plataforma"
          value={filtros.plataforma}
          onChange={handleChange}
        >
          <option value="">Todas las plataformas</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo">Nintendo</option>
        </select>

        <select
          className="input"
          name="completado"
          value={filtros.completado}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="true">Completados</option>
          <option value="false">No completados</option>
        </select>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" type="submit">Aplicar filtros</button>
          <button className="btn ghost" type="button" onClick={limpiar}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}
