export default function Home() {
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
        <p
          style={{
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontSize: "0.85rem",
            color: "#7c6f57",
            marginBottom: "24px",
          }}
        >
          Comunidad • Participación • Futuro
        </p>

        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: "1",
            margin: "0 0 28px",
            fontWeight: 700,
          }}
        >
          Belén en Movimiento
        </h1>

        <p
          style={{
            fontSize: "1.45rem",
            color: "#334155",
            marginBottom: "24px",
          }}
        >
          Juntos hacemos que Belén avance.
        </p>

        <p
          style={{
            maxWidth: "760px",
            fontSize: "1.05rem",
            lineHeight: "1.9",
            color: "#667085",
            marginBottom: "42px",
          }}
        >
          Una iniciativa para conectar personas, agrupaciones y proyectos que
          fortalecen nuestra comunidad con visión, orden y participación.
        </p>

        <button
          style={{
            padding: "16px 38px",
            borderRadius: "999px",
            border: "1px solid #1e3a8a",
            background: "#1e3a8a",
            color: "white",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 14px 30px rgba(30, 58, 138, 0.22)",
          }}
        >
          Conozca más
        </button>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "22px",
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        {["Personas", "Agrupaciones", "Proyectos"].map((item) => (
          <div
            key={item}
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(30, 41, 59, 0.10)",
              borderRadius: "24px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h2 style={{ margin: "0 0 12px", fontSize: "1.35rem" }}>
              {item}
            </h2>
            <p style={{ margin: 0, color: "#667085", lineHeight: "1.7" }}>
              Parte esencial del movimiento que impulsa el desarrollo de Belén.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
