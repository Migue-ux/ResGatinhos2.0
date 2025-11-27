import React from "react";

export default function PageErro({
    status = 404,
    message = "Nosso gatinho teve um pequeno tropeço. Tente novamente ou volte para a página inicial.",
}) {
    const onRetry = () => {
        if (typeof window !== "undefined") window.location.reload();
    };

    const onBack = () => {
        if (typeof window === "undefined") return;
        if (window.history.length > 1) window.history.back();
        else window.location.href = "/";
    };

    const containerStyle = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
        background: "linear-gradient(180deg, #f8fbff 0%, #fffdf6 100%)",
        fontFamily: "Comic Sans MS, 'Chalkboard SE', 'Segoe UI', Roboto, Arial, sans-serif",
        color: "#0f172a",
    };

    const cardStyle = {
        position: "relative",
        maxWidth: 720,
        width: "100%",
        borderRadius: 20,
        padding: 28,
        boxShadow: "0 12px 40px rgba(2,6,23,0.08)",
        background: "linear-gradient(180deg, #ffffffcc 0%, #fff 100%)",
        textAlign: "center",
        overflow: "visible",
    };

    const catSvgStyle = {
        width: 112,
        height: 112,
        margin: "0 auto 8px",
        display: "block",
    };

    const pawStyleTop = {
        position: "absolute",
        top: -18,
        right: -18,
        fontSize: 48,
        opacity: 0.12,
        pointerEvents: "none",
        transform: "rotate(-20deg)",
    };

    const pawStyleBottom = {
        position: "absolute",
        bottom: -18,
        left: -18,
        fontSize: 56,
        opacity: 0.10,
        pointerEvents: "none",
        transform: "rotate(10deg)",
    };

    const statusStyle = {
        fontSize: 56,
        fontWeight: 800,
        margin: "6px 0 0 0",
        color: "#fb7185", 
    };

    const titleStyle = {
        fontSize: 20,
        margin: "8px 0 0 0",
    };

    const messageStyle = {
        marginTop: 12,
        color: "#475569",
        lineHeight: 1.4,
    };

    const actionsStyle = {
        marginTop: 18,
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
    };

    const btnStyle = {
        padding: "10px 18px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
    };

    return (
        <main style={containerStyle} role="main">
            <section style={cardStyle} role="alert" aria-live="assertive">
                <span style={pawStyleTop}></span>
                <span style={pawStyleBottom}></span>

              <svg
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg"
  style={catSvgStyle}
  aria-hidden="true"
>
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stopColor="#ffd7e0" />
      <stop offset="1" stopColor="#fff1f5" />
    </linearGradient>
  </defs>

  <g transform="translate(10,10)">
    {/* Almofada central */}
    <ellipse
      cx="50"
      cy="70"
      rx="30"
      ry="25"
      fill="url(#g)"
      stroke="#ffd1df"
      strokeWidth="2"
    />

    {/* Deditos */}
    <ellipse cx="30" cy="35" rx="10" ry="12" fill="url(#g)" stroke="#ffd1df" strokeWidth="2" />
    <ellipse cx="50" cy="28" rx="11" ry="13" fill="url(#g)" stroke="#ffd1df" strokeWidth="2" />
    <ellipse cx="70" cy="35" rx="10" ry="12" fill="url(#g)" stroke="#ffd1df" strokeWidth="2" />
    <ellipse cx="90" cy="45" rx="9" ry="11" fill="url(#g)" stroke="#ffd1df" strokeWidth="2" />
  </g>
</svg>


                <h1 style={statusStyle}>{status}</h1>
                <h2 style={titleStyle}>Ihh... o pet se perdeu!</h2>
                <p style={messageStyle}>{message}</p>

                <div style={actionsStyle}>
                    <button
                        onClick={onRetry}
                        style={{
                            ...btnStyle,
                            background: "#10b981",
                            color: "white",
                            boxShadow: "0 6px 18px rgba(16,185,129,0.18)",
                        }}
                        aria-label="Tentar novamente"
                    >
                         Tentar novamente
                    </button>

                    <button
                        onClick={onBack}
                        style={{
                            ...btnStyle,
                            background: "#f3f4f6",
                            color: "#0f172a",
                            boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
                        }}
                        aria-label="Voltar"
                    >
                        ← Voltar
                    </button>

                    <a
                        href="/"
                        style={{
                            ...btnStyle,
                            display: "inline-block",
                            textDecoration: "none",
                            background: "transparent",
                            color: "#2563eb",
                            border: "1px solid transparent",
                        }}
                        aria-label="Ir para início"
                    >
                         Ir para início
                    </a>
                </div>
            </section>
        </main>
    );
}