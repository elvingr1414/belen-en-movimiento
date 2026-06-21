"use client";

import { useState } from "react";

const modulos = ["Personas", "Entidades", "Actividades", "Proyectos", "Recursos", "Comunicaciones", "Vinculaciones"];

export default function Home() {
  const [modulo, setModulo] = useState("Personas");
  const [accion, setAccion] = useState("Consultar");

  const acciones =
    modulo === "Vinculaciones"
      ? ["Asignar", "Consultar", "Editar", "Finalizar"]
      : ["Nueva", "Consultar", "Editar", "Excluir"];

  const soloLectura = accion === "Consultar" || accion === "Excluir" || accion === "Finalizar";

  return (
    <main style={{ minHeight: "100vh", padding: 28, background: "linear-gradient(135deg,#f8f5ef,#ffffff,#eef2f7)", fontFamily: "Georgia, serif", color: "#1f2937" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ letterSpacing: 4, color: "#64748b", fontSize: 12 }}>COMUNIDAD • PARTICIPACIÓN • FUTURO</p>
          <h1 style={{ fontSize: "clamp(2.6rem,7vw,5rem)", margin: "12px 0" }}>Belén en Movimiento</h1>
          <p style={{ fontSize: 20, color: "#334155" }}>Juntos hacemos que Belén avance.</p>
        </div>

        <input
          placeholder="Buscar en la plataforma..."
          style={{ width: "100%", padding: "18px 24px", borderRadius: 999, border: "1px solid #d1d5db", fontSize: 16, marginBottom: 22 }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
          {modulos.map((m) => (
            <button key={m} onClick={() => { setModulo(m); setAccion(m === "Vinculaciones" ? "Asignar" : "Consultar"); }}
              style={{ padding: "11px 18px", borderRadius: 999, border: "1px solid #d1d5db", background: modulo === m ? "#1e3a8a" : "white", color: modulo === m ? "white" : "#475569", cursor: "pointer" }}>
              {m}
            </button>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,.82)", border: "1px solid rgba(0,0,0,.08)", borderRadius: 28, padding: 26, boxShadow: "0 20px 60px rgba(15,23,42,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
            <h2 style={{ margin: 0, flex: 1 }}>{icono(modulo)} {modulo}</h2>
            {acciones.map((a) => (
              <button key={a} onClick={() => setAccion(a)}
                style={{ padding: "10px 16px", borderRadius: 999, border: "1px solid #d1d5db", background: accion === a ? "#1e3a8a" : "white", color: accion === a ? "white" : "#475569", cursor: "pointer" }}>
                {a}
              </button>
            ))}
          </div>

          <h3>{accion} {modulo}</h3>

          {accion !== "Nueva" && accion !== "Asignar" && (
            <input placeholder={`Buscar ${modulo.toLowerCase()}...`} style={campo()} />
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 16 }}>
            {modulo === "Personas" && (
              <>
                <input readOnly={soloLectura} placeholder="Cédula" style={campo()} />
                <input readOnly={soloLectura} placeholder="Nombre" style={campo()} />
                <input readOnly={soloLectura} placeholder="Primer apellido" style={campo()} />
                <input readOnly={soloLectura} placeholder="Segundo apellido" style={campo()} />
                <input readOnly={soloLectura} placeholder="Distrito" style={campo()} />
              </>
            )}

            {modulo === "Entidades" && (
              <>
                <input readOnly={soloLectura} placeholder="Nombre de entidad" style={campo()} />
                <input readOnly={soloLectura} placeholder="Tipo: Empresa / Institución / Agrupación" style={campo()} />
                <input readOnly={soloLectura} placeholder="Categoría" style={campo()} />
                <input readOnly={soloLectura} placeholder="Distrito" style={campo()} />
              </>
            )}

            {modulo === "Vinculaciones" && (
              <>
                <input readOnly={soloLectura} placeholder="Persona" style={campo()} />
                <input readOnly={soloLectura} placeholder="Entidad" style={campo()} />
                <input readOnly={soloLectura} placeholder="Puesto" style={campo()} />
                <input readOnly={soloLectura} placeholder="¿Junta Directiva? Sí / No" style={campo()} />
              </>
            )}

            {!["Personas", "Entidades", "Vinculaciones"].includes(modulo) && (
              <>
                <input readOnly={soloLectura} placeholder="Título / Nombre" style={campo()} />
                <input readOnly={soloLectura} placeholder="Tipo / Categoría" style={campo()} />
                <input readOnly={soloLectura} placeholder="Fecha" style={campo()} />
                <input readOnly={soloLectura} placeholder="Relacionado con" style={campo()} />
              </>
            )}
          </div>

          <textarea readOnly={soloLectura} placeholder="Observaciones / descripción" style={{ ...campo(), width: "100%", marginTop: 14, minHeight: 90 }} />

          <div style={{ marginTop: 20, textAlign: "right" }}>
            {accion === "Consultar" && <button style={boton()}>Cerrar</button>}
            {accion === "Editar" && <button style={boton()}>Guardar cambios</button>}
            {accion === "Nueva" && <button style={boton()}>Guardar</button>}
            {accion === "Excluir" && <button style={boton("#991b1b")}>Confirmar exclusión</button>}
            {accion === "Asignar" && <button style={boton()}>Guardar vinculación</button>}
            {accion === "Finalizar" && <button style={boton("#991b1b")}>Finalizar vínculo</button>}
          </div>
        </div>
      </section>
    </main>
  );
}

function campo() {
  return { padding: "14px 16px", borderRadius: 14, border: "1px solid #d1d5db", fontSize: 15, background: "white" };
}

function boton(color = "#1e3a8a") {
  return { padding: "13px 24px", borderRadius: 999, border: "none", background: color, color: "white", fontWeight: 700, cursor: "pointer" };
}

function icono(m: string) {
  return {
    Personas: "👤",
    Entidades: "🏢",
    Actividades: "📅",
    Proyectos: "🚀",
    Recursos: "📚",
    Comunicaciones: "📢",
    Vinculaciones: "🔗",
  }[m];
}
