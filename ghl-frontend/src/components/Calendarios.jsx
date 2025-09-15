import React, { useState, useEffect } from "react";

function Calendarios({ darkMode }) {
  const [calendarios, setCalendarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Para Vista 2 (citas)
  const [citas, setCitas] = useState([]);
  const [loadingCitas, setLoadingCitas] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    calendarId: "",
    contactId: "",
    startTime: "",
    endTime: "",
    assignedUserId: "",
  });

  // 🔹 Función para cargar calendarios (Vista 1)
  const fetchCalendars = () => {
    fetch("http://127.0.0.1:8000/api/ghl/calendars/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener calendarios del backend");
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data.calendars)
          ? data.calendars
          : [];
        setCalendarios(lista);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend no disponible:", err);
        setCalendarios([]);
        setLoading(false);
      });
  };

  // 🔹 Función para cargar citas (Vista 2)
  const fetchCitas = () => {
    fetch("http://127.0.0.1:8000/api/ghl/appointments/9EVi5KI4pz7SRnMCohhC/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener citas del backend");
        return res.json();
      })
      .then((data) => {
        console.log("📦 Datos recibidos crudo:", data);

        let cita = null;

        // ✅ Caso correcto: la cita viene en "appointment"
        if (data?.appointment) {
          cita = {
            id: data.appointment.id || "N/A",
            nombre: data.appointment.title,
            estado: data.appointment.appointmentStatus,
          };
        }

        if (cita) {
          setCitas([cita]);
        } else {
          setCitas([]);
        }

        setLoadingCitas(false);
      })
      .catch((err) => {
        console.error("Backend no disponible (citas):", err);
        setCitas([]);
        setLoadingCitas(false);
      });
  };

  useEffect(() => {
    fetchCalendars();
    fetchCitas();
  }, []);

  const handleOpenModal = () => {
    setFormData({
      calendarId: "",
      contactId: "",
      startTime: "",
      endTime: "",
      assignedUserId: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ghl/appointments/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactId: formData.contactId,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            calendarId: formData.calendarId,
            assignedUserId: formData.assignedUserId,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al crear la cita");

      await response.json();

      fetchCalendars();
      fetchCitas();
      setShowModal(false);

      alert("✅ Cita creada correctamente en el backend");
    } catch (error) {
      console.error(error);
      alert("❌ Hubo un error al crear la cita");
    }
  };

  const estadoClase = (activo) =>
    activo ? "text-success fw-bold" : "text-danger fw-bold";
  const estadoTexto = (activo) => (activo ? "Activo" : "Inactivo");

  // 🔹 Colores para estados de citas
  const estadoColorCita = (estado) => {
    if (!estado) return { color: "gray", text: "Sin estado" };

    switch (estado.toLowerCase()) {
      case "confirmed":
        return { color: "green", text: "Confirmado" };
      case "cancelled":
        return { color: "red", text: "Cancelado" };
      case "rescheduled":
        return { color: "goldenrod", text: "Reprogramado" };
      default:
        return { color: "gray", text: estado };
    }
  };

  if (loading)
    return (
      <p className="text-center text-secondary" style={{ fontSize: "1.2rem" }}>
        Cargando calendarios...
      </p>
    );

  return (
    <div>
      {/* Tabla original (Vista 1) */}
      <div
        className="shadow p-4"
        style={{
          backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: darkMode ? "#444" : "#e0e0e0",
          boxShadow: darkMode
            ? "0 8px 24px rgba(0,0,0,0.6)"
            : "0 6px 20px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Calendarios (Vista 1)</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: darkMode ? "#ffffff" : "#333",
          }}
        >
          <thead
            style={{
              background: darkMode
                ? "#2c2c2c"
                : "linear-gradient(90deg, #4a90e2, #357ABD)",
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "0.3s",
            }}
          >
            <tr>
              <th style={{ padding: "12px 15px" }}>ID</th>
              <th style={{ padding: "12px 15px" }}>Nombre</th>
              <th style={{ padding: "12px 15px" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {calendarios.map((cal, index) => (
              <tr
                key={cal.id || index}
                style={{
                  cursor: "pointer",
                  backgroundColor: darkMode
                    ? index % 2 === 0
                      ? "#2a2a2a"
                      : "#252525"
                    : index % 2 === 0
                    ? "#f7f9fc"
                    : "#ffffff",
                  transition: "0.3s",
                }}
              >
                <td style={{ padding: "12px 15px" }}>{cal.id}</td>
                <td style={{ padding: "12px 15px" }}>{cal.name}</td>
                <td
                  style={{ padding: "12px 15px" }}
                  className={estadoClase(cal.isActive)}
                >
                  {estadoTexto(cal.isActive)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <button
            onClick={handleOpenModal}
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#4a90e2",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "0.3s",
            }}
          >
            Añadir Cita
          </button>
        </div>
      </div>

      {/* Segunda tabla (Vista 2 con citas) */}
      <div
        className="shadow p-4 mt-4"
        style={{
          backgroundColor: darkMode ? "#121212" : "#fafafa",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: darkMode ? "#333" : "#ddd",
          boxShadow: darkMode
            ? "0 8px 24px rgba(0,0,0,0.7)"
            : "0 6px 20px rgba(0,0,0,0.08)",
          transition: "0.3s",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Calendarios (Vista 2 - Citas)</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            color: darkMode ? "#eee" : "#333",
          }}
        >
          <thead
            style={{
              background: darkMode ? "#1f1f1f" : "#e6f0ff",
              color: darkMode ? "#fff" : "#333",
              fontWeight: "bold",
            }}
          >
            <tr>
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Nombre</th>
              <th style={{ padding: "10px" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {loadingCitas ? (
              <tr>
                <td colSpan="3" style={{ padding: "20px", color: "gray" }}>
                  Cargando citas...
                </td>
              </tr>
            ) : citas.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: "20px", color: "gray" }}>
                  No hay citas registradas
                </td>
              </tr>
            ) : (
              citas.map((cita, index) => {
                const estado = estadoColorCita(cita.estado);
                return (
                  <tr key={cita.id || index}>
                    <td>{cita.id}</td>
                    <td>{cita.nombre || "Sin nombre"}</td>
                    <td style={{ fontWeight: "bold", color: estado.color }}>
                      {estado.text}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal SOLO para Vista 1 */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: darkMode ? "#2c2c2c" : "#fff",
              padding: "32px",
              borderRadius: "16px",
              width: "420px",
              boxShadow: darkMode
                ? "0 10px 30px rgba(0,0,0,0.7)"
                : "0 8px 24px rgba(0,0,0,0.2)",
              color: darkMode ? "#fff" : "#333",
              transition: "0.3s",
            }}
          >
            <h3
              style={{
                marginBottom: "24px",
                textAlign: "center",
                color: "#4a90e2",
              }}
            >
              Crear Nueva Cita
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label>Calendar ID:</label>
                <input
                  type="text"
                  name="calendarId"
                  value={formData.calendarId}
                  onChange={handleChange}
                  placeholder="Ingresa el ID del calendario"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label>Contact ID:</label>
                <input
                  type="text"
                  name="contactId"
                  value={formData.contactId}
                  onChange={handleChange}
                  placeholder="Ingresa ID del contacto"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label>Assigned User ID:</label>
                <input
                  type="text"
                  name="assignedUserId"
                  value={formData.assignedUserId}
                  onChange={handleChange}
                  placeholder="Ingresa ID del usuario asignado"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label>Start Time:</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label>End Time:</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: "#4a90e2",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Crear Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendarios;
