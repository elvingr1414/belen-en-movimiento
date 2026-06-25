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
  "Recursos",
  "Personas",
  "Entidades",
  "Actividades",
  "Proyectos",
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
  const [modulo, setModulo] = useState<Modulo>("Recursos");
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
      propietarioTipo: "Personas",
      propietarioId: "p1",
      creadoPorId: "p1",
      creadoPorNombre: "Elvin González Rodríguez",
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

  const [visorRecurso, setVisorRecurso] = useState<any | null>(null);
  const [recursoForm, setRecursoForm] = useState<any>({
    tipo: "Fotografía",
    descripcion: "",
    ubicacion: "",
    visibilidad: "Público",
    observaciones: "",
    propietarioTipo: "Personas",
    propietarioId: "p1",
    creadoPorId: "p1",
    creadoPorNombre: "Elvin González Rodríguez",
  });

  const [tipoDestinoRecurso, setTipoDestinoRecurso] = useState<"Personas" | "Entidades">("Entidades");
  const [busquedaDestinoRecurso, setBusquedaDestinoRecurso] = useState("");
  const [mostrarListaDestinoRecurso, setMostrarListaDestinoRecurso] = useState(false);
  const [destinoRecursoSeleccionado, setDestinoRecursoSeleccionado] = useState<any | null>(null);

  function coincideBusqueda(item: any, texto: string) {
    const palabras = texto
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (palabras.length === 0) return true;

    const base = JSON.stringify(item).toLowerCase();
    return palabras.every((palabra) => base.includes(palabra));
  }

  const lista =
    modulo === "Recursos"
      ? recursos.filter((item) => coincideBusqueda(item, busqueda))
      : datosBase[modulo].filter((item) => coincideBusqueda(item, busqueda));

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
      archivos: [],
      propietarioTipo: "Personas",
      propietarioId: "p1",
      creadoPorId: "p1",
      creadoPorNombre: "Elvin González Rodríguez",
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
    const archivosSeleccionados = recursoForm.archivos || [];

    if (archivosSeleccionados.length === 0 && !recursoForm.ubicacion && !recursoForm.observaciones?.trim()) {
      alert("Debe seleccionar al menos un archivo o escribir una observación.");
      return;
    }

    if (accion === "Editar" && seleccionado && modulo === "Recursos") {
      const descripcionFinal =
        recursoForm.observaciones?.trim() ||
        seleccionado.descripcion ||
        recursoForm.ubicacion ||
        "Recurso sin observaciones";

      const actualizados = recursos.map((r) =>
        r.id === seleccionado.id
          ? { ...r, ...recursoForm, descripcion: descripcionFinal }
          : r
      );

      setRecursos(actualizados);
      setSeleccionado({ ...seleccionado, ...recursoForm, descripcion: descripcionFinal });
      setAccion("Vista");
      return;
    }

    const ahora = new Date();
    const fechaActual = ahora.toISOString().slice(0, 10);
    const horaActual = ahora.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });
    const fechaHoraCreacion = ahora.toISOString();
    const creadoEnMs = ahora.getTime();

    const nuevos =
      archivosSeleccionados.length > 0
        ? archivosSeleccionados.map((archivo: any, index: number) => ({
            id: `r${Date.now()}-${index}`,
            ...recursoForm,
            descripcion: recursoForm.observaciones?.trim() || archivo.nombre,
            ubicacion: archivo.nombre,
            archivos: [archivo],
            fecha: fechaActual,
            hora: horaActual,
            fechaHoraCreacion,
            creadoPorId: recursoForm.creadoPorId || "p1",
            creadoPorNombre: recursoForm.creadoPorNombre || "Elvin González Rodríguez",
            vinculosCount: 0,
            creadoEnMs,
          }))
        : [{
            id: `r${Date.now()}`,
            ...recursoForm,
            descripcion: recursoForm.observaciones?.trim() || recursoForm.ubicacion || "Recurso sin observaciones",
            fecha: fechaActual,
            hora: horaActual,
            fechaHoraCreacion,
            creadoPorId: recursoForm.creadoPorId || "p1",
            creadoPorNombre: recursoForm.creadoPorNombre || "Elvin González Rodríguez",
            vinculosCount: 0,
          }];

    setRecursos([...nuevos, ...recursos]);
    setSeleccionado(null);
    setAccion("Nuevo");
    limpiarRecursoForm();
  }

  function excluirRecurso() {
    if (!seleccionado || modulo !== "Recursos") return;
    setRecursos(recursos.filter((r) => r.id !== seleccionado.id));
    setRecursoVinculos(recursoVinculos.filter((v) => v.recursoId !== seleccionado.id));
    setSeleccionado(null);
    setAccion("Vista");
  }

  function eliminarRecursoLibre(recursoId: string) {
    const recurso = recursos.find((r) => r.id === recursoId);
    const tieneVinculos = recursoVinculos.some((v) => v.recursoId === recursoId);

    if (!recurso) return;

    if ((recurso.creadoPorId || "p1") !== "p1") {
      alert("Solo puede eliminar recursos creados por usted.");
      return;
    }

    if (tieneVinculos) {
      alert("Este recurso ya está vinculado. Primero debe desvincularse antes de eliminarlo.");
      return;
    }

    setRecursos(recursos.filter((r) => r.id !== recursoId));
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
          <p style={eyebrow}>Construyendo la memoria digital de Belén</p>

          <div style={titleLine}>
            <h1 style={title}>Belén en Movimiento</h1>
            <AnimatedGears />
          </div>
        </header>

        <input
          value={busqueda}
          onFocus={() => volverALista()}
          onChange={(e) => volverALista(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          placeholder="Buscar..."
          style={search}
        />

        <nav style={chips}>
          {modulos.map((m) => (
            <button key={m} onClick={() => cambiarModulo(m)} style={chip(modulo === m)}>
              {icono(m)} {nombreModulo(m)}
            </button>
          ))}
        </nav>

        <section style={panel}>
          <div style={topLine}>
            <h2 style={sectionTitle}>
              {seleccionado ? tituloRegistro(seleccionado, modulo) : <>{icono(modulo)} {nombreModulo(modulo)} <span style={versionTag}>V34</span>{modulo === "Recursos" && <span style={libraryUserInline}> · Elvin González Rodríguez</span>}</>}
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
            <RecursoForm recursoForm={recursoForm} setRecursoForm={setRecursoForm} guardarRecurso={guardarRecurso} recursos={recursos} eliminarRecursoLibre={eliminarRecursoLibre} recursoVinculos={recursoVinculos} setVisorRecurso={setVisorRecurso} />
          )}

          {accion === "Nuevo" && modulo !== "Recursos" && <Formulario modulo={modulo} datos={null} />}

          {seleccionado && accion === "Vista" && modulo === "Recursos" && (
            <RecursoDetalle recurso={seleccionado} vinculos={vinculosDelRecurso()} />
          )}

          {seleccionado && accion === "Vista" && modulo !== "Recursos" && (
            <Formulario modulo={modulo} datos={seleccionado} lectura />
          )}

          {seleccionado && accion === "Editar" && modulo === "Recursos" && (
            <RecursoForm recursoForm={recursoForm} setRecursoForm={setRecursoForm} guardarRecurso={guardarRecurso} recursos={recursos} eliminarRecursoLibre={eliminarRecursoLibre} recursoVinculos={recursoVinculos} setVisorRecurso={setVisorRecurso} />
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
              <h3 style={miniTitle}>Biblioteca asociada</h3>

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
      {visorRecurso && (
        <VisorRecurso recurso={visorRecurso} cerrar={() => setVisorRecurso(null)} />
      )}

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

function RecursoForm({ recursoForm, setRecursoForm, guardarRecurso, recursos = [], eliminarRecursoLibre, recursoVinculos = [], setVisorRecurso }: any) {
  const archivos = recursoForm.archivos || [];

  const pendientes = archivos.map((archivo: any, index: number) => ({
    id: `pendiente-${index}`,
    tipo: recursoForm.tipo,
    ubicacion: archivo.nombre,
    descripcion: recursoForm.observaciones || archivo.nombre,
    observaciones: recursoForm.observaciones || "",
    fecha: "Pendiente",
    hora: "",
    archivos: [archivo],
    pendiente: true,
  }));

  const misRecursos = [...recursos]
    .filter((r: any) => (r.creadoPorId || "p1") === "p1")
    .sort((a: any, b: any) => {
      const ax = a.creadoEnMs || Date.parse(a.fechaHoraCreacion || "") || 0;
      const bx = b.creadoEnMs || Date.parse(b.fechaHoraCreacion || "") || 0;
      return bx - ax;
    })
    .slice(0, 20);

  const cintaRecursos = [...pendientes, ...misRecursos];

  const textoArchivo =
    archivos.length === 0
      ? "Seleccionar archivo"
      : archivos.length === 1
        ? "Archivo listo"
        : `${archivos.length} archivos listos`;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={grid}>
        <select
          style={field}
          value={recursoForm.tipo}
          onChange={(e) => setRecursoForm({ ...recursoForm, tipo: e.target.value })}
        >
          {tiposRecurso.map((t) => <option key={t}>{t}</option>)}
        </select>

        <label style={fileOneButton} title="Seleccionar archivo(s)">
          📁 {textoArchivo}
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.mp4,.mov,.avi"
            onChange={(e) => {
              const seleccionados = Array.from(e.target.files || []).map((archivo: any) => ({
                nombre: archivo.name,
                tipo: archivo.type || "Archivo",
                url: URL.createObjectURL(archivo),
                  preview: archivo.type?.startsWith("image/") ? URL.createObjectURL(archivo) : "",
              }));

              if (seleccionados.length > 0) {
                setRecursoForm({
                  ...recursoForm,
                  archivos: seleccionados,
                  ubicacion:
                    seleccionados.length === 1
                      ? seleccionados[0].nombre
                      : `${seleccionados.length} archivos listos`,
                });
              }
            }}
          />
        </label>

        <select
          style={field}
          value={recursoForm.visibilidad}
          onChange={(e) => setRecursoForm({ ...recursoForm, visibilidad: e.target.value })}
        >
          {visibilidades.map((v) => <option key={v}>{v}</option>)}
        </select>

        <select
          style={field}
          value={recursoForm.propietarioTipo}
          onChange={(e) => setRecursoForm({ ...recursoForm, propietarioTipo: e.target.value, propietarioId: e.target.value === "Entidades" ? "e1" : "p1" })}
        >
          <option value="Personas">Relacionado: Persona</option>
          <option value="Entidades">Relacionado: Entidad</option>
        </select>

        <select
          style={field}
          value={recursoForm.propietarioId}
          onChange={(e) => setRecursoForm({ ...recursoForm, propietarioId: e.target.value })}
        >
          {(recursoForm.propietarioTipo === "Entidades" ? entidadesBase : personasBase).map((x) => (
            <option key={x.id} value={x.id}>{tituloRegistro(x, recursoForm.propietarioTipo)}</option>
          ))}
        </select>

        <textarea
          placeholder="Observaciones / descripción del archivo"
          value={recursoForm.observaciones}
          onChange={(e) => setRecursoForm({ ...recursoForm, observaciones: e.target.value })}
          style={{ ...field, minHeight: 70, gridColumn: "1 / -1" }}
        />
      </div>

      <div style={saveBar}>
        <button style={primary} onClick={guardarRecurso}>
          {textoGuardarBiblioteca(recursoForm.tipo)}
        </button>
      </div>

      <div style={recentBox}>
        <strong>Mis archivos recientes</strong>

        <div style={recentScroll}>
          {cintaRecursos.length === 0 && (
            <div style={emptyRecent}>Cuando seleccione o guarde archivos, aparecerán aquí.</div>
          )}

          {cintaRecursos.map((r: any) => {
            const tieneVinculos = recursoVinculos.some((v: any) => v.recursoId === r.id);
            const archivoPrincipal = r.archivos?.[0];

            return (
              <div
                key={r.id}
                style={r.pendiente ? pendingCard : recentCard}
                onDoubleClick={() => {
                  if (r.pendiente) return;
                  setVisorRecurso?.(r);
                }}
                title="Doble clic: vista previa."
              >
                {r.pendiente && <div style={pendingBadge}>Pendiente</div>}

                <div style={recentThumb}>
                  {archivoPrincipal?.preview ? (
                    <img src={archivoPrincipal.preview} alt={r.ubicacion} style={recentImage} />
                  ) : (
                    <span>{iconoArchivoReal(r)}</span>
                  )}
                </div>

                <div style={recentName}>{r.ubicacion || r.descripcion}</div>
                <div style={recentMeta}>{r.tipo} · {r.fecha || "Sin fecha"} {r.hora || ""}</div>
                {(r.observaciones || r.descripcion) && (
                  <div style={recentObs}>{r.observaciones || r.descripcion}</div>
                )}

                {!r.pendiente && !tieneVinculos && (r.creadoPorId || "p1") === "p1" && (
                  <button style={deleteMini} onClick={() => eliminarRecursoLibre?.(r.id)}>🗑</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
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

      <textarea readOnly value={recurso.observaciones || ""} placeholder="Observaciones / descripción del archivo" style={{ ...field, width: "100%", boxSizing: "border-box", minHeight: 70, marginTop: 10 }} />

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


function VisorRecurso({ recurso, cerrar }: any) {
  const archivo = recurso?.archivos?.[0];
  const url = archivo?.url || archivo?.preview || "";
  const nombre = recurso?.ubicacion || recurso?.descripcion || archivo?.nombre || "Archivo";
  const tipo = recurso?.tipo || archivo?.tipo || "Archivo";
  const mime = (archivo?.tipo || "").toLowerCase();
  const esImagen = !!archivo?.preview || /\.(jpg|jpeg|png|gif|webp|heic)$/i.test(nombre);
  const esPdf = /\.pdf$/i.test(nombre) || mime.includes("pdf");
  const esVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(nombre) || mime.startsWith("video/");

  return (
    <div style={visorOverlay} onClick={cerrar}>
      <div style={visorCaja} onClick={(e) => e.stopPropagation()}>
        <div style={visorHeader}>
          <div>
            <strong>{nombre}</strong>
            <div style={visorMeta}>{tipo} · {recurso?.fecha || "Sin fecha"} {recurso?.hora || ""}</div>
          </div>
          <button style={visorCerrar} onClick={cerrar}>×</button>
        </div>

        <div style={visorContenido}>
          {url && esImagen ? (
            <img src={url} alt={nombre} style={visorImagen} />
          ) : url && esPdf ? (
            <iframe src={url} title={nombre} style={visorFrame} />
          ) : url && esVideo ? (
            <video src={url} controls style={visorVideo} />
          ) : url ? (
            <div style={visorMensaje}>
              <div style={visorIcono}>{iconoArchivoReal(recurso)}</div>
              <p>Este tipo de archivo no tiene visor integrado todavía.</p>
              <a href={url} target="_blank" rel="noreferrer" style={visorLink}>Abrir archivo</a>
            </div>
          ) : (
            <div style={visorMensaje}>
              <div style={visorIcono}>{iconoArchivoReal(recurso)}</div>
              <strong>Vista previa no disponible</strong>
              <p>Este archivo fue registrado, pero todavía no tiene una dirección de vista previa disponible.</p>
            </div>
          )}
        </div>

        {(recurso?.observaciones || recurso?.descripcion) && (
          <div style={visorObs}>{recurso.observaciones || recurso.descripcion}</div>
        )}
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


function textoGuardarBiblioteca(tipo: string) {
  const t = (tipo || "").toLowerCase();

  if (t.includes("fotografía") || t.includes("foto")) return "Guardar fotografía";
  if (t.includes("acta")) return "Guardar acta";
  if (t.includes("video")) return "Guardar video";
  if (t.includes("logo")) return "Guardar logo";
  if (t.includes("cotización")) return "Guardar cotización";
  if (t.includes("factura")) return "Guardar factura";
  if (t.includes("contrato")) return "Guardar contrato";
  if (t.includes("certificado")) return "Guardar certificado";
  if (t.includes("documento")) return "Guardar documento";

  return "Guardar recurso";
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



function iconoArchivoReal(recurso: any) {
  const archivo = recurso?.archivos?.[0];
  const nombre = (archivo?.nombre || recurso?.ubicacion || recurso?.descripcion || "").toLowerCase();
  const mime = (archivo?.tipo || "").toLowerCase();

  if (mime.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|heic)$/.test(nombre)) return "🖼️";
  if (mime.startsWith("video/") || /\.(mp4|mov|avi|mkv|webm)$/.test(nombre)) return "🎥";
  if (mime.includes("pdf") || nombre.endsWith(".pdf")) return "📄";
  if (/\.(doc|docx)$/.test(nombre)) return "📝";
  if (/\.(xls|xlsx)$/.test(nombre)) return "📊";
  if (/\.(ppt|pptx)$/.test(nombre)) return "📽️";
  if (/\.(mp3|wav|m4a)$/.test(nombre)) return "🎧";

  return iconoArchivo(recurso?.tipo || "");
}

function iconoArchivo(tipo: string) {
  const t = (tipo || "").toLowerCase();
  if (t.includes("foto") || t.includes("imagen")) return "📷";
  if (t.includes("acta") || t.includes("documento")) return "📄";
  if (t.includes("video")) return "🎥";
  if (t.includes("audio")) return "🎧";
  if (t.includes("logo")) return "🎨";
  return "📁";
}

function lineaConsulta(modulo: Modulo | "Personas" | "Entidades", item: any) {
  if (modulo === "Personas") return `👤 ${item.nombre} ${item.apellido1} ${item.apellido2}   |   📞 ${item.telefono}   |   ✉ ${item.correo}`;
  if (modulo === "Entidades") return `🏢 ${item.nombre}   |   📞 ${item.telefono}   |   ✉ ${item.correo}   |   ${item.tipo}   |   📍 ${item.distrito}`;
  if (modulo === "Recursos") return `${iconoArchivo(item.tipo)} ${item.tipo}   |   📄 ${item.ubicacion || item.descripcion}   |   👤 ${nombrePropietario(item)}   |   ${item.observaciones || item.descripcion || "Sin observaciones"}   |   🔒 ${item.visibilidad}   |   📅 ${item.fecha || "Sin fecha"} ${item.hora || ""}`;
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


function nombreModulo(m: Modulo) {
  return m === "Recursos" ? "Biblioteca" : m;
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
const versionTag = { fontSize: 12, color: "#1e3a8a", background: "#dbeafe", padding: "3px 8px", borderRadius: 999, marginLeft: 8 };
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
const libraryHeader = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" as const, marginBottom: 10 };
const libraryHeaderTitle = { fontSize: 18, fontWeight: 800 };
const libraryUser = { fontSize: 13, color: "#475569", background: "#f8fafc", border: "1px solid #e5e7eb", padding: "6px 10px", borderRadius: 999 };
const libraryUserInline = { fontSize: 13, color: "#475569", fontWeight: 500 };
const fileOneButton = { padding: "12px 14px", borderRadius: 12, border: "1px solid #1e3a8a", background: "#eff6ff", color: "#1e3a8a", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", whiteSpace: "nowrap" as const };
const recentObs = { marginTop: 3, fontSize: 11, color: "#334155", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" };
const previewBox = { gridColumn: "1 / -1", padding: 12, borderRadius: 16, border: "1px solid #e5e7eb", background: "#f8fafc", color: "#475569", fontSize: 14 };
const previewGrid = { display: "flex", gap: 10, flexWrap: "nowrap" as const, marginTop: 10, overflowX: "auto" as const, paddingBottom: 8 };
const previewItem = { width: 150, minWidth: 150, border: "1px solid #e5e7eb", borderRadius: 12, background: "white", padding: 8 };
const previewImage = { width: "100%", height: 90, objectFit: "cover" as const, borderRadius: 8, border: "1px solid #e5e7eb", display: "block" };
const fileIcon = { height: 90, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, background: "#f1f5f9", borderRadius: 8 };
const fileCaption = { marginTop: 6, fontSize: 12, color: "#475569", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" };
const saveBar = { position: "sticky" as const, bottom: 10, zIndex: 50, display: "flex", justifyContent: "flex-end", padding: "10px 0", background: "linear-gradient(180deg, rgba(255,255,255,.15), rgba(255,255,255,.95))" };
const recentBox = { marginTop: 12, padding: 12, borderRadius: 16, border: "1px solid #e5e7eb", background: "#ffffff" };
const recentScroll = { display: "flex", gap: 10, overflowX: "auto" as const, paddingTop: 10, paddingBottom: 6 };
const recentCard = { width: 150, minWidth: 150, border: "1px solid #e5e7eb", borderRadius: 14, background: "#f8fafc", padding: 8, position: "relative" as const };
const recentThumb = { height: 86, borderRadius: 10, background: "#eef2f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, overflow: "hidden" };
const recentImage = { width: "100%", height: "100%", objectFit: "cover" as const };
const recentName = { marginTop: 6, fontSize: 12, fontWeight: 700, color: "#1f2937", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" };
const recentMeta = { marginTop: 2, fontSize: 11, color: "#64748b", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" };
const emptyRecent = { minWidth: 260, color: "#64748b", fontSize: 13, padding: 10 };
const deleteMini = { position: "absolute" as const, top: 6, right: 6, border: "none", background: "#fee2e2", color: "#991b1b", borderRadius: 999, width: 28, height: 28, cursor: "pointer" };
const pendingCard = { width: 150, minWidth: 150, border: "2px solid #1e3a8a", borderRadius: 14, background: "#eff6ff", padding: 8, position: "relative" as const };
const pendingBadge = { position: "absolute" as const, top: 6, left: 6, background: "#1e3a8a", color: "white", borderRadius: 999, padding: "2px 7px", fontSize: 10, fontWeight: 800, maxWidth: 130, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" };


const visorOverlay = { position: "fixed" as const, inset: 0, background: "rgba(15,23,42,.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 18 };
const visorCaja = { width: "min(920px, 94vw)", maxHeight: "90vh", overflow: "auto" as const, background: "white", borderRadius: 22, padding: 16, boxShadow: "0 24px 90px rgba(15,23,42,.35)" };
const visorHeader = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 };
const visorMeta = { fontSize: 13, color: "#64748b", marginTop: 3 };
const visorCerrar = { border: "none", background: "#fee2e2", color: "#991b1b", borderRadius: 999, width: 34, height: 34, fontSize: 24, cursor: "pointer", lineHeight: "30px" };
const visorContenido = { minHeight: 260, borderRadius: 16, background: "#f8fafc", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" };
const visorImagen = { maxWidth: "100%", maxHeight: "68vh", objectFit: "contain" as const };
const visorFrame = { width: "100%", height: "68vh", border: "none", background: "white" };
const visorVideo = { maxWidth: "100%", maxHeight: "68vh" };
const visorMensaje = { padding: 24, textAlign: "center" as const, color: "#334155" };
const visorIcono = { fontSize: 72, marginBottom: 10 };
const visorLink = { display: "inline-block", marginTop: 10, padding: "9px 14px", borderRadius: 999, background: "#1e3a8a", color: "white", textDecoration: "none", fontWeight: 700 };
const visorObs = { marginTop: 12, padding: 12, borderRadius: 14, background: "#f8fafc", color: "#334155", whiteSpace: "pre-wrap" as const };

function chip(active: boolean) {
  return { padding: "9px 14px", borderRadius: 999, border: "1px solid #d1d5db", background: active ? "#1e3a8a" : "white", color: active ? "white" : "#475569", cursor: "pointer", whiteSpace: "nowrap" as const };
}

function iconButton(active: boolean) {
  return { width: 42, height: 42, borderRadius: 999, border: "1px solid #d1d5db", background: active ? "#1e3a8a" : "white", color: active ? "white" : "#475569", cursor: "pointer", fontSize: 18 };
}
