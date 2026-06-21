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
