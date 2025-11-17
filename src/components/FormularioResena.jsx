import React, { useEffect, useState } from "react";

export default function FormularioResena({ initial = null, onSubmit }) {
  const [form, setForm] = useState({
    puntuacion: 1,
    textoResena: "",
    horasJugadas: 0,
    dificultad: "Normal",
    recomendaria: true,
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.textoResena) return alert("Escribe una reseña.");
    onSubmit(form);
    if (!initial) {
      setForm({
        puntuacion: 1,
        textoResena: "",
        horasJugadas: 0,
        dificultad: "Normal",
        recomendaria: true,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h4>{initial ? "Editar Reseña" : "Nueva Reseña"}</h4>
      <label>Puntuación (1-5):</label>
      <input
        type="number"
        name="puntuacion"
        min="1"
        max="5"
        value={form.puntuacion}
        onChange={handleChange}
        className="input"
      />

      <label>Texto de reseña:</label>
      <textarea
        name="textoResena"
        value={form.textoResena}
        onChange={handleChange}
        className="input"
      />

      <label>Horas jugadas:</label>
      <input
        type="number"
        name="horasJugadas"
        min="1"
        value={form.horasJugadas}
        onChange={handleChange}
        className="input"
      />

      <label>Dificultad:</label>
      <select
        name="dificultad"
        value={form.dificultad}
        onChange={handleChange}
        className="input"
      >
        <option value="Fácil">Fácil</option>
        <option value="Normal">Normal</option>
        <option value="Difícil">Difícil</option>
      </select>

      <div className="checkbox-line-resena">
        <input
          type="checkbox"
          name="recomendaria"
          checked={form.recomendaria}
          onChange={handleChange}
          id="recomendaria"
        />
        <label htmlFor="recomendaria">¿Lo recomendarías?</label>
      </div>

      <button type="submit" className="btn" style={{ marginTop: 10 }}>
        {initial ? "Actualizar Reseña" : "Guardar Reseña"}
      </button>
    </form>
  );
}
