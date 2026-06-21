"use client";

import { useState } from "react";

const secciones = [
  "Inicio",
  "Personas",
  "Entidades",
  "Actividades",
  "Proyectos",
  "Recursos",
  "Comunicaciones",
  "Administración",
];

export default function Home() {
  const [seccion, setSeccion] = useState("Inicio");

  const cardStyle = {
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(30,41,59,0.10)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.06)",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f8f5ef,#ffffff,#eef2f7)",
        color: "#1f2933",
        fontFamily: "Georgia, serif",
        padding: "28px",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ letterSpacing: "0.35em", fontSize: "0.75rem" }}>
          COMUNIDAD · PARTICIPACIÓN · FUTURO
        </p>

        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", margin: "18px 0" }}>
          Belén en Movimiento
        </h1>

        <p style={{ fontSize: "1.35rem" }}>Juntos hacemos que Belén avance.</p>

        <input
          placeholder="Buscar personas, entidades, proyectos, recursos o comunicaciones..."
          style={{
            marginTop: "30px",
            width: "100%",
            maxWidth: "760px",
            padding: "18px 24px",
            borderRadius: "999px",
            border: "1px solid #d8dee9",
            fontSize: "1rem",
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginTop: "22px",
          }}
        >
          {secciones.map((item) => (
            <button
              key={item}
              onClick={() => setSeccion(item)}
              style={{
                padding: "11px 18px",
                borderRadius: "999px",
                border: "1px solid #d8dee9",
                background: seccion === item ? "#1e3a8a" : "white",
                color: seccion === item ? "white" : "#334155",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <section style={{ marginTop: "42px", textAlign: "left" }}>
          {seccion === "Inicio" && (
            <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
              {[
                ["👤 Personas", "Ciudadanos, líderes, voluntarios y funcionarios."],
                ["🏢 Entidades", "Empresas, instituciones y agrupaciones."],
                ["📅 Actividades", "Agenda comunitaria del cantón."],
                ["🚀 Proyectos", "Iniciativas activas de Belén."],
                ["📚 Recursos", "Actas, fotos, videos y documentos históricos."],
                ["📢 Comunicaciones", "Noticias, convocatorias y comunicados."],
              ].map(([titulo, texto]) => (
                <div key={titulo} style={cardStyle}>
                  <h2>{titulo}</h2>
                  <p>{texto}</p>
                </div>
              ))}
            </div>
          )}

          {seccion === "Personas" && (
            <div style={cardStyle}>
              <h2>👤 Personas</h2>
              <p>Administre ciudadanos, miembros, voluntarios y líderes comunales.</p>
              <button>+ Nueva Persona</button>
              <ul>
                <li>Elvin González Rodríguez — Coordinador General</li>
                <li>Sonia Román Zeledón — Junta Directiva CDAM</li>
                <li>Zeneida Chávez Fernández — Municipalidad de Belén</li>
              </ul>
            </div>
          )}

          {seccion === "Entidades" && (
            <div style={cardStyle}>
              <h2>🏢 Entidades</h2>
              <p>Empresas, instituciones, agrupaciones, fundaciones, comités e iglesias.</p>
              <button>+ Nueva Entidad</button>
              <ul>
                <li>Belén en Movimiento — Agrupación</li>
                <li>CDAM Belén — Agrupación</li>
                <li>Municipalidad de Belén — Institución</li>
                <li>Intel Costa Rica — Empresa</li>
              </ul>
            </div>
          )}

          {seccion === "Actividades" && (
            <div style={cardStyle}>
              <h2>📅 Actividades</h2>
              <p>Agenda comunal, reuniones, ferias, capacitaciones y eventos.</p>
              <ul>
                <li>Caravana Dorada</li>
                <li>Reunión de coordinación comunitaria</li>
                <li>Capacitación para voluntarios</li>
              </ul>
            </div>
          )}

          {seccion === "Proyectos" && (
            <div style={cardStyle}>
              <h2>🚀 Proyectos</h2>
              <p>Iniciativas que conectan personas, entidades y recursos.</p>
              <ul>
                <li>Belén en Movimiento — Activo</li>
                <li>Caravana Dorada — En organización</li>
                <li>Bosque de Campanas — Propuesta</li>
              </ul>
            </div>
          )}

          {seccion === "Recursos" && (
            <div style={cardStyle}>
              <h2>📚 Recursos</h2>
              <p>Memoria histórica y documental de la comunidad.</p>
              <ul>
                <li>Actas de Junta Directiva</li>
                <li>Reglamentos y estatutos</li>
                <li>Fotografías históricas</li>
                <li>Videos institucionales</li>
              </ul>
            </div>
          )}

          {seccion === "Comunicaciones" && (
            <div style={cardStyle}>
              <h2>📢 Comunicaciones</h2>
              <p>Centro de comunicación comunitaria para informar, compartir y movilizar.</p>
              <ul>
                <li>Noticias comunales</li>
                <li>Convocatorias</li>
                <li>Comunicados institucionales</li>
                <li>Publicaciones para redes sociales</li>
              </ul>
            </div>
          )}

          {seccion === "Administración" && (
            <div style={cardStyle}>
              <h2>⚙️ Administración</h2>
              <p>Gestión de datos, roles, permisos y validación comunitaria.</p>
              <ul>
                <li>Personas ↔ Entidades</li>
                <li>Puestos y juntas directivas</li>
                <li>Recursos documentales</li>
                <li>Redes sociales y contactos</li>
              </ul>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
