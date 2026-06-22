"use client";

import { useState } from "react";

type Modulo =

  | "Personas"

  | "Entidades"

  | "Actividades"

  | "Proyectos"

  | "Recursos"

  | "Comunicaciones";

type Accion = "Vista" | "Editar" | "Excluir" | "Vincular" | "Recursos" | "Nuevo";

const modulos: Modulo[] = [

  "Personas",

  "Entidades",

  "Actividades",

  "Proyectos",

  "Recursos",

  "Comunicaciones",

];

const datos: Record<Modulo, any[]> = {

  Personas: [

    {

      nombre: "Elvin",

      apellido1: "González",

      apellido2: "Rodríguez",

      cedula: "000000000",

      distrito: "San Antonio",

      telefono: "8888-0000",

      correo: "elvin@email.com",

      entidad: "Belén en Movimiento",

      puesto: "Coordinador General",

    },

    {

      nombre: "Sonia",

      apellido1: "Román",

      apellido2: "Zeledón",

      cedula: "000000001",

      distrito: "Belén",

      telefono: "8888-1111",

      correo: "sonia@email.com",

      entidad: "CDAM Belén",

      puesto: "Presidenta",

    },

    {

      nombre: "Zeneida",

      apellido1: "Chávez",

      apellido2: "Fernández",

      cedula: "000000002",

      distrito: "Belén",

      telefono: "8888-2222",

      correo: "zeneida@email.com",

      entidad: "Municipalidad de Belén",

      puesto: "Alcaldesa",

    },

  ],

  Entidades: [

    {

      nombre: "CDAM Belén",

      tipo: "Agrupación",

      categoria: "Adulto Mayor",

      distrito: "Belén",

      telefono: "2233-0000",

      correo: "info@cdam.cr",

    },

    {

      nombre: "Belén en Movimiento",

      tipo: "Agrupación comunitaria",

      categoria: "Participación ciudadana",

      distrito: "Belén",

      telefono: "8888-3333",

      correo: "info@belenmovimiento.cr",

    },

    {

      nombre: "Municipalidad de Belén",

      tipo: "Institución",

      categoria: "Gobierno local",

      distrito: "San Antonio",

      telefono: "2587-0000",

      correo: "info@belen.go.cr",

    },

    {

      nombre: "Intel Costa Rica",

      tipo: "Empresa",

      categoria: "Tecnología",

      distrito: "La Ribera",

      telefono: "2200-0000",

      correo: "contacto@intel.com",

    },

  ],

  Actividades: [

    {

      nombre: "Caravana Dorada",

      tipo: "Comunitaria",

      fecha: "07/06/2026",

      relacionado: "CDAM Belén",

    },

    {

      nombre: "Reunión de coordinación",

      tipo: "Interna",

      fecha: "20/06/2026",

      relacionado: "Belén en Movimiento",

    },

  ],

  Proyectos: [

    {

      nombre: "Belén en Movimiento",

      tipo: "Comunitario",

      fecha: "2026",

      relacionado: "Cantón de Belén",

    },

    {

      nombre: "Bosque de Campanas",

      tipo: "Ambiental",

      fecha: "2026",

      relacionado: "Belén",

    },

  ],

  Recursos: [

    {

      nombre: "Acta Junta Directiva",

      tipo: "Documento",

      fecha: "2026",

      relacionado: "CDAM Belén",

    },

    {

      nombre: "Logo Belén en Movimiento",

      tipo: "Imagen",

      fecha: "2026",

      relacionado: "Belén en Movimiento",

    },

  ],

  Comunicaciones: [

    {

      nombre: "Convocatoria comunitaria",

      tipo: "Publicación",

      fecha: "2026",

      relacionado: "Redes sociales",

    },

    {

      nombre: "Comunicado institucional",

      tipo: "Noticia",

      fecha: "2026",

      relacionado: "Web",

    },

  ],

};

const puestos = [

  "Presidente",

  "Vicepresidente",

  "Secretario",

  "Tesorero",

  "Vocal",

  "Coordinador General",

  "Miembro",

  "Voluntario",

  "Empleado",

  "Funcionario",

];

export default function Home() {

  const [modulo, setModulo] = useState<Modulo>("Personas");

  const [busqueda, setBusqueda] = useState("");

  const [seleccionado, setSeleccionado] = useState<any | null>(null);

  const [accion, setAccion] = useState<Accion>("Vista");

  const [busquedaVinculo, setBusquedaVinculo] = useState("");

  const [vinculoSeleccionado, setVinculoSeleccionado] = useState<any | null>(null);

  const lista = datos[modulo].filter((item) =>

    JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase())

  );

  const listaVinculo =

    modulo === "Personas"

      ? datos.Entidades.filter((item) =>

          JSON.stringify(item).toLowerCase().includes(busquedaVinculo.toLowerCase())

        )

      : datos.Personas.filter((item) =>

          JSON.stringify(item).toLowerCase().includes(busquedaVinculo.toLowerCase())

        );

  function cambiarModulo(m: Modulo) {

    setModulo(m);

    setBusqueda("");

    setSeleccionado(null);

    setAccion("Vista");

    setBusquedaVinculo("");

    setVinculoSeleccionado(null);

  }

  function volverALista(valorActual?: string) {

    if (valorActual !== undefined) setBusqueda(valorActual);

    setSeleccionado(null);

    setAccion("Vista");

    setBusquedaVinculo("");

    setVinculoSeleccionado(null);

  }

  return (

    <main style={page}>

      <section style={wrap}>

        <header style={{ textAlign: "center" }}>

          <p style={eyebrow}>COMUNIDAD • PARTICIPACIÓN • FUTURO</p>

          <h1 style={title}>Belén en Movimiento</h1>

        </header>

        <input

          value={busqueda}

          onFocus={() => volverALista()}

          onChange={(e) => volverALista(e.target.value)}

          onKeyDown={(e) => {

            if (e.key === "Enter") volverALista();

          }}

          placeholder="Buscar..."

          style={search}

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

          <div style={topLine}>

            <h2 style={sectionTitle}>

              {seleccionado

                ? tituloRegistro(seleccionado)

                : `${icono(modulo)} ${modulo}`}

            </h2>

            <div style={actions}>

              {seleccionado && (

                <>

                  <button title="Editar" onClick={() => setAccion("Editar")} style={iconButton(accion === "Editar")}>✏️</button>

                  <button title="Excluir" onClick={() => setAccion("Excluir")} style={iconButton(accion === "Excluir")}>🗑️</button>

                  <button title="Vincular" onClick={() => { setAccion("Vincular"); setBusquedaVinculo(""); setVinculoSeleccionado(null); }} style={iconButton(accion === "Vincular")}>🔗</button>

                  <button title="Recursos" onClick={() => setAccion("Recursos")} style={iconButton(accion === "Recursos")}>📎</button>

                </>

              )}

              <button

                title="Nuevo"

                onClick={() => {

                  setSeleccionado(null);

                  setAccion("Nuevo");

                  setBusquedaVinculo("");

                  setVinculoSeleccionado(null);

                }}

                style={iconPrimary}

              >

                +

              </button>

            </div>

          </div>

          {!seleccionado && accion !== "Nuevo" && (

            <div style={scrollArea}>

              <div style={listWide}>

                {lista.map((item, index) => (

                  <button

                    key={index}

                    style={rowWide}

                    onClick={() => {

                      setSeleccionado(item);

                      setAccion("Vista");

                    }}

                  >

                    {lineaConsulta(modulo, item)}

                  </button>

                ))}

              </div>

            </div>

          )}

          {accion === "Nuevo" && <Formulario modulo={modulo} datos={null} />}

          {seleccionado && accion === "Vista" && (

            <Formulario modulo={modulo} datos={seleccionado} lectura />

          )}

          {seleccionado && accion === "Editar" && (

            <Formulario modulo={modulo} datos={seleccionado} />

          )}

          {seleccionado && accion === "Excluir" && (

            <>

              <Formulario modulo={modulo} datos={seleccionado} lectura />

              <div style={{ textAlign: "right", marginTop: 10 }}>

                <button style={{ ...primary, background: "#991b1b" }}>

                  Confirmar exclusión

                </button>

              </div>

            </>

          )}

          {seleccionado && accion === "Vincular" && (

            <div style={{ marginTop: 12 }}>

              <input

                value={busquedaVinculo}

                onChange={(e) => {

                  setBusquedaVinculo(e.target.value);

                  setVinculoSeleccionado(null);

                }}

                placeholder={

                  modulo === "Personas"

                    ? "Buscar entidad para vincular..."

                    : "Buscar persona para vincular..."

                }

                style={searchSmall}

              />

              {!vinculoSeleccionado && (

                <div style={scrollArea}>

                  <div style={listWide}>

                    {listaVinculo.map((item, index) => (

                      <button

                        key={index}

                        style={rowWide}

                        onClick={() => setVinculoSeleccionado(item)}

                      >

                        {modulo === "Personas"

                          ? lineaConsulta("Entidades", item)

                          : lineaConsulta("Personas", item)}

                      </button>

                    ))}

                  </div>

                </div>

              )}

              {vinculoSeleccionado && (

                <div style={grid}>

                  <input

                    readOnly

                    value={tituloRegistro(vinculoSeleccionado)}

                    style={field}

                  />

                  <select style={field} defaultValue="">

                    <option value="" disabled>Seleccione puesto</option>

                    {puestos.map((p) => (

                      <option key={p} value={p}>{p}</option>

                    ))}

                  </select>

                  <select style={field} defaultValue="No">

                    <option>Sí</option>

                    <option>No</option>

                  </select>

                  <input type="date" style={field} />

                  <button style={primary}>Guardar vínculo</button>

                </div>

              )}

            </div>

          )}

          {seleccionado && accion === "Recursos" && (

            <div style={list}>

              <button style={rowSimple}>📷 Foto principal | Imagen</button>

              <button style={rowSimple}>📄 Acta relacionada | Documento</button>

              <button style={primary}>+ Agregar recurso</button>

            </div>

          )}

        </section>

      </section>

    </main>

  );

}

function Formulario({

  modulo,

  datos,

  lectura = false,

}: {

  modulo: Modulo;

  datos: any | null;

  lectura?: boolean;

}) {

  return (

    <div style={{ marginTop: 12 }}>

      <div style={grid}>

        {modulo === "Personas" ? (

          <>

            <input readOnly={lectura} placeholder="Cédula" defaultValue={datos?.cedula || ""} style={field} />

            <input readOnly={lectura} placeholder="Nombre" defaultValue={datos?.nombre || ""} style={field} />

            <input readOnly={lectura} placeholder="Primer apellido" defaultValue={datos?.apellido1 || ""} style={field} />

            <input readOnly={lectura} placeholder="Segundo apellido" defaultValue={datos?.apellido2 || ""} style={field} />

            <input readOnly={lectura} placeholder="Distrito" defaultValue={datos?.distrito || ""} style={field} />

            <input readOnly={lectura} placeholder="Teléfono principal" defaultValue={datos?.telefono || ""} style={field} />

            <input readOnly={lectura} placeholder="Correo principal" defaultValue={datos?.correo || ""} style={field} />

            <input readOnly={lectura} placeholder="Entidad principal" defaultValue={datos?.entidad || ""} style={field} />

            <input readOnly={lectura} placeholder="Puesto principal" defaultValue={datos?.puesto || ""} style={field} />

          </>

        ) : modulo === "Entidades" ? (

          <>

            <input readOnly={lectura} placeholder="Nombre de entidad" defaultValue={datos?.nombre || ""} style={field} />

            <input readOnly={lectura} placeholder="Tipo de entidad" defaultValue={datos?.tipo || ""} style={field} />

            <input readOnly={lectura} placeholder="Categoría" defaultValue={datos?.categoria || ""} style={field} />

            <input readOnly={lectura} placeholder="Distrito" defaultValue={datos?.distrito || ""} style={field} />

            <input readOnly={lectura} placeholder="Teléfono principal" defaultValue={datos?.telefono || ""} style={field} />

            <input readOnly={lectura} placeholder="Correo principal" defaultValue={datos?.correo || ""} style={field} />

          </>

        ) : (

          <>

            <input readOnly={lectura} placeholder="Título / Nombre" defaultValue={datos?.nombre || ""} style={field} />

            <input readOnly={lectura} placeholder="Tipo / Categoría" defaultValue={datos?.tipo || ""} style={field} />

            <input readOnly={lectura} placeholder="Fecha" defaultValue={datos?.fecha || ""} style={field} />

            <input readOnly={lectura} placeholder="Relacionado con" defaultValue={datos?.relacionado || ""} style={field} />

          </>

        )}

      </div>

      <textarea

        readOnly={lectura}

        placeholder="Descripción / observaciones"

        style={{

          ...field,

          width: "100%",

          boxSizing: "border-box",

          minHeight: 64,

          marginTop: 10,

        }}

      />

      {!lectura && (

        <div style={{ textAlign: "right", marginTop: 10 }}>

          <button style={primary}>Guardar</button>

        </div>

      )}

    </div>

  );

}

function tituloRegistro(item: any) {

  return item.nombre

    ? `${item.nombre} ${item.apellido1 || ""} ${item.apellido2 || ""}`.trim()

    : "";

}

function lineaConsulta(modulo: Modulo, item: any) {

  if (modulo === "Personas") {

    return `👤 ${item.nombre} ${item.apellido1} ${item.apellido2}   |   📞 ${item.telefono}   |   ✉ ${item.correo}   |   🏢 ${item.entidad}   |   🎖 ${item.puesto}`;

  }

  if (modulo === "Entidades") {

    return `🏢 ${item.nombre}   |   📞 ${item.telefono}   |   ✉ ${item.correo}   |   ${item.tipo}   |   📍 ${item.distrito}`;

  }

  return `${item.nombre}   |   ${item.tipo}   |   📅 ${item.fecha || ""}   |   ${item.relacionado || ""}`;

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

  padding: 18,

  background: "linear-gradient(135deg,#f8f5ef,#ffffff,#eef2f7)",

  fontFamily: "Georgia, serif",

  color: "#1f2937",

};

const wrap = { maxWidth: 1100, margin: "0 auto" };

const eyebrow = {

  letterSpacing: 3,

  color: "#64748b",

  fontSize: 11,

  margin: 0,

};

const title = {

  fontSize: "clamp(2.1rem,6vw,4.2rem)",

  margin: "6px 0 12px",

};

const search = {

  width: "100%",

  padding: "14px 20px",

  borderRadius: 999,

  border: "1px solid #d1d5db",

  fontSize: 15,

  margin: "10px 0 14px",

  boxSizing: "border-box" as const,

};

const searchSmall = {

  ...search,

  margin: "0 0 10px",

};

const chips = {

  display: "flex",

  gap: 8,

  flexWrap: "wrap" as const,

  justifyContent: "center",

};

const actions = {

  display: "flex",

  gap: 8,

  flexWrap: "nowrap" as const,

  overflowX: "auto" as const,

};

const panel = {

  marginTop: 16,

  background: "rgba(255,255,255,.86)",

  border: "1px solid rgba(0,0,0,.08)",

  borderRadius: 22,

  padding: 16,

  overflow: "hidden",

};

const topLine = {

  display: "flex",

  justifyContent: "space-between",

  gap: 10,

  flexWrap: "wrap" as const,

  alignItems: "center",

};

const sectionTitle = { margin: 0, fontSize: 22 };

const list = {

  display: "grid",

  gap: 8,

  marginTop: 14,

};

const scrollArea = {

  marginTop: 14,

  overflowX: "auto" as const,

  overflowY: "hidden" as const,

  WebkitOverflowScrolling: "touch" as const,

  paddingBottom: 4,

};

const listWide = {

  display: "grid",

  gap: 8,

  minWidth: 820,

};

const rowWide = {

  textAlign: "left" as const,

  padding: "10px 12px",

  borderRadius: 12,

  border: "1px solid #e5e7eb",

  background: "white",

  cursor: "pointer",

  fontSize: 14,

  whiteSpace: "nowrap" as const,

  overflow: "visible",

};

const rowSimple = {

  textAlign: "left" as const,

  padding: "10px 12px",

  borderRadius: 12,

  border: "1px solid #e5e7eb",

  background: "white",

  cursor: "pointer",

  fontSize: 14,

};

const grid = {

  display: "grid",

  gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",

  gap: 10,

  marginTop: 12,

};

const field = {

  padding: "12px 14px",

  borderRadius: 12,

  border: "1px solid #d1d5db",

  fontSize: 14,

  background: "white",

  boxSizing: "border-box" as const,

};

const primary = {

  padding: "10px 18px",

  borderRadius: 999,

  border: "none",

  background: "#1e3a8a",

  color: "#ffffff",

  fontWeight: 700,

  cursor: "pointer",

};

const iconPrimary = {

  width: 42,

  height: 42,

  padding: 0,

  borderRadius: 999,

  border: "none",

  background: "#1e3a8a",

  color: "#ffffff",

  fontWeight: 900,

  fontSize: 30,

  lineHeight: "42px",

  cursor: "pointer",

};

function chip(active: boolean) {

  return {

    padding: "9px 14px",

    borderRadius: 999,

    border: "1px solid #d1d5db",

    background: active ? "#1e3a8a" : "white",

    color: active ? "white" : "#475569",

    cursor: "pointer",

    whiteSpace: "nowrap" as const,

  };

}

function iconButton(active: boolean) {

  return {

    width: 42,

    height: 42,

    borderRadius: 999,

    border: "1px solid #d1d5db",

    background: active ? "#1e3a8a" : "white",

    color: active ? "white" : "#475569",

    cursor: "pointer",

    fontSize: 18,

  };

}
