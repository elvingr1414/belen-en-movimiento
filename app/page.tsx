"use client";

import { useState } from "react";

type Modulo =
  | "Personas"
  | "Entidades"
  | "Actividades"
  | "Proyectos"
  | "Recursos"
  | "Comunicaciones";

type Accion = "Consultar" | "Editar" | "Excluir" | "Vincular" | "Recursos";

const modulos: Modulo[] = [
  "Personas",
  "Entidades",
  "Actividades",
  "Proyectos",
  "Recursos",
  "Comunicaciones",
];

const datos = {
  Personas: [
    "Elvin González Rodríguez | Belén en Movimiento | Coordinador General",
    "Sonia Román Zeledón | CDAM Belén | Presidenta",
    "Zeneida Chávez Fernández | Municipalidad de Belén | Alcaldesa",
  ],
  Entidades: [
    "Belén en Movimiento | Agrupación comunitaria",
    "CDAM Belén | Agrupación",
    "Municipalidad de Belén | Institución",
    "Intel Costa Rica | Empresa",
  ],
  Actividades: [
    "Caravana Dorada | Actividad comunitaria",
    "Reunión de coordinación | Actividad interna",
  ],
  Proyectos: [
    "Belén en Movimiento | Activo",
    "Bosque de Campanas | Propuesta",
  ],
  Recursos: [
    "Acta Junta Directiva | Documento",
    "Logo Belén en Movimiento | Imagen",
  ],
  Comunicaciones: [
    "Convocatoria comunitaria | Publicación",
    "Comunicado institucional | Noticia",
  ],
};

export default function Home() {
  const [modulo, setModulo] = useState<Modulo>("Personas");
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [accion, setAccion] = useState<Accion>("Consultar");
  const [nuevo, setNuevo] = useState(false);

  const lista = datos[modulo].filter((item) =>
    item.toLowerCase().includes(busqueda.toLowerCase())
  );

  function cambiarModulo(m: Modulo) {
    setModulo(m);
    setBusqueda("");
    setSeleccionado(null);
    setNuevo(false);
    setAccion("Consultar");
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
          placeholder="Buscar en la plataforma..."
          style={search}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <nav style={chips}>
          {modulos.map((m) => (
            <button
              key={m}
              onClick={() => cambiarModulo(m)}
              style={chip(modulo === m)}
            >
              {icono(m)} {m}
            </button>
          ))}
        </nav>

        <section style={panel}>
          <div style={bar}>
            <h2 style={{ margin: 0 }}>
              {icono(modulo)} {modulo}
            </h2>

            <button
              style={primary}
              onClick={() => {
                setNuevo(true);
                setSeleccionado(null);
              }}
            >
              + Nuevo
            </button>
          </div>

          {!seleccionado && !nuevo && (
            <>
              <p style={hint}>
                Seleccione un registro de la lista o filtre con el buscador.
              </p>

              <div style={list}>
                {lista.map((item) => (
                  <button
                    key={item}
                    style={row}
                    onClick={() => {
                      setSeleccionado(item);
                      setAccion("Consultar");
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}

          {nuevo && (
            <Formulario
              titulo={`Nuevo registro en ${modulo}`}
              modo="nuevo"
              modulo={modulo}
            />
          )}

          {seleccionado && !nuevo && (
            <>
              <div style={bar}>
                <h3 style={{ margin: 0 }}>{seleccionado}</h3>

                <div style={chips}>
                  {["Consultar", "Editar", "Excluir", "Vincular", "Recursos"].map(
                    (a) => (
                      <button
                        key={a}
                        onClick={() => setAccion(a as Accion)}
                        style={chip(accion === a)}
                      >
                        {a}
                      </button>
                    )
                  )}
                </div>
              </div>

              <Formulario titulo={seleccionado} modo={accion} modulo={modulo} />
            </>
          )}
        </section>
      </section>
    </main>
  );
}

function Formulario({
  titulo,
  modo,
  modulo,
}: {
  titulo: string;
  modo: string;
  modulo: Modulo;
}) {
  const lectura = modo === "Consultar" || modo === "Excluir";

  return (
    <div style={{ marginTop: 22 }}>
      <p style={hint}>
        Modo: <strong>{modo}</strong>
      </p>

      <div style={grid}>
        {modulo === "Personas" && (
          <>
            <input readOnly={lectura} placeholder="Cédula" style={field} />
            <input readOnly={lectura} placeholder="Nombre" style={field} />
            <input readOnly={lectura} placeholder="Primer apellido" style={field} />
            <input readOnly={lectura} placeholder="Segundo apellido" style={field} />
            <input readOnly={lectura} placeholder="Distrito" style={field} />
          </>
        )}

        {modulo === "Entidades" && (
          <>
            <input readOnly={lectura} placeholder="Nombre de entidad" style={field} />
            <input readOnly={lectura} placeholder="Tipo de entidad" style={field} />
            <input readOnly={lectura} placeholder="Categoría" style={field} />
            <input readOnly={lectura} placeholder="Distrito" style={field} />
          </>
        )}

        {!["Personas", "Entidades"].includes(modulo) && (
          <>
            <input readOnly={lectura} placeholder="Título / Nombre" style={field} />
            <input readOnly={lectura} placeholder="Tipo / Categoría" style={field} />
            <input readOnly={lectura} placeholder="Fecha" style={field} />
            <input readOnly={lectura} placeholder="Relacionado con" style={field} />
          </>
        )}
      </div>

      <textarea
        readOnly={lectura}
        placeholder="Descripción / observaciones"
        style={{ ...field, width: "100%", minHeight: 90, marginTop: 14 }}
      />

      <div style={{ textAlign: "right", marginTop: 18 }}>
        {modo === "Consultar" && <button style={primary}>Cerrar</button>}
        {modo === "Editar" && <button style={primary}>Guardar cambios</button>}
        {modo === "nuevo" && <button style={primary}>Guardar</button>}
        {modo === "Excluir" && (
          <button style={{ ...primary, background: "#991b1b" }}>
            Confirmar exclusión
          </button>
        )}
        {modo === "Vincular" && <button style={primary}>Guardar vinculación</button>}
        {modo === "Recursos" && <button style={primary}>Agregar recurso</button>}
      </div>
    </div>
  );
}

function icono(m: Modulo) {
  return {
    Personas: "👤",
    Entidades: "🏢",
    Actividades: "📅",
    Proyectos: "🚀",
    Recursos: "📚",
    Comunicaciones: "📢",
  }[m];
}

const page = {
  minHeight: "100vh",
  padding: 28,
  background: "linear-gradient(135deg,#f8f5ef,#ffffff,#eef2f7)",
  fontFamily: "Georgia, serif",
  color: "#1f2937",
};

const wrap = { maxWidth: 1100, margin: "0 auto" };

const eyebrow = { letterSpacing: 4, color: "#64748b", fontSize: 12 };

const title = {
  fontSize: "clamp(2.6rem,7vw,5rem)",
  margin: "12px 0",
};

const subtitle = { fontSize: 20, color: "#334155" };

const search = {
  width: "100%",
  padding: "18px 24px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  fontSize: 16,
  marginTop: 22,
  marginBottom: 22,
};

const chips = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  justifyContent: "center",
};

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

const panel = {
  marginTop: 24,
  background: "rgba(255,255,255,.82)",
  border: "1px solid rgba(0,0,0,.08)",
  borderRadius: 28,
  padding: 26,
  boxShadow: "0 20px 60px rgba(15,23,42,.08)",
};

const bar = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
};

const hint = {
  color: "#64748b",
  fontFamily: "Arial, sans-serif",
};

const list = {
  display: "grid",
  gap: 10,
  marginTop: 18,
};

const row = {
  textAlign: "left" as const,
  padding: "14px 18px",
  borderRadius: 14,
  border: "1px solid #e5e7eb",
  background: "white",
  cursor: "pointer",
  fontSize: 15,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 14,
};

const field = {
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 15,
  background: "white",
};

const primary = {
  padding: "12px 22px",
  borderRadius: 999,
  border: "none",
  background: "#1e3a8a",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};
