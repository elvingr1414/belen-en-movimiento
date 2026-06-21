export default function Home() {
  const tags = ["Personas", "Agrupaciones", "Instituciones", "Actividades", "Proyectos"];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f5ef 0%, #ffffff 55%, #eef2f7 100%)",
        color: "#1f2933",
        fontFamily: "Georgia, serif",
        padding: "48px",
      }}
    >
      <section
        style={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ letterSpacing: "0.25em", textTransform: "uppercase", fontSize: "0.85rem", color: "#7c6f57", marginBottom: "24px" }}>
          Comunidad • Participación • Futuro
        </p>

        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: "1", margin: "0 0 28px", fontWeight: 700 }}>
          Belén en Movimiento
        </h1>

        <p style={{ fontSize: "1.45rem", color: "#334155", marginBottom: "34px" }}>
          Juntos hacemos que Belén avance.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "780px",
            background: "white",
            borderRadius: "999px",
            padding: "18px 26px",
            boxShadow: "0 22px 60px rgba(15, 23, 42, 0.12)",
            border: "1px solid rgba(30, 41, 59, 0.10)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "22px",
          }}
        >
          <span style={{ fontSize: "1.35rem" }}>🔍</span>
          <input
            placeholder="Buscar personas, agrupaciones, instituciones, actividades o proyectos..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "Arial, sans-serif",
              color: "#1f2933",
            }}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(30,41,59,0.10)",
                color: "#475569",
                fontSize: "0.95rem",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
