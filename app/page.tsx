"use client";

import { useState } from "react";

type Modulo = "Personas" | "Entidades" | "Actividades" | "Proyectos" | "Recursos" | "Comunicaciones";
type Accion = "Vista" | "Editar" | "Excluir" | "Vincular" | "Recursos" | "Nuevo";

const modulos: Modulo[] = ["Personas", "Entidades", "Actividades", "Proyectos", "Recursos", "Comunicaciones"];

const datos: Record<Modulo, string[]> = {
  Personas: [
    "Elvin González Rodríguez | Belén en Movimiento | Coordinador General",
    "Sonia Román Zeledón | CDAM Belén | Presidenta",
    "Zeneida Chávez Fernández | Municipalidad de Belén | Alcaldesa",
  ],
  Entidades: [
    "CDAM Belén | Agrupación",
    "Belén en Movimiento | Agrupación comunitaria",
    "Municipalidad de Belén | Institución",
    "Intel Costa Rica | Empresa",
  ],
  Actividades: ["Caravana Dorada | Actividad comunitaria", "Reunión de coordinación | Actividad interna"],
  Proyectos: ["Belén en Movimiento | Activo", "Bosque de Campanas | Propuesta"],
  Recursos: ["Acta Junta Directiva | Documento", "Logo Belén en Movimiento | Imagen"],
  Comunicaciones: ["Convocatoria comunitaria | Publicación", "Comunicado institucional | Noticia"],
};

export default function Home() {
  const [modulo, setModulo] = useState<Modulo>("Personas");
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [accion, setAccion] = useState<Accion>("Vista");

  const lista = datos[modulo].filter((x) => x.toLowerCase().includes(busqueda.toLowerCase()));

  function cambiarModulo(m: Modulo) {
    setModulo(m);
    setBusqueda("");
    setSeleccionado(null);
    setAccion("Vista");
  }

  return (
    <main style={page}>
      <section style={wrap}>
        <header style={{ textAlign: "center" }}>
          <p style={eyebrow}>COMUNIDAD • PARTICIPACIÓN • FUTURO</p>
          <h1 style={title}>Belén en Movimiento</h1>
          <p style={subtitle}>Juntos hacemos que Belén avance.</p>
        </header>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar en la plataforma..."
          style={search}
        />

        <nav style={chips}>
          {modulos.map((m) => (
            <button key={m} onClick={() => cambiarModulo(m)} style={chip(modulo === m)}>
              {icono(m)} {m}
            </button>
          ))}
        </nav>

        <section style={panel}>
          <div style={topLine}>
            <div>
              <h2 style={{ margin: 0 }}>{icono(modulo)} {modulo}</h2>
              {seleccionado && <strong>{seleccionado}</strong>}
            </div>

            <div style={actions}>
              {seleccionado && (
                <>
                  <button onClick={() => setAccion("Editar")} style={chip(accion === "Editar")}>Editar</button>
                  <button onClick={() => setAccion("Excluir")} style={chip(accion === "Excluir")}>Excluir</button>
                  <button onClick={() => setAccion("Vincular")} style={chip(accion === "Vincular")}>Vincular</button>
                  <button onClick={() => setAccion("Recursos")} style={chip(accion === "Recursos")}>Recursos</button>
                </>
              )}
              <button onClick={() => { setSeleccionado(null); setAccion("Nuevo"); }} style={primary}>
                + Nuevo
              </button>
            </div>
          </div>

          {!seleccionado && accion !== "Nuevo" && (
            <div style={list}>
              {lista.map((item) => (
                <button key={item} style={row} onClick={() => { setSeleccionado(item); setAccion("Vista"); }}>
                  {item}
                </button>
              ))}
            </div>
          )}

          {accion === "Nuevo" && <Formulario modulo={modulo} modo="Nuevo" />}

          {seleccionado && accion === "Vista" && <Formulario modulo={modulo} modo="Consulta" lectura />}

          {seleccionado && accion === "Editar" && <Formulario modulo={modulo} modo="Editar" />}

          {seleccionado && accion === "Excluir" && <Formulario modulo={modulo} modo="Excluir" lectura />}

          {seleccionado && accion === "Vincular" && (
            <div style={grid}>
              <input placeholder="Entidad / Persona relacionada" style={field} />
              <input placeholder="Puesto" style={field} />
              <input placeholder="¿Junta Directiva? Sí / No" style={field} />
              <input placeholder="Fecha inicio" style={field} />
              <button style={primary}>Guardar vínculo</button>
            </div>
          )}

          {seleccionado && accion === "Recursos" && (
            <div style={list}>
              <button style={row}>Foto de perfil | Imagen</button>
              <button style={row}>Acta relacionada | Documento</button>
              <button style={primary}>+ Agregar recurso</button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function Formulario({ modulo, modo, lectura = false }: { modulo: Modulo; modo: string; lectura?: boolean }) {
  return (
    <div style={{ marginTop: 20 }}>
      <p>Modo: <strong>{modo}</strong></p>

      <div style={grid}>
        {modulo === "Personas" ? (
          <>
            <input readOnly={lectura} placeholder="Cédula" style={field} />
            <input readOnly={lectura} placeholder="Nombre" style={field} />
            <input readOnly={lectura} placeholder="Primer apellido" style={field} />
            <input readOnly={lectura} placeholder="Segundo apellido" style={field} />
            <input readOnly={lectura} placeholder="Distrito" style={field} />
          </>
        ) : modulo === "Entidades" ? (
          <>
            <input readOnly={lectura} placeholder="Nombre de entidad" style={field} />
            <input readOnly={lectura} placeholder="Tipo de entidad" style={field} />
            <input readOnly={lectura} placeholder="Categoría" style={field} />
            <input readOnly={lectura} placeholder="Distrito" style={field} />
          </>
        ) : (
          <>
            <input readOnly={lectura} placeholder="Título / Nombre" style={field} />
            <input readOnly={lectura} placeholder="Tipo / Categoría" style={field} />
            <input readOnly={lectura} placeholder="Fecha" style={field} />
            <input readOnly={lectura} placeholder="Relacionado con" style={field} />
          </>
        )}
      </div>

      <textarea readOnly={lectura} placeholder="Descripción / observaciones" style={{ ...field, width: "100%", minHeight: 90, marginTop: 14 }} />

      <div style={{ textAlign: "right", marginTop: 18 }}>
        {modo === "Nuevo" && <button style={primary}>Guardar</button>}
        {modo === "Editar" && <button style={primary}>Guardar cambios</button>}
        {modo === "Excluir" && <button style={{ ...primary, background: "#991b1b" }}>Confirmar exclusión</button>}
      </div>
    </div>
  );
}

function icono(m: Modulo) {
  return { Personas: "👤", Entidades: "🏢", Actividades: "📅", Proyectos: "🚀", Recursos: "📚", Comunicaciones: "📢" }[m];
}

const page = { minHeight: "100vh", padding: 28, background: "linear-gradient(135deg,#f8f5ef,#ffffff,#eef2f7)", fontFamily: "Georgia, serif", color: "#1f2937" };
const wrap = { maxWidth: 1100, margin: "0 auto" };
const eyebrow = { letterSpacing: 4, color: "#64748b", fontSize: 12 };
const title = { fontSize: "clamp(2.6rem,7vw,5rem)", margin: "12px 0" };
const subtitle = { fontSize: 20, color: "#334155" };
const search = { width: "100%", padding: "18px 24px", borderRadius: 999, border: "1px solid #d1d5db", fontSize: 16, margin: "22px 0" };
const chips = { display: "flex", gap: 10, flexWrap: "wrap" as const, justifyContent: "center" };
const actions = { display: "flex", gap: 10, flexWrap: "wrap" as const };
const panel = { marginTop: 24, background: "rgba(255,255,255,.82)", border: "1px solid rgba(0,0,0,.08)", borderRadius: 28, padding: 26 };
const topLine = { display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" as const, alignItems: "center" };
const list = { display: "grid", gap: 10, marginTop: 18 };
const row = { textAlign: "left" as const, padding: "14px 18px", borderRadius: 14, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 15 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 18 };
const field = { padding: "14px 16px", borderRadius: 14, border: "1px solid #d1d5db", fontSize: 15, background: "white" };
const primary = { padding: "12px 22px", borderRadius: 999, border: "none", background: "#1e3a8a", color: "white", fontWeight: 700, cursor: "pointer" };

function chip(active: boolean) {
  return {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    background: active ? "#1e3a8a" : "white",
    color: active ? "white" : "#475569",
    cursor: "pointer",
  };
}
