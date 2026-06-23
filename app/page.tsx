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

const personasBase = [
  { id: "p1", nombre: "Elvin", apellido1: "González", apellido2: "Rodríguez", cedula: "000000000", distrito: "San Antonio", telefono: "8888-0000", correo: "elvin@email.com" },
  { id: "p2", nombre: "Sonia", apellido1: "Román", apellido2: "Zeledón", cedula: "000000001", distrito: "Belén", telefono: "8888-1111", correo: "sonia@email.com" },
  { id: "p3", nombre: "Zeneida", apellido1: "Chávez", apellido2: "Fernández", cedula: "000000002", distrito: "Belén", telefono: "8888-2222", correo: "zeneida@email.com" },
];

const entidadesBase = [
  { id: "e1", nombre: "CDAM Belén", tipo: "Agrupación", categoria: "Adulto Mayor", distrito: "Belén", telefono: "2233-0000", correo: "info@cdam.cr" },
  { id: "e2", nombre: "Belén en Movimiento", tipo: "Agrupación comunitaria", categoria: "Participación ciudadana", distrito: "Belén", telefono: "8888-3333", correo: "info@belenmovimiento.cr" },
  { id: "e3", nombre: "Municipalidad de Belén", tipo: "Institución", categoria: "Gobierno local", distrito: "San Antonio", telefono: "2587-0000", correo: "info@belen.go.cr" },
  { id: "e4", nombre: "Intel Costa Rica", tipo: "Empresa", categoria: "Tecnología", distrito: "La Ribera", telefono: "2200-0000", correo: "contacto@intel.com" },
];

const datosBase: Record<Modulo, any[]> = {
  Personas: personasBase,
  Entidades: entidadesBase,
  Actividades: [
    { id: "a1", nombre: "Caravana Dorada", tipo: "Comunitaria", fecha: "07/06/2026", relacionado: "CDAM Belén" },
    { id: "a2", nombre: "Reunión de coordinación", tipo: "Interna", fecha: "20/06/2026", relacionado: "Belén en Movimiento" },
  ],
  Proyectos: [
    { id: "pr1", nombre: "Belén en Movimiento", tipo: "Comunitario", fecha: "2026", relacionado: "Cantón de Belén" },
    { id: "pr2", nombre: "Bosque de Campanas", tipo: "Ambiental", fecha: "2026", relacionado: "Belén" },
  ],
  Recursos: [],
  Comunicaciones: [
    { id: "c1", nombre: "Convocatoria comunitaria", tipo: "Publicación", fecha: "2026", relacionado: "Redes sociales" },
    { id: "c2", nombre: "Comunicado institucional", tipo: "Noticia", fecha: "2026", relacionado: "Web" },
  ],
};

const puestos = ["Presidente", "Vicepresidente", "Secretario", "Tesorero", "Vocal", "Coordinador General", "Miembro", "Voluntario", "Empleado", "Funcionario"];

const tiposRecurso = [
  "Fotografía",
  "Acta Junta Directiva",
  "Acta Asamblea",
  "Documento varios",
  "Logo",
  "Video",
  "Certificado",
  "Formulario",
  "Cotización",
  "Factura",
  "Contrato",
  "Convenio",
  "Otro",
];

const visibilidades = ["Público", "Privado", "Compartido"];

export default function Home() {
  const [modulo, setModulo] = useState<Modulo>("Personas");
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<any | null>(null);
  const [accion, setAccion] = useState<Accion>("Vista");

  const [vinculos, setVinculos] = useState<any[]>([
    { personaId: "p2", entidadId: "e1", puesto: "Presidenta", directiva: "Sí", fecha: "2026-01-15" },
    { personaId: "p2", entidadId: "e2", puesto: "Coordinadora", directiva: "No", fecha: "2026-06-01" },
    { personaId: "p1", entidadId: "e2", puesto: "Coordinador General", directiva: "Sí", fecha: "2026-06-01" },
  ]);

  const [recursos, setRecursos] = useState<any[]>([
    {
      id: "r1",
      tipo: "Acta Junta Directiva",
      descripcion: "Acta Junta Directiva Enero 2026",
      ubicacion: "Drive / CDAM / Actas",
      visibilidad: "Compartido",
      observaciones: "Documento de ejemplo",
      propietarioTipo: "Entidades",
      propietarioId: "e1",
    },
    {
      id: "r2",
      tipo: "Fotografía",
      descripcion: "Foto Sonia Román",
      ubicacion: "Drive / Personas / Sonia",
      visibilidad: "Privado",
      observaciones: "Fotografía de perfil",
      propietarioTipo: "Personas",
      propietarioId: "p2",
    },
  ]);

  const [recursoVinculos, setRecursoVinculos] = useState<any[]>([
    { recursoId: "r1", destinoTipo: "Entidades", destinoId: "e1" },
    { recursoId: "r2", destinoTipo: "Personas", destinoId: "p2" },
  ]);

  const [busquedaVinculo, setBusquedaVinculo] = useState("");
  const [mostrarListaVinculo, setMostrarListaVinculo] = useState(false);
  const [vinculoSeleccionado, setVinculoSeleccionado] = useState<any | null>(null);
  const [puesto, setPuesto] = useState("");
  const [directiva, setDirectiva] = useState("No");
  const [fecha, setFecha] = useState("");

  const [recursoForm, setRecursoForm] = useState({
    tipo: "Fotografía",
    descripcion: "",
    ubicacion: "",
    visibilidad: "Público",
    observaciones: "",
    propietarioTipo: "Entidades",
    propietarioId: "e1",
  });

  const [tipoDestinoRecurso, setTipoDestinoRecurso] = useState<"Personas" | "Entidades">("Entidades");
  const [busquedaDestinoRecurso, setBusquedaDestinoRecurso] = useState("");
  const [mostrarListaDestinoRecurso, setMostrarListaDestinoRecurso] = useState(false);
  const [destinoRecursoSeleccionado, setDestinoRecursoSeleccionado] = useState<any | null>(null);

  const lista =
    modulo === "Recursos"
      ? recursos.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase())
        )
      : datosBase[modulo].filter((item) =>
          JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase())
        );

  const listaVinculo =
    modulo === "Personas"
      ? entidadesBase.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(busquedaVinculo.toLowerCase())
        )
      : personasBase.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(busquedaVinculo.toLowerCase())
        );

  const listaDestinoRecurso =
    tipoDestinoRecurso === "Entidades"
      ? entidadesBase.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(busquedaDestinoRecurso.toLowerCase())
        )
      : personasBase.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(busquedaDestinoRecurso.toLowerCase())
        );

  function cambiarModulo(m: Modulo) {
    setModulo(m);
    setBusqueda("");
    setSeleccionado(null);
    setAccion("Vista");
    limpiarVinculo();
    limpiarRecursoDestino();
  }

  function volverALista(valorActual?: string) {
    if (valorActual !== undefined) setBusqueda(valorActual);
    setSeleccionado(null);
    setAccion("Vista");
    limpiarVinculo();
    limpiarRecursoDestino();
  }

  function limpiarVinculo() {
    setBusquedaVinculo("");
    setMostrarListaVinculo(false);
    setVinculoSeleccionado(null);
    setPuesto("");
    setDirectiva("No");
    setFecha("");
  }

  function limpiarRecursoDestino() {
    setBusquedaDestinoRecurso("");
    setMostrarListaDestinoRecurso(false);
    setDestinoRecursoSeleccionado(null);
  }

  function limpiarRecursoForm() {
    setRecursoForm({
      tipo: "Fotografía",
      descripcion: "",
      ubicacion: "",
      visibilidad: "Público",
      observaciones: "",
      propietarioTipo: "Entidades",
      propietarioId: "e1",
    });
  }

  function guardarVinculo() {
    if (!seleccionado || !vinculoSeleccionado || !puesto) return;

    const nuevo =
      modulo === "Personas"
        ? { personaId: seleccionado.id, entidadId: vinculoSeleccionado.id, puesto, directiva, fecha }
        : { personaId: vinculoSeleccionado.id, entidadId: seleccionado.id, puesto, directiva, fecha };

    setVinculos([...vinculos, nuevo]);
    limpiarVinculo();
  }

  function guardarRecurso() {
    if (!recursoForm.descripcion.trim()) return;

    if (accion === "Editar" && seleccionado && modulo === "Recursos") {
      const actualizados = recursos.map((r) =>
        r.id === seleccionado.id ? { ...r, ...recursoForm } : r
      );
      setRecursos(actualizados);
      setSeleccionado({ ...seleccionado, ...recursoForm });
      setAccion("Vista");
      return;
    }

    const nuevo = {
      id: `r${Date.now()}`,
      ...recursoForm,
    };

    setRecursos([...recursos, nuevo]);
    setSeleccionado(nuevo);
    setAccion("Vista");
    limpiarRecursoForm();
  }

  function excluirRecurso() {
    if (!seleccionado || modulo !== "Recursos") return;
    setRecursos(recursos.filter((r) => r.id !== seleccionado.id));
    setRecursoVinculos(recursoVinculos.filter((v) => v.recursoId !== seleccionado.id));
    setSeleccionado(null);
    setAccion("Vista");
  }

  function guardarVinculoRecurso() {
    if (!seleccionado || modulo !== "Recursos" || !destinoRecursoSeleccionado) return;

    setRecursoVinculos([
      ...recursoVinculos,
      {
        recursoId: seleccionado.id,
        destinoTipo: tipoDestinoRecurso,
        destinoId: destinoRecursoSeleccionado.id,
      },
    ]);

    limpiarRecursoDestino();
  }

  function vinculosActuales() {
    if (!seleccionado) return [];
    if (modulo === "Personas") return vinculos.filter((v) => v.personaId === seleccionado.id);
    if (modulo === "Entidades") return vinculos.filter((v) => v.entidadId === seleccionado.id);
    return [];
  }

  function recursosVinculadosAlRegistro() {
    if (!seleccionado) return [];
    return recursoVinculos
      .filter((v) => v.destinoTipo === modulo && v.destinoId === seleccionado.id)
      .map((v) => recursos.find((r) => r.id === v.recursoId))
      .filter(Boolean);
  }

  function vinculosDelRecurso() {
    if (!seleccionado || modulo !== "Recursos") return [];
    return recursoVinculos.filter((v) => v.recursoId === seleccionado.id);
  }

  return (
    <main style={page}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <section style={wrap}>
        <header>
          <p style={eyebrow}>COMUNIDAD • PARTICIPACIÓN • FUTURO</p>

          <div style={titleLine}>
            <h1 style={title}>Belén en Movimiento</h1>
            <AnimatedGears />
          </div>
        </header>

        <input
          value={busqueda}
          onFocus={() => volverALista()}
          onChange={(e) => volverALista(e.target.value)}
          placeholder="Buscar..."
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
            <h2 style={sectionTitle}>
              {seleccionado ? tituloRegistro(seleccionado, modulo) : `${icono(modulo)} ${modulo}`}
            </h2>

            <div style={actions}>
              {seleccionado && (
                <>
                  <button
                    title="Editar"
                    onClick={() => {
                      if (modulo === "Recursos") setRecursoForm({ ...seleccionado });
                      setAccion("Editar");
                    }}
                    style={iconButton(accion === "Editar")}
                  >
                    ✏️
                  </button>

                  <button title="Excluir" onClick={() => setAccion("Excluir")} style={iconButton(accion === "Excluir")}>
                    🗑️
                  </button>

                  <button
                    title="Vincular"
                    onClick={() => {
                      setAccion("Vincular");
                      limpiarVinculo();
                      limpiarRecursoDestino();
                    }}
                    style={iconButton(accion === "Vincular")}
                  >
                    🔗
                  </button>

                  {modulo !== "Recursos" && (
                    <button title="Recursos" onClick={() => setAccion("Recursos")} style={iconButton(accion === "Recursos")}>
                      📁
                    </button>
                  )}
                </>
              )}

              <button
                title="Nuevo"
                onClick={() => {
                  setSeleccionado(null);
                  limpiarRecursoForm();
                  setAccion("Nuevo");
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

          {accion === "Nuevo" && modulo === "Recursos" && (
            <RecursoForm recursoForm={recursoForm} setRecursoForm={setRecursoForm} guardarRecurso={guardarRecurso} />
          )}

          {accion === "Nuevo" && modulo !== "Recursos" && <Formulario modulo={modulo} datos={null} />}

          {seleccionado && accion === "Vista" && modulo === "Recursos" && (
            <RecursoDetalle recurso={seleccionado} vinculos={vinculosDelRecurso()} />
          )}

          {seleccionado && accion === "Vista" && modulo !== "Recursos" && (
            <Formulario modulo={modulo} datos={seleccionado} lectura />
          )}

          {seleccionado && accion === "Editar" && modulo === "Recursos" && (
            <RecursoForm recursoForm={recursoForm} setRecursoForm={setRecursoForm} guardarRecurso={guardarRecurso} />
          )}

          {seleccionado && accion === "Editar" && modulo !== "Recursos" && (
            <Formulario modulo={modulo} datos={seleccionado} />
          )}

          {seleccionado && accion === "Excluir" && (
            <>
              {modulo === "Recursos" ? (
                <RecursoDetalle recurso={seleccionado} vinculos={vinculosDelRecurso()} />
              ) : (
                <Formulario modulo={modulo} datos={seleccionado} lectura />
              )}

              <div style={{ textAlign: "right", marginTop: 10 }}>
                <button
                  style={{ ...primary, background: "#991b1b" }}
                  onClick={() => {
                    if (modulo === "Recursos") excluirRecurso();
                  }}
                >
                  Confirmar exclusión
                </button>
              </div>
            </>
          )}

          {seleccionado && accion === "Vincular" && modulo !== "Recursos" && (
            <VincularPersonaEntidad
              modulo={modulo}
              vinculosActuales={vinculosActuales()}
              busquedaVinculo={busquedaVinculo}
              setBusquedaVinculo={setBusquedaVinculo}
              mostrarListaVinculo={mostrarListaVinculo}
              setMostrarListaVinculo={setMostrarListaVinculo}
              vinculoSeleccionado={vinculoSeleccionado}
              setVinculoSeleccionado={setVinculoSeleccionado}
              listaVinculo={listaVinculo}
              puesto={puesto}
              setPuesto={setPuesto}
              directiva={directiva}
              setDirectiva={setDirectiva}
              fecha={fecha}
              setFecha={setFecha}
              guardarVinculo={guardarVinculo}
            />
          )}

          {seleccionado && accion === "Vincular" && modulo === "Recursos" && (
            <VincularRecurso
              tipoDestinoRecurso={tipoDestinoRecurso}
              setTipoDestinoRecurso={setTipoDestinoRecurso}
              busquedaDestinoRecurso={busquedaDestinoRecurso}
              setBusquedaDestinoRecurso={setBusquedaDestinoRecurso}
              mostrarListaDestinoRecurso={mostrarListaDestinoRecurso}
              setMostrarListaDestinoRecurso={setMostrarListaDestinoRecurso}
              destinoRecursoSeleccionado={destinoRecursoSeleccionado}
              setDestinoRecursoSeleccionado={setDestinoRecursoSeleccionado}
              listaDestinoRecurso={listaDestinoRecurso}
              guardarVinculoRecurso={guardarVinculoRecurso}
              vinculos={vinculosDelRecurso()}
            />
          )}

          {seleccionado && accion === "Recursos" && modulo !== "Recursos" && (
            <div style={{ marginTop: 12 }}>
              <h3 style={miniTitle}>Recursos asociados</h3>

              <div style={scrollArea}>
                <div style={listWide}>
                  {recursosVinculadosAlRegistro().map((r: any, i: number) => (
                    <button
                      key={i}
                      style={rowWide}
                      onClick={() => {
                        setModulo("Recursos");
                        setSeleccionado(r);
                        setAccion("Vista");
                      }}
                    >
                      {lineaConsulta("Recursos", r)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function VincularPersonaEntidad(props: any) {
  return (
    <div style={{ marginTop: 12 }}>
      <h3 style={miniTitle}>{props.modulo === "Personas" ? "Entidades vinculadas" : "Personas vinculadas"}</h3>

      <div style={list}>
        {props.vinculosActuales.map((v: any, i: number) => {
          const persona = personasBase.find((p) => p.id === v.personaId);
          const entidad = entidadesBase.find((e) => e.id === v.entidadId);
          const nombre =
            props.modulo === "Personas"
              ? entidad?.nombre
              : `${persona?.nombre} ${persona?.apellido1} ${persona?.apellido2}`;

          return (
            <div key={i} style={relationRow}>
              <strong>{props.modulo === "Personas" ? "🏢" : "👤"} {nombre}</strong>
              <span>🎖 {v.puesto}</span>
              <span>Directiva: {v.directiva}</span>
              <span>{v.fecha || "Sin fecha"}</span>
            </div>
          );
        })}
      </div>

      <div style={searchLine}>
        <input
          value={props.busquedaVinculo}
          onFocus={() => props.setMostrarListaVinculo(true)}
          onClick={() => props.setMostrarListaVinculo(true)}
          onChange={(e) => {
            props.setBusquedaVinculo(e.target.value);
            props.setVinculoSeleccionado(null);
            props.setMostrarListaVinculo(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") props.setMostrarListaVinculo(true);
          }}
          placeholder={props.modulo === "Personas" ? "🔍 Buscar entidad para vincular..." : "🔍 Buscar persona para vincular..."}
          style={{ ...field, flex: 1 }}
        />
      </div>

      {props.mostrarListaVinculo && !props.vinculoSeleccionado && (
        <div style={scrollArea}>
          <div style={listWide}>
            {props.listaVinculo.map((item: any, index: number) => (
              <button
                key={index}
                style={rowWide}
                onClick={() => {
                  props.setVinculoSeleccionado(item);
                  props.setMostrarListaVinculo(false);
                }}
              >
                {props.modulo === "Personas" ? lineaConsulta("Entidades", item) : lineaConsulta("Personas", item)}
              </button>
            ))}
          </div>
        </div>
      )}

      {props.vinculoSeleccionado && (
        <div style={grid}>
          <input readOnly value={tituloRegistro(props.vinculoSeleccionado, props.modulo)} style={field} />

          <select style={field} value={props.puesto} onChange={(e) => props.setPuesto(e.target.value)}>
            <option value="">Seleccione puesto</option>
            {puestos.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <select style={field} value={props.directiva} onChange={(e) => props.setDirectiva(e.target.value)}>
            <option>Sí</option>
            <option>No</option>
          </select>

          <input type="date" style={field} value={props.fecha} onChange={(e) => props.setFecha(e.target.value)} />

          <button style={primary} onClick={props.guardarVinculo}>Guardar vínculo</button>
        </div>
      )}
    </div>
  );
}

function VincularRecurso(props: any) {
  return (
    <div style={{ marginTop: 12 }}>
      <h3 style={miniTitle}>Vinculaciones del recurso</h3>

      <div style={list}>
        {props.vinculos.map((v: any, i: number) => {
          const item =
            v.destinoTipo === "Entidades"
              ? entidadesBase.find((e) => e.id === v.destinoId)
              : personasBase.find((p) => p.id === v.destinoId);

          return (
            <div key={i} style={relationRow}>
              <strong>{v.destinoTipo === "Entidades" ? "🏢" : "👤"} {tituloRegistro(item, v.destinoTipo)}</strong>
              <span>{v.destinoTipo}</span>
            </div>
          );
        })}
      </div>

      <div style={grid}>
        <select
          style={field}
          value={props.tipoDestinoRecurso}
          onChange={(e) => {
            props.setTipoDestinoRecurso(e.target.value);
            props.setDestinoRecursoSeleccionado(null);
            props.setBusquedaDestinoRecurso("");
            props.setMostrarListaDestinoRecurso(false);
          }}
        >
          <option value="Entidades">Entidades</option>
          <option value="Personas">Personas</option>
        </select>
      </div>

      <div style={searchLine}>
        <input
          value={props.busquedaDestinoRecurso}
          onFocus={() => props.setMostrarListaDestinoRecurso(true)}
          onClick={() => props.setMostrarListaDestinoRecurso(true)}
          onChange={(e) => {
            props.setBusquedaDestinoRecurso(e.target.value);
            props.setDestinoRecursoSeleccionado(null);
            props.setMostrarListaDestinoRecurso(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") props.setMostrarListaDestinoRecurso(true);
          }}
          placeholder="🔍 Buscar destino para vincular..."
          style={{ ...field, flex: 1 }}
        />
      </div>

      {props.mostrarListaDestinoRecurso && !props.destinoRecursoSeleccionado && (
        <div style={scrollArea}>
          <div style={listWide}>
            {props.listaDestinoRecurso.map((item: any, index: number) => (
              <button
                key={index}
                style={rowWide}
                onClick={() => {
                  props.setDestinoRecursoSeleccionado(item);
                  props.setMostrarListaDestinoRecurso(false);
                }}
              >
                {lineaConsulta(props.tipoDestinoRecurso, item)}
              </button>
            ))}
          </div>
        </div>
      )}

      {props.destinoRecursoSeleccionado && (
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <button style={primary} onClick={props.guardarVinculoRecurso}>
            Guardar vínculo
          </button>
        </div>
      )}
    </div>
  );
}

function RecursoForm({ recursoForm, setRecursoForm, guardarRecurso }: any) {
  return (
    <div style={grid}>
      <select style={field} value={recursoForm.tipo} onChange={(e) => setRecursoForm({ ...recursoForm, tipo: e.target.value })}>
        {tiposRecurso.map((t) => <option key={t}>{t}</option>)}
      </select>

      <input placeholder="Descripción" value={recursoForm.descripcion} onChange={(e) => setRecursoForm({ ...recursoForm, descripcion: e.target.value })} style={field} />

      <input placeholder="Ubicación / enlace" value={recursoForm.ubicacion} onChange={(e) => setRecursoForm({ ...recursoForm, ubicacion: e.target.value })} style={field} />

      <select style={field} value={recursoForm.visibilidad} onChange={(e) => setRecursoForm({ ...recursoForm, visibilidad: e.target.value })}>
        {visibilidades.map((v) => <option key={v}>{v}</option>)}
      </select>

      <select
        style={field}
        value={recursoForm.propietarioTipo}
        onChange={(e) => setRecursoForm({ ...recursoForm, propietarioTipo: e.target.value, propietarioId: e.target.value === "Entidades" ? "e1" : "p1" })}
      >
        <option value="Entidades">Propietario: Entidad</option>
        <option value="Personas">Propietario: Persona</option>
      </select>

      <select style={field} value={recursoForm.propietarioId} onChange={(e) => setRecursoForm({ ...recursoForm, propietarioId: e.target.value })}>
        {(recursoForm.propietarioTipo === "Entidades" ? entidadesBase : personasBase).map((x) => (
          <option key={x.id} value={x.id}>{tituloRegistro(x, recursoForm.propietarioTipo)}</option>
        ))}
      </select>

      <textarea placeholder="Observaciones" value={recursoForm.observaciones} onChange={(e) => setRecursoForm({ ...recursoForm, observaciones: e.target.value })} style={{ ...field, minHeight: 70 }} />

      <button style={primary} onClick={guardarRecurso}>Guardar recurso</button>
    </div>
  );
}

function RecursoDetalle({ recurso, vinculos }: any) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={scrollArea}>
        <div style={listWide}>
          <div style={rowWide}>{lineaConsulta("Recursos", recurso)}</div>
        </div>
      </div>

      <div style={grid}>
        <input readOnly value={`Tipo: ${recurso.tipo}`} style={field} />
        <input readOnly value={`Visibilidad: ${recurso.visibilidad}`} style={field} />
        <input readOnly value={`Ubicación: ${recurso.ubicacion || "Sin ubicación"}`} style={field} />
        <input readOnly value={`Propietario: ${nombrePropietario(recurso)}`} style={field} />
      </div>

      <textarea readOnly value={recurso.observaciones || ""} placeholder="Observaciones" style={{ ...field, width: "100%", boxSizing: "border-box", minHeight: 70, marginTop: 10 }} />

      <h3 style={miniTitle}>Vinculado a</h3>
      <div style={list}>
        {vinculos.map((v: any, i: number) => {
          const item =
            v.destinoTipo === "Entidades"
              ? entidadesBase.find((e) => e.id === v.destinoId)
              : personasBase.find((p) => p.id === v.destinoId);

          return (
            <div key={i} style={relationRow}>
              <strong>{v.destinoTipo === "Entidades" ? "🏢" : "👤"} {tituloRegistro(item, v.destinoTipo)}</strong>
              <span>{v.destinoTipo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Formulario({ modulo, datos, lectura = false }: { modulo: Modulo; datos: any | null; lectura?: boolean }) {
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

      <textarea readOnly={lectura} placeholder="Descripción / observaciones" style={{ ...field, width: "100%", boxSizing: "border-box", minHeight: 64, marginTop: 10 }} />

      {!lectura && (
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <button style={primary}>Guardar</button>
        </div>
      )}
    </div>
  );
}

function AnimatedGears() {
  return (
    <div style={gears}>
      <span style={{ ...gear, animationDirection: "normal" }}>⚙️</span>
      <span style={{ ...gear, animationDirection: "reverse" }}>⚙️</span>
      <span style={{ ...gear, animationDirection: "normal" }}>⚙️</span>
    </div>
  );
}

function tituloRegistro(item: any, modulo?: any) {
  if (!item) return "";
  if (modulo === "Recursos") return item.descripcion || "";
  if (item.apellido1) return `${item.nombre} ${item.apellido1 || ""} ${item.apellido2 || ""}`.trim();
  return item.nombre || item.descripcion || "";
}

function nombrePropietario(recurso: any) {
  const item =
    recurso.propietarioTipo === "Entidades"
      ? entidadesBase.find((e) => e.id === recurso.propietarioId)
      : personasBase.find((p) => p.id === recurso.propietarioId);

  return tituloRegistro(item, recurso.propietarioTipo);
}

function lineaConsulta(modulo: Modulo | "Personas" | "Entidades", item: any) {
  if (modulo === "Personas") return `👤 ${item.nombre} ${item.apellido1} ${item.apellido2}   |   📞 ${item.telefono}   |   ✉ ${item.correo}`;
  if (modulo === "Entidades") return `🏢 ${item.nombre}   |   📞 ${item.telefono}   |   ✉ ${item.correo}   |   ${item.tipo}   |   📍 ${item.distrito}`;
  if (modulo === "Recursos") return `📁 ${item.descripcion}   |   ${item.tipo}   |   🔒 ${item.visibilidad}   |   👤 ${nombrePropietario(item)}   |   🔗 ${item.ubicacion || "Sin ubicación"}`;
  return `${item.nombre}   |   ${item.tipo}   |   📅 ${item.fecha || ""}   |   ${item.relacionado || ""}`;
}

function icono(m: Modulo) {
  return {
    Personas: "👤",
    Entidades: "🏢",
    Actividades: "📅",
    Proyectos: "🚀",
    Recursos: "📁",
    Comunicaciones: "📢",
  }[m];
}

const page = { minHeight: "100vh", padding: 18, paddingBottom: 120, background: "linear-gradient(135deg,#f8f5ef,#ffffff,#eef2f7)", fontFamily: "Georgia, serif", color: "#1f2937" };
const wrap = { maxWidth: 1100, margin: "0 auto" };
const eyebrow = { letterSpacing: 3, color: "#64748b", fontSize: 11, margin: 0, textAlign: "center" as const };
const titleLine = { display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" as const };
const title = { fontSize: "clamp(2.1rem,6vw,4.2rem)", margin: "6px 0 12px" };
const gears = { display: "flex", gap: 2, marginTop: -6 };
const gear = { display: "inline-block", fontSize: 22, animationName: "spin", animationDuration: "2.8s", animationTimingFunction: "linear", animationIterationCount: "infinite" };
const search = { width: "100%", padding: "14px 20px", borderRadius: 999, border: "1px solid #d1d5db", fontSize: 15, margin: "10px 0 14px", boxSizing: "border-box" as const };
const chips = { display: "flex", gap: 8, flexWrap: "wrap" as const, justifyContent: "center" };
const actions = { display: "flex", gap: 8, flexWrap: "nowrap" as const, overflowX: "auto" as const };
const panel = { marginTop: 16, background: "rgba(255,255,255,.86)", border: "1px solid rgba(0,0,0,.08)", borderRadius: 22, padding: 16, overflow: "hidden" };
const topLine = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" as const, alignItems: "center" };
const sectionTitle = { margin: 0, fontSize: 22 };
const miniTitle = { margin: "8px 0", fontSize: 17 };
const list = { display: "grid", gap: 8, marginTop: 10 };
const scrollArea = { marginTop: 14, overflowX: "auto" as const, overflowY: "hidden" as const, WebkitOverflowScrolling: "touch" as const, paddingBottom: 4 };
const listWide = { display: "grid", gap: 8, minWidth: 880 };
const rowWide = { textAlign: "left" as const, padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" as const, overflow: "visible" };
const relationRow = { display: "flex", gap: 12, flexWrap: "wrap" as const, alignItems: "center", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white", fontSize: 14 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 10, marginTop: 12 };
const field = { padding: "12px 14px", borderRadius: 12, border: "1px solid #d1d5db", fontSize: 14, background: "white", boxSizing: "border-box" as const };
const primary = { padding: "10px 18px", borderRadius: 999, border: "none", background: "#1e3a8a", color: "#ffffff", fontWeight: 700, cursor: "pointer" };
const iconPrimary = { width: 42, height: 42, padding: 0, borderRadius: 999, border: "none", background: "#1e3a8a", color: "#ffffff", fontWeight: 900, fontSize: 30, lineHeight: "42px", cursor: "pointer" };
const searchLine = { display: "flex", gap: 8, marginTop: 12, alignItems: "center" };

function chip(active: boolean) {
  return { padding: "9px 14px", borderRadius: 999, border: "1px solid #d1d5db", background: active ? "#1e3a8a" : "white", color: active ? "white" : "#475569", cursor: "pointer", whiteSpace: "nowrap" as const };
}

function iconButton(active: boolean) {
  return { width: 42, height: 42, borderRadius: 999, border: "1px solid #d1d5db", background: active ? "#1e3a8a" : "white", color: active ? "white" : "#475569", cursor: "pointer", fontSize: 18 };
}
