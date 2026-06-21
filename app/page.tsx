"use client";

import { useState } from "react";

export default function Home() {
  const categorias = [
    "Todo",
    "Personas",
    "Agrupaciones",
    "Instituciones",
    "Actividades",
    "Proyectos",
  ];

  const datos = [
    { tipo: "Personas", nombre: "Elvin González Rodríguez", detalle: "Colaborador comunitario de Belén." },
    { tipo: "Personas", nombre: "Ana Rodríguez", detalle: "Voluntaria comunitaria." },
    { tipo: "Agrupaciones", nombre: "Centro Diurno del Adulto Mayor", detalle: "Agrupación de apoyo a personas adultas mayores." },
    { tipo: "Agrupaciones", nombre: "Asociación de Adultos Belemitas", detalle: "Organización comunitaria de adultos mayores." },
    { tipo: "Instituciones", nombre: "Municipalidad de Belén", detalle: "Institución pública local." },
    { tipo: "Instituciones", nombre: "Parroquia San Antonio de Belén", detalle: "Institución religiosa y comunitaria." },
    { tipo: "Actividades", nombre: "Caravana Dorada 2026", detalle: "Actividad en homenaje a personas adultas mayores." },
    { tipo: "Actividades", nombre: "Encuentro Comunitario", detalle: "Actividad de participación ciudadana." },
    { tipo: "Proyectos", nombre: "Belén en Movimiento", detalle: "Plataforma comunitaria del cantón." },
    { tipo: "Proyectos", nombre: "Registro de Agrupaciones", detalle: "Proyecto para organizar la información comunitaria." },
  ];

  const [categoriaActiva, setCategoriaActiva] = useState("Todo");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const resultados = datos
    .filter((item) => categoriaActiva === "Todo" || item.tipo === categoriaActiva)
    .filter((item) =>
      busqueda.trim() === ""
        ? true
        : item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  function buscar() {
    setMostrarResultados(true);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8f5ef 0%,#ffffff 55%,#eef2f7 100%)",
        fontFamily: "Georgia, serif",
        padding: "40px",
        color: "#1f2937",
      }}
    >
      <section
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "70px",
        }}
      >
        <p
          style={{
            letterSpacing: "4px",
            fontSize: "0.8rem",
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          COMUNIDAD • PARTICIPACIÓN • FUTURO
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem,8vw,5.5rem)",
            margin: "0 0 22px",
            lineHeight: 1,
          }}
        >
          Belén en Movimiento
        </h1>

        <p
          style={{
            fontSize: "1.45rem",
            marginBottom: "36px",
            color: "#334155",
          }}
        >
          Juntos hacemos que Belén avance.
        </p>

        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "999px",
            padding: "18px 26px",
            boxShadow: "0 18px 60px rgba(15,23,42,0.10)",
            border: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>🔍</span>

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscar();
            }}
            placeholder={`Buscar en ${categoriaActiva.toLowerCase()}...`}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              color: "#1f2937",
              fontFamily: "Arial, sans-serif",
              background: "transparent",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {categorias.map((categoria) => {
            const activa = categoriaActiva === categoria;

            return (
              <button
                key={categoria}
                onClick={() => {
                  setCategoriaActiva(categoria);
                  setMostrarResultados(false);
                  setBusqueda("");
                }}
                style={{
                  padding: "11px 20px",
                  borderRadius: "999px",
                  border: activa ? "1px solid #1e3a8a" : "1px solid #d1d5db",
                  background: activa ? "#1e3a8a" : "#ffffff",
                  color: activa ? "#ffffff" : "#475569",
                  fontSize: "0.95rem",
                  fontFamily: "Arial, sans-serif",
                  cursor: "pointer",
                  boxShadow: activa ? "0 12px 30px rgba(30,58,138,0.22)" : "none",
                }}
              >
                {categoria}
              </button>
            );
          })}
        </div>

        <p
          style={{
            marginTop: "34px",
            color: "#64748b",
            fontSize: "0.95rem",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Escriba una palabra y presione Enter. Si deja el campo vacío, se muestra
          el listado alfabético de la categoría seleccionada.
        </p>
      </section>

      {mostrarResultados && (
        <section
          style={{
            maxWidth: "900px",
            margin: "50px auto 0",
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0, textAlign: "center" }}>
            Resultados en {categoriaActiva}
          </h2>

          {resultados.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b" }}>
              No se encontraron resultados.
            </p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {resultados.map((item) => (
                <div
                  key={`${item.tipo}-${item.nombre}`}
                  style={{
                    padding: "18px 20px",
                    borderRadius: "18px",
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <strong>{item.nombre}</strong>
                  <p style={{ margin: "6px 0 0", color: "#64748b" }}>
                    {item.tipo} · {item.detalle}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
