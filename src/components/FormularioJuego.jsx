import React, { useEffect, useState } from "react";

export default function FormularioJuego({ initial = null, onSubmit }) {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    anoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
  });

  useEffect(() => {
    if (initial) setForm((prev) => ({ ...prev, ...initial }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submit(e) {
    e.preventDefault();

    if (!form.titulo || !form.genero || !form.plataforma) {
      return showToast(
        "Título, género y plataforma son requeridos",
        "warning"
      );
    }

    if (form.anoLanzamiento && isNaN(Number(form.anoLanzamiento))) {
      return showToast("El año de lanzamiento debe ser un número", "error");
    }

    const payload = { ...form };
    if (payload.anoLanzamiento)
      payload.anoLanzamiento = Number(payload.anoLanzamiento);

    onSubmit(payload);

    if (!initial) {
      setForm({
        titulo: "",
        genero: "",
        plataforma: "",
        anoLanzamiento: "",
        desarrollador: "",
        imagenPortada: "",
        descripcion: "",
        completado: false,
      });
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <input
        className="input"
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
      />
      <input
        className="input"
        name="genero"
        value={form.genero}
        onChange={handleChange}
        placeholder="Género"
      />
      <input
        className="input"
        name="plataforma"
        value={form.plataforma}
        onChange={handleChange}
        placeholder="Plataforma"
      />
      <input
        className="input"
        name="anoLanzamiento"
        type="number"
        value={form.anoLanzamiento}
        onChange={handleChange}
        placeholder="Año de lanzamiento"
      />
      <input
        className="input"
        name="desarrollador"
        value={form.desarrollador}
        onChange={handleChange}
        placeholder="Desarrollador"
      />
      <input
        className="input"
        name="imagenPortada"
        value={form.imagenPortada}
        onChange={handleChange}
        placeholder="URL de portada"
      />
      <textarea
        className="input"
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <label className="checkbox-label small">
        <input
          type="checkbox"
          name="completado"
          checked={form.completado}
          onChange={handleChange}
        />{" "}
        Completado
      </label>

      <div style={{ marginTop: 8 }}>
        <button className="btn" type="submit">
          {initial ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
