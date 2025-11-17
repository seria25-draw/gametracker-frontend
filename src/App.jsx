import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DetalleJuegoPage from "./pages/DetalleJuegoPage";
import Toast from "./components/Toast";
import EstadisticasPage from "./pages/EstadisticasPage";
export default function App() {
  // Estado global del Toast
  const [toast, setToast] = useState(null);

  // Función global para mostrar mensajes (puede usarse en cualquier componente)
  window.showToast = (message, type = "info") => {
    setToast({ message, type });
  };
  return (
    <BrowserRouter>
      <div className="app-container">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <header className="app-header">
          <div className="logo">
            <span>
              {" "}
              <img
                src="https://i.pinimg.com/originals/5c/b0/02/5cb002bb6af9a7c057e8a4708f851f78.gif"
                alt=""
                srcset=""
              />
            </span>
            <div>
              <h1>GameTracker</h1>
              <p>Gestiona tu biblioteca personal</p>
            </div>
          </div>

          <nav className="nav-links">
            <Link to="/" className="btn-ghost">
              Inicio
            </Link>
              <Link to="/estadisticas" className="btn-gradient">
              Estadísticas
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego/:id" element={<DetalleJuegoPage />} />
          <Route path="/estadisticas" element={<EstadisticasPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
