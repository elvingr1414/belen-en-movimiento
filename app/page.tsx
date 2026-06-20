export default function Home() {

  return (

    <main

      style={{

        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        background: "#f8f9fa",

        color: "#1f2937",

        textAlign: "center",

        padding: "40px",

      }}

    >

      <h1

        style={{

          fontSize: "4rem",

          marginBottom: "20px",

        }}

      >

        Belén en Movimiento

      </h1>

      <p

        style={{

          fontSize: "1.4rem",

          maxWidth: "700px",

          marginBottom: "30px",

        }}

      >

        Juntos hacemos que Belén avance.

      </p>

      <p

        style={{

          maxWidth: "800px",

          color: "#6b7280",

          lineHeight: "1.8",

          marginBottom: "40px",

        }}

      >

        Una iniciativa para conectar personas, agrupaciones y proyectos

        que fortalecen nuestra comunidad.

      </p>

      <button

        style={{

          padding: "15px 35px",

          borderRadius: "12px",

          border: "none",

          background: "#1e3a8a",

          color: "white",

          fontSize: "1rem",

          cursor: "pointer",

        }}

      >

        Conozca más

      </button>

      <div

        style={{

          marginTop: "80px",

          fontSize: "2rem",

        }}

      >

        ⚙️ ⚙️ ⚙️

      </div>

    </main>

  );

}
