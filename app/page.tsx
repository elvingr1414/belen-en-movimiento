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

  const [categoriaActiva, setCategoriaActiva] = useState("Todo");

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8f5ef 0%,#ffffff 55%,#eef2f7 100%)",
        fontFamily: "Georgia, serif",
        padding: "40px",
        color: "#1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1050px",
          textAlign: "center",
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
                onClick={() => setCategoriaActiva(categoria)}
                style={{
                  padding: "11px 20px",
                  borderRadius: "999px",
                  border: activa
                    ? "1px solid #1e3a8a"
                    : "1px solid #d1d5db",
                  background: activa ? "#1e3a8a" : "#ffffff",
                  color: activa ? "#ffffff" : "#475569",
                  fontSize: "0.95rem",
                  fontFamily: "Arial, sans-serif",
                  cursor: "pointer",
                  boxShadow: activa
                    ? "0 12px 30px rgba(30,58,138,0.22)"
                    : "none",
                  transition: "all 0.2s ease",
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
          Seleccione una categoría o escriba lo que desea encontrar en la red
          comunitaria de Belén.
        </p>
      </section>
    </main>
  );
}
