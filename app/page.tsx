"use client";

import { useState } from "react";

type Modulo =| "Personas"| "Entidades"| "Actividades"| "Proyectos"| "Recursos"| "Comunicaciones";

type Accion = "Vista" | "Editar" | "Excluir" | "Vincular" | "Recursos" | "Nuevo";

const modulos: Modulo[] = ["Personas","Entidades","Actividades","Proyectos","Recursos","Comunicaciones",];

const personasBase = [{ id: "p1", nombre: "Elvin", apellido1: "González", apellido2: "Rodríguez", cedula: "000000000", distrito: "San Antonio", telefono: "8888-0000", correo: "elvin@email.com" },{ id: "p2", nombre: "Sonia", apellido1: "Román", apellido2: "Zeledón", cedula: "000000001", distrito: "Belén", telefono: "8888-1111", correo: "sonia@email.com" },{ id: "p3", nombre: "Zeneida", apellido1: "Chávez", apellido2: "Fernández", cedula: "000000002", distrito: "Belén", telefono: "8888-2222", correo: "zeneida@email.com" },];

const entidadesBase = [{ id: "e1", nombre: "CDAM Belén", tipo: "Agrupación", categoria: "Adulto Mayor", distrito: "Belén", telefono: "2233-0000", correo: "info@cdam.cr" },{ id: "e2", nombre: "Belén en Movimiento", tipo: "Agrupación comunitaria", categoria: "Participación ciudadana", distrito: "Belén", telefono: "8888-3333", correo: "info@belenmovimiento.cr" },{ id: "e3", nombre: "Municipalidad de Belén", tipo: "Institución", categoria: "Gobierno local", distrito: "San Antonio", telefono: "2587-0000", correo: "info@belen.go.cr" },{ id: "e4", nombre: "Intel Costa Rica", tipo: "Empresa", categoria: "Tecnología", distrito: "La Ribera", telefono: "2200-0000", correo: "contacto@intel.com" },];

const datosBase: Record<Modulo, any[]> = {Personas: personasBase,Entidades: entidadesBase,Actividades: [{ id: "a1", nombre: "Caravana Dorada", tipo: "Comunitaria", fecha: "07/06/2026", relacionado: "CDAM Belén" },{ id: "a2", nombre: "Reunión de coordinación", tipo: "Interna", fecha: "20/06/2026", relacionado: "Belén en Movimiento" },],Proyectos: [{ id: "pr1", nombre: "Belén en Movimiento", tipo: "Comunitario", fecha: "2026", relacionado: "Cantón de Belén" },{ id: "pr2", nombre: "Bosque de Campanas", tipo: "Ambiental", fecha: "2026", relacionado: "Belén" },],Recursos: [],Comunicaciones: [{ id: "c1", nombre: "Convocatoria comunitaria", tipo: "Publicación", fecha: "2026", relacionado: "Redes sociales" },{ id: "c2", nombre: "Comunicado institucional", tipo: "Noticia", fecha: "2026", relacionado: "Web" },],};

const puestos = ["Presidente", "Vicepresidente", "Secretario", "Tesorero", "Vocal", "Coordinador General", "Miembro", "Voluntario", "Empleado", "Funcionario"];

const tiposRecurso = ["Fotografía","Acta Junta Directiva","Acta Asamblea","Documento varios","Logo","Video","Certificado","Formulario","Cotización","Factura","Contrato","Convenio","Otro",];

const visibilidades = ["Público", "Privado", "Compartido"];

export default function Home() {const [modulo, setModulo] = useState<Modulo>("Personas");const [busqueda, setBusqueda] = useState("");const [seleccionado, setSeleccionado] = useState<any | null>(null);const [accion, setAccion] = useState<Accion>("Vista");

const [vinculos, setVinculos] = useState<any[]>([{ personaId: "p2", entidadId: "e1", puesto: "Presidenta", directiva: "Sí", fecha: "2026-01-15" },{ personaId: "p2", entidadId: "e2", puesto: "Coordinadora", directiva: "No", fecha: "2026-06-01" },{ personaId: "p1", entidadId: "e2", puesto: "Coordinador General", directiva: "Sí", fecha: "2026-06-01" },]);

const [recursos, setRecursos] = useState<any[]>([{id: "r1",tipo: "Acta Junta Directiva",descripcion: "Acta Junta Directiva Enero 2026",ubicacion: "Drive / CDAM / Actas",visibilidad: "Compartido",observaciones: "Documento de ejemplo",propietarioTipo: "Entidades",propietarioId: "e1",},{id: "r2",tipo: "Fotografía",descripcion: "Foto Sonia Román",ubicacion: "Drive / Personas / Sonia",visibilidad: "Privado",observaciones: "Fotografía de perfil",propietarioTipo: "Personas",propietarioId: "p2",},]);

const [recursoVinculos, setRecursoVinculos] = useState<any[]>([{ recursoId: "r1", destinoTipo: "Entidades", destinoId: "e1" },{ recursoId: "r2", destinoTipo: "Personas", destinoId: "p2" },]);

const [busquedaVinculo, setBusquedaVinculo] = useState("");const [mostrarListaVinculo, setMostrarListaVinculo] = useState(false);const [vinculoSeleccionado, setVinculoSeleccionado] = useState<any | null>(null);const [puesto, setPuesto] = useState("");const [directiva, setDirectiva] = useState("No");const [fecha, setFecha] = useState("");

const [recursoForm, setRecursoForm] = useState({tipo: "Fotografía",descripcion: "",ubicacion: "",visibilidad: "Público",observaciones: "",propietarioTipo: "Entidades",propietarioId: "e1",});

const [tipoDestinoRecurso, setTipoDestinoRecurso] = useState<"Personas" | "Entidades">("Entidades");const [busquedaDestinoRecurso, setBusquedaDestinoRecurso] = useState("");const [mostrarListaDestinoRecurso, setMostrarListaDestinoRecurso] = useState(false);const [destinoRecursoSeleccionado, setDestinoRecursoSeleccionado] = useState<any | null>(null);

const lista =modulo === "Recursos"? recursos.filter((item) =>JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase())): datosBase[modulo].filter((item) =>JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase()));

const listaVinculo =modulo === "Personas"? entidadesBase.filter((item) =>JSON.stringify(item).toLowerCase().includes(busquedaVinculo.toLowerCase())): personasBase.filter((item) =>JSON.stringify(item).toLowerCase().includes(busquedaVinculo.toLowerCase()));

const listaDestinoRecurso =tipoDestinoRecurso === "Entidades"? entidadesBase.filter((item) =>JSON.stringify(item).toLowerCase().includes(busquedaDestinoRecurso.toLowerCase())): personasBase.filter((item) =>JSON.stringify(item).toLowerCase().includes(busquedaDestinoRecurso.toLowerCase()));

function cambiarModulo(m: Modulo) {setModulo(m);setBusqueda("");setSeleccionado(null);setAccion("Vista");limpiarVinculo();limpiarRecursoDestino();}

function volverALista(valorActual?: string) {if (valorActual !== undefined) setBusqueda(valorActual);setSeleccionado(null);setAccion("Vista");limpiarVinculo();limpiarRecursoDestino();}

function limpiarVinculo() {setBusquedaVinculo("");setMostrarListaVinculo(false);setVinculoSeleccionado(null);setPuesto("");setDirectiva("No");setFecha("");}

function limpiarRecursoDestino() {setBusquedaDestinoRecurso("");setMostrarListaDestinoRecurso(false);setDestinoRecursoSeleccionado(null);}

function limpiarRecursoForm() {setRecursoForm({tipo: "Fotografía",descripcion: "",ubicacion: "",visibilidad: "Público",observaciones: "",propietarioTipo: "Entidades",propietarioId: "e1",});}

function guardarVinculo() {if (!seleccionado || !vinculoSeleccionado || !puesto) return;

const nuevo =
  modulo === "Personas"
    ? { personaId: seleccionado.id, entidadId: vinculoSeleccionado.id, puesto, directiva, fecha }
    : { personaId: vinculoSeleccionado.id, entidadId: seleccionado.id, puesto, directiva, fecha };

setVinculos([...vinculos, nuevo]);
limpiarVinculo();

}

function guardarRecurso() {if (!recursoForm.descripcion.trim()) return;

if (accion === "Editar" && seleccionado && modulo === "Recursos") {
  const actualizados = recursos.map((r) =>
    r.id === seleccionado.id ? { ...r, ...recursoForm } : r
  );
  setRecursos(actualizados);
  setSeleccionado({ ...seleccionado, ...recursoForm });
  setAccion("Vista");
