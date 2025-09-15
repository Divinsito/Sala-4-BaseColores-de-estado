import React, { useState } from "react";
import Calendarios from "./components/Calendarios";
import reactLogo from "./assets/react-logo.png";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4 position-relative"
      style={{
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#333",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "0.3s",
      }}
    >
      {/* Toggle fijo en esquina superior derecha */}
      <div
        className="position-absolute"
        style={{ top: "20px", right: "20px", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span style={{ fontSize: "1.2rem" }}>{darkMode ? "🌙" : "☀️"}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Logo */}
      <div className="mb-3">
        <img src={reactLogo} alt="Logo React" style={{ width: "80px", height: "80px" }} />
      </div>

      {/* Título */}
      <h1
        className="text-center mb-5"
        style={{
          color: darkMode ? "#ffffff" : "#4a90e2",
          fontSize: "2.5rem",
          fontWeight: "700",
          textShadow: darkMode
            ? "0 0 8px rgba(255,255,255,0.5)"
            : "0 0 5px rgba(74,144,226,0.5)",
        }}
      >
        GHL Calendario – Tus Citas al Día
      </h1>

      <div className="w-100" style={{ maxWidth: "900px" }}>
        <div
          className="p-4 rounded-4 shadow-lg"
          style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
            border: "1px solid",
            borderColor: darkMode ? "#444" : "#e0e0e0",
            boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.1)",
            transition: "0.3s",
          }}
        >
          <Calendarios darkMode={darkMode} />
        </div>
      </div>

      {/* Estilos del toggle */}
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0;
          right: 0; bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #4a90e2;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
}

export default App;
