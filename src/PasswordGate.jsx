import { useState } from "react";

const PASSWORD = "hvb-beatvest-wealth";

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("uc-unlocked") === "1"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (unlocked) return children;

  const submit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem("uc-unlocked", "1");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', Arial, sans-serif",
      padding: 24,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        textAlign: "center",
      }}>
        <img
          src="/unicredit-logo.png"
          alt="UniCredit"
          style={{ height: 36, width: "auto", marginBottom: 32 }}
        />

        <h1 style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0d0c1a",
          marginBottom: 8,
          letterSpacing: -0.3,
        }}>
          Geschützter Bereich
        </h1>
        <p style={{
          fontSize: 14,
          color: "#6b7280",
          marginBottom: 32,
          lineHeight: 1.5,
        }}>
          Bitte gib das Passwort ein, um fortzufahren.
        </p>

        <form onSubmit={submit}>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Passwort"
            autoFocus
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: error ? "2px solid #ef4444" : "1.5px solid #e5e7eb",
              fontSize: 15,
              outline: "none",
              marginBottom: 12,
              boxSizing: "border-box",
              transition: "border-color .15s",
              animation: shake ? "shake 0.4s ease" : "none",
              background: error ? "#fef2f2" : "#fff",
            }}
          />

          {error && (
            <p style={{
              fontSize: 13,
              color: "#ef4444",
              marginBottom: 12,
              textAlign: "left",
            }}>
              Falsches Passwort. Bitte versuche es erneut.
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 360,
              border: "none",
              background: "#e2001a",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              letterSpacing: -0.2,
            }}
          >
            Zugang →
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
