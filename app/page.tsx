export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0e27",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "#00d9ff" }}>
          ✓ Vercel Deployment Test
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px", lineHeight: "1.6" }}>
          Your Next.js app is successfully deployed on Vercel!
        </p>
        <div
          style={{
            backgroundColor: "#1a1f3a",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            fontSize: "0.95rem",
          }}
        >
          <p>
            <strong>Deployed at:</strong> {new Date().toISOString()}
          </p>
          <p style={{ marginTop: "10px" }}>
            <strong>Environment:</strong> Production
          </p>
        </div>
        <p style={{ fontSize: "0.95rem", color: "#a0aec0" }}>
          This confirms your Vercel hosting is working correctly. You can now deploy your real projects!
        </p>
      </div>
    </main>
  );
}
