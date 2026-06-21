export default function Home() {
  const categorias = [
    { titulo: "Personas", numero: "0", descripcion: "Ciudadanos registrados en la plataforma." },
    { titulo: "Agrupaciones", numero: "0", descripcion: "Organizaciones y grupos comunitarios." },
    { titulo: "Proyectos", numero: "0", descripcion: "Iniciativas activas para el desarrollo de Belén." },
  ];

  const agrupaciones = [
    "CDAM Belén",
    "Asociación de Adultos Belemitas",
    "Parroquia San Antonio de Belén",
    "Comité Cantonal de Deportes",
    "Cámara de Comercio",
  ];

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f8f5ef 0%,#ffffff 55%,#eef2f7 100%)", fontFamily: "Georgia, serif", padding: "40px", color: "#1f2937" }}>
      <section style={{ textAlign: "center", marginTop: "45px", marginBottom: "60px" }}>
        <p style={{ letterSpacing: "4px", fontSize: "0.78rem", color: "#6b7280" }}>
          COMUNIDAD • PARTICIPACIÓN • FUTURO
        </p>

        <h1 style={{ fontSize: "clamp(2.7rem,7vw,5rem)", margin: "18px 0", lineHeight: 1 }}>
          Belén en Movimiento
        </h1>

        <p style={{ fontSize: "1.35rem", marginBottom: "28px" }}>
          Juntos hacemos que Belén avance.
        </p>

        <div style={{ maxWidth: "900px", margin: "0 auto", background: "#fff", borderRadius: "999px", padding: "18px 25px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.08)", color: "#64748b" }}>
          🔍 Buscar personas, agrupaciones, instituciones, actividades o proyectos...
        </div>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          {["Personas", "Agrupaciones", "Instituciones", "Actividades", "Proyectos"].map((item) => (
            <span key={item} style={{ padding: "10px 18px", borderRadius: "999px", background: "#ffffff", border: "1px solid #d1d5db" }}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto 70px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "24px" }}>
        {categorias.map((item) => (
          <div key={item.titulo} style={{ background: "rgba(255,255,255,0.85)", borderRadius: "24px", padding: "35px", textAlign: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "2.8rem", fontWeight: "bold", color: "#1e3a8a" }}>{item.numero}</div>
            <h2>{item.titulo}</h2>
            <p style={{ color: "#64748b", lineHeight: 1.8 }}>{item.descripcion}</p>
          </div>
        ))}
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ letterSpacing: "3px", fontSize: "0.75rem", color: "#6b7280" }}>
          PRIMERAS CONEXIONES
        </p>

        <h2 style={{ fontSize: "2.4rem", marginBottom: "30px" }}>
          Agrupaciones destacadas
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px" }}>
          {agrupaciones.map((nombre) => (
            <div key={nombre} style={{ background: "rgba(255,255,255,0.78)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "20px", padding: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 10px" }}>{nombre}</h3>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>
                Organización vinculada al movimiento comunitario de Belén.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
