import React, { useEffect, useState } from "react";
import { juegosAPI, resenasAPI } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function EstadisticasPage() {
  const [data, setData] = useState({ juegos: [], resenas: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    // Refrescar datos automáticamente cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const [juegosRes, resenasRes] = await Promise.all([
        juegosAPI.all(),
        resenasAPI.all(),
      ]);
      setData({
        juegos: juegosRes.data,
        resenas: resenasRes.data,
      });
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando estadísticas...</p>;

  // Calculos
  const completados = data.juegos.filter((j) => j.completado).length;
  const noCompletados = data.juegos.length - completados;
  const promedioHoras = data.resenas.length
    ? data.resenas.reduce((acc, r) => acc + (r.horasJugadas || 0), 0) /
      data.resenas.length
    : 0;
  const promedioPuntuacion = data.resenas.length
    ? data.resenas.reduce((acc, r) => acc + (r.puntuacion || 0), 0) /
      data.resenas.length
    : 0;

  const colores = ["#ec4899", "#a855f7", "#60a5fa", "#10b981"];

  // Preparar datos para la gráfica "Juego más jugado"
  const topJuegos = [...data.resenas]
    .map((r) => ({
      nombreJuego:
        r.nombreJuego ||
        r.juego?.titulo || 
        r.juegoId?.titulo || 
        "Desconocido",
      horasJugadas: r.horasJugadas || r.horas || 0,
    }))
    .sort((a, b) => b.horasJugadas - a.horasJugadas)
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      <h1>Panel de Estadísticas</h1>
      <p>Visualiza tu progreso, rendimiento y hábitos de juego</p>

      <div className="stats-grid">
        {/*Estado de juegos */}
        <div className="stat-card">
          <h3>Estado de juegos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Completados", value: completados },
                  { name: "Pendientes", value: noCompletados },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                <Cell fill="#a855f7" />
                <Cell fill="#ec4899" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/*Horas jugadas */}
        <div className="stat-card">
          <h3>Horas jugadas por reseña</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.resenas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
              <XAxis dataKey="textoResena" hide />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="horasJugadas"
                fill="#a855f7"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* 🔹 Juego más jugado */}
        <div className="stat-card">
          <h3>Juego más jugado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topJuegos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
              <XAxis dataKey="nombreJuego" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="horasJugadas"
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/*Puntuaciones */}
        <div className="stat-card wide">
          <h3>Evolución de puntuaciones</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.resenas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
              <XAxis dataKey="textoResena" hide />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="puntuacion"
                stroke="#ec4899"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/*Resumen general */}
        <div className="stat-card wide">
          <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
            Resumen General
          </h3>
          <div className="summary-cards-horizontal-centered">
            {/* Total juegos */}
            <div className="summary-card-bright">
              <img
                src="https://media.giphy.com/media/Ll22OhMLAlVDb8UQWe/giphy.gif"
                alt="Total juegos"
                className="summary-icon"
              />
              <p>Total juegos: {data.juegos.length}</p>
              <div
                className="summary-bar-bright"
                style={{
                  width: `${Math.min(data.juegos.length * 5, 100)}%`,
                  backgroundColor: "#60a5fa",
                }}
              />
            </div>

            {/* Completados */}
            <div className="summary-card-bright">
              <img
                src="https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif"
                alt="Completados"
                className="summary-icon"
              />
              <p>Completados: {completados}</p>
              <div
                className="summary-bar-bright"
                style={{
                  width: `${(completados / data.juegos.length) * 100}%`,
                  backgroundColor: "#10b981",
                }}
              />
            </div>

            {/* Total reseñas */}
            <div className="summary-card-bright">
              <img
                src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
                alt="Total reseñas"
                className="summary-icon"
              />
              <p>Total reseñas: {data.resenas.length}</p>
              <div
                className="summary-bar-bright"
                style={{
                  width: `${Math.min(data.resenas.length * 10, 100)}%`,
                  backgroundColor: "#a855f7",
                }}
              />
            </div>

            {/* Promedio puntuación */}
            <div className="summary-card-bright">
              <img
                src="https://media.giphy.com/media/Yl5VGs2xYYq1H9QmZr/giphy.gif"
                alt="Puntuación"
                className="summary-icon"
              />
              <p>Promedio puntuación: {promedioPuntuacion.toFixed(1)}</p>
              <div
                className="summary-bar-bright"
                style={{
                  width: `${(promedioPuntuacion / 5) * 100}%`,
                  backgroundColor: "#ec4899",
                }}
              />
            </div>

            {/* Promedio horas */}
            <div className="summary-card-bright">
              <img
                src="https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif"
                alt="Promedio horas"
                className="summary-icon"
              />
              <p>Promedio horas: {promedioHoras.toFixed(1)}</p>
              <div
                className="summary-bar-bright"
                style={{
                  width: `${Math.min(promedioHoras * 10, 100)}%`,
                  backgroundColor: "#f59e0b",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
