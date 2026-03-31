"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Falsches Passwort.");
      setPw("");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.plusWrap}>
          <span style={styles.plusH}>|</span>
          <span style={styles.plusV}>—</span>
        </div>
        <div style={styles.brand}>BERENT.AI</div>
        <div style={styles.subtitle}>Vertrauliches Dokument · Zugang erforderlich</div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Passwort"
            style={styles.input}
            autoFocus
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "…" : "Zugang öffnen"}
          </button>
        </form>
        <div style={styles.footer}>briefing-001 · berent.ai</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#090806",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Lora', Georgia, serif",
  },
  card: {
    background: "#110e0a",
    border: "1px solid #2a2118",
    borderRadius: 4,
    padding: "3rem 2.5rem",
    width: "100%",
    maxWidth: 380,
    textAlign: "center",
  },
  plusWrap: {
    position: "relative",
    width: 28,
    height: 28,
    margin: "0 auto 1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  plusH: {
    position: "absolute",
    color: "#E8C98A",
    fontSize: 28,
    fontWeight: 300,
    lineHeight: 1,
    transform: "rotate(90deg)",
  },
  plusV: {
    position: "absolute",
    color: "#E8C98A",
    fontSize: 22,
    fontWeight: 300,
    lineHeight: 1,
  },
  brand: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.6rem",
    letterSpacing: "0.1em",
    color: "#B5742A",
    marginBottom: "0.4rem",
  },
  subtitle: {
    color: "#7A6A58",
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  input: {
    background: "#090806",
    border: "1px solid #2a2118",
    borderRadius: 2,
    color: "#C4BCB1",
    fontFamily: "'Lora', Georgia, serif",
    fontSize: "0.95rem",
    padding: "0.7rem 1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  error: {
    color: "#D4622A",
    fontSize: "0.82rem",
  },
  btn: {
    background: "#B5742A",
    border: "none",
    borderRadius: 2,
    color: "#090806",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.07em",
    padding: "0.7rem 1rem",
    marginTop: "0.4rem",
  },
  footer: {
    color: "#7A6A58",
    fontSize: "0.75rem",
    marginTop: "2rem",
    letterSpacing: "0.03em",
  },
};
