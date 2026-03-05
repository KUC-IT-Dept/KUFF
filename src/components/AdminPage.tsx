import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, LogOut, RefreshCw, CheckCircle2, XCircle, Loader2 } from "lucide-react";

/* ── Types ── */
interface Registration {
    _id: string;
    fullName: string;
    mobNum: string;
    collegeName: string;
    stayNeeded: boolean;
    screenshotUrl: string;
    createdAt: string;
}

const ADMIN_USER = "naveen";
const ADMIN_PASS = "naveen123";
const TOKEN = `${ADMIN_USER}:${ADMIN_PASS}`;

/* ─────────────────────────────── ADMIN PAGE ─────────────────────────────── */
const AdminPage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    /* Fetch registrations once logged in */
    useEffect(() => {
        if (loggedIn) fetchRegistrations();
    }, [loggedIn]);

    const fetchRegistrations = async () => {
        setLoading(true);
        setFetchError("");
        try {
            const res = await fetch("https://kuff-backend-production.up.railway.app/api/admin/registrations", {
                headers: { "x-admin-token": TOKEN },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Failed to fetch.");
            setRegistrations(data);
        } catch (e: unknown) {
            setFetchError(e instanceof Error ? e.message : "Could not load data.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            setLoggedIn(true);
            setLoginError("");
        } else {
            setLoginError("Invalid credentials. Try again.");
        }
    };

    /* ── Login Screen ── */
    if (!loggedIn) {
        return (
            <div style={pageWrap}>
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    style={loginCard}
                >
                    <div style={lockRing}>
                        <Lock size={28} color="#f72585" />
                    </div>
                    <h1 style={loginTitle}>Admin Access</h1>
                    <p style={loginSub}>KUFF 2026 · Registrations</p>

                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
                        <div style={inputWrap}>
                            <User size={15} color="#666" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="text" placeholder="Username" autoComplete="username"
                                value={username} onChange={e => { setUsername(e.target.value); setLoginError(""); }}
                                style={loginInput}
                            />
                        </div>
                        <div style={inputWrap}>
                            <Lock size={15} color="#666" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="password" placeholder="Password" autoComplete="current-password"
                                value={password} onChange={e => { setPassword(e.target.value); setLoginError(""); }}
                                style={loginInput}
                            />
                        </div>
                        {loginError && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ color: "#f72585", fontSize: "0.8rem", textAlign: "center" }}>
                                {loginError}
                            </motion.p>
                        )}
                        <motion.button type="submit" whileTap={{ scale: 0.97 }} style={loginBtn}>
                            Sign In
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        );
    }

    /* ── Dashboard ── */
    return (
        <div style={dashWrap}>
            {/* Header */}
            <div style={dashHeader}>
                <div>
                    <p style={{ color: "#f72585", fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "'Space Grotesk',sans-serif", textTransform: "uppercase", fontWeight: 600 }}>KUFF 2026</p>
                    <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#f0f0f0", margin: 0 }}>
                        Registrations
                    </h1>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={fetchRegistrations} style={iconBtn} title="Refresh">
                        <RefreshCw size={16} />
                    </button>
                    <button onClick={() => setLoggedIn(false)} style={{ ...iconBtn, color: "#f72585" }} title="Sign out">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>

            {/* Stats pill */}
            <div style={statsPill}>
                <span style={{ color: "#888", fontSize: "0.82rem" }}>Total registrations:</span>
                <span style={{ color: "#f0f0f0", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                    {loading ? "—" : registrations.length}
                </span>
            </div>

            {/* Table area */}
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
                    <Loader2 size={32} color="#f72585" style={{ animation: "spin 1s linear infinite" }} />
                </div>
            ) : fetchError ? (
                <div style={errorBanner}>{fetchError}</div>
            ) : registrations.length === 0 ? (
                <div style={{ textAlign: "center", color: "#555", padding: "4rem", fontFamily: "'Space Grotesk',sans-serif" }}>
                    No registrations yet.
                </div>
            ) : (
                <div style={tableScroll}>
                    <table style={table}>
                        <thead>
                            <tr>
                                {["#", "Full Name", "Phone", "College", "Stay", "Screenshot", "Registered At"].map(h => (
                                    <th key={h} style={th}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((r, i) => (
                                <motion.tr
                                    key={r._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    style={i % 2 === 0 ? tdRowEven : tdRowOdd}
                                >
                                    <td style={td}>{registrations.length - i}</td>
                                    <td style={{ ...td, fontWeight: 600, color: "#f0f0f0" }}>{r.fullName}</td>
                                    <td style={td}>{r.mobNum}</td>
                                    <td style={{ ...td, maxWidth: "200px" }}>{r.collegeName}</td>
                                    <td style={{ ...td, textAlign: "center" }}>
                                        {r.stayNeeded
                                            ? <CheckCircle2 size={16} color="#06b6d4" />
                                            : <XCircle size={16} color="#444" />}
                                    </td>
                                    <td style={td}>
                                        <button
                                            onClick={() => setPreviewUrl(r.screenshotUrl)}
                                            style={screenshotBtn}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td style={{ ...td, color: "#666", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                                        {new Date(r.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Screenshot lightbox */}
            <AnimatePresence>
                {previewUrl && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setPreviewUrl(null)}
                        style={lightboxOverlay}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            onClick={e => e.stopPropagation()}
                            style={lightboxCard}
                        >
                            <button onClick={() => setPreviewUrl(null)} style={closeBtn}>✕</button>
                            <img src={previewUrl} alt="Payment screenshot" style={lightboxImg} />
                            <a href={previewUrl} target="_blank" rel="noreferrer" style={openLink}>Open full image ↗</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
        </div>
    );
};

/* ────────── Styles ────────── */
const pageWrap: React.CSSProperties = {
    minHeight: "100vh", background: "#050505",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "1.5rem",
};
const loginCard: React.CSSProperties = {
    background: "rgba(17,17,17,0.95)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px", padding: "2.5rem 2rem", width: "100%", maxWidth: "380px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
    boxShadow: "0 12px 60px rgba(0,0,0,0.6)",
};
const lockRing: React.CSSProperties = {
    width: "64px", height: "64px", borderRadius: "50%",
    border: "2px solid rgba(247,37,133,0.3)", background: "rgba(247,37,133,0.07)",
    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.25rem",
};
const loginTitle: React.CSSProperties = {
    fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#f0f0f0", margin: 0,
};
const loginSub: React.CSSProperties = { color: "#555", fontSize: "0.82rem", margin: "0 0 0.5rem" };
const inputWrap: React.CSSProperties = { position: "relative", width: "100%" };
const loginInput: React.CSSProperties = {
    width: "100%", paddingLeft: "2.25rem", padding: "0.7rem 0.75rem 0.7rem 2.25rem",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px", color: "#f0f0f0", fontSize: "0.9rem",
    fontFamily: "'Inter',sans-serif", outline: "none", boxSizing: "border-box",
};
const loginBtn: React.CSSProperties = {
    padding: "0.8rem", background: "linear-gradient(135deg,#f72585,#b5179e)",
    color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Space Grotesk',sans-serif",
    fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
    boxShadow: "0 0 16px rgba(247,37,133,0.3)", letterSpacing: "0.04em",
};
const dashWrap: React.CSSProperties = {
    minHeight: "100vh", background: "#050505", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto",
};
const dashHeader: React.CSSProperties = {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    marginBottom: "1.5rem", paddingBottom: "1.25rem",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
};
const statsPill: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px", padding: "0.35rem 0.9rem", marginBottom: "1.5rem",
};
const iconBtn: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px", padding: "0.5rem", cursor: "pointer", color: "#aaa",
    display: "flex", alignItems: "center",
};
const tableScroll: React.CSSProperties = {
    overflowX: "auto", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.07)",
};
const table: React.CSSProperties = {
    width: "100%", borderCollapse: "collapse",
    fontFamily: "'Inter',sans-serif", fontSize: "0.875rem",
};
const th: React.CSSProperties = {
    padding: "0.85rem 1rem", textAlign: "left",
    background: "rgba(255,255,255,0.04)", color: "#888",
    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
    fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase",
    borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap",
};
const td: React.CSSProperties = {
    padding: "0.85rem 1rem", color: "#bbb", verticalAlign: "middle",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
};
const tdRowEven: React.CSSProperties = { background: "rgba(17,17,17,0.8)" };
const tdRowOdd: React.CSSProperties = { background: "rgba(25,25,25,0.8)" };
const screenshotBtn: React.CSSProperties = {
    background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)",
    borderRadius: "6px", color: "#06b6d4", fontSize: "0.78rem",
    padding: "0.25rem 0.6rem", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif",
    fontWeight: 600,
};
const errorBanner: React.CSSProperties = {
    background: "rgba(247,37,133,0.08)", border: "1px solid rgba(247,37,133,0.3)",
    borderRadius: "10px", padding: "1rem 1.25rem", color: "#f72585", fontSize: "0.85rem",
};
const lightboxOverlay: React.CSSProperties = {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 9999, padding: "1.5rem",
};
const lightboxCard: React.CSSProperties = {
    background: "#111", borderRadius: "14px", padding: "1.25rem",
    maxWidth: "520px", width: "100%", position: "relative",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem",
    border: "1px solid rgba(255,255,255,0.1)",
};
const lightboxImg: React.CSSProperties = {
    width: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: "8px",
};
const closeBtn: React.CSSProperties = {
    position: "absolute", top: "10px", right: "10px",
    background: "rgba(247,37,133,0.8)", border: "none", borderRadius: "50%",
    width: "28px", height: "28px", color: "#fff", cursor: "pointer",
    fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center",
};
const openLink: React.CSSProperties = {
    color: "#06b6d4", fontSize: "0.8rem", textDecoration: "none",
    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
};

export default AdminPage;
