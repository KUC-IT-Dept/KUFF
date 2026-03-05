import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Phone,
    GraduationCap,
    BedDouble,
    Upload,
    AlertTriangle,
    ExternalLink,
    CheckCircle2,
    X,
    Loader2,
} from "lucide-react";

interface FormState {
    fullName: string;
    mobNum: string;
    collegeName: string;
    stayNeeded: boolean;
    screenshot: File | null;
}

const UPI_URL = "upi://pay?pa=7012221534@paytm&pn=Recipient&am=50&cu=INR";

const RegistrationForm: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        fullName: "",
        mobNum: "",
        collegeName: "",
        stayNeeded: false,
        screenshot: null,
    });
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    /* ── Validation ── */
    const validate = (): boolean => {
        const e: Partial<Record<keyof FormState, string>> = {};
        if (!form.fullName.trim()) e.fullName = "Full name is required.";
        if (!form.mobNum.trim()) {
            e.mobNum = "Mobile number is required.";
        } else if (!/^[6-9]\d{9}$/.test(form.mobNum.trim())) {
            e.mobNum = "Enter a valid 10-digit Indian mobile number.";
        }
        if (!form.collegeName.trim()) e.collegeName = "College name is required.";
        if (!form.screenshot) e.screenshot = "Payment screenshot is required.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setServerError(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFile(file);
    };

    const setFile = (file: File | null) => {
        setForm((prev) => ({ ...prev, screenshot: file }));
        setErrors((prev) => ({ ...prev, screenshot: undefined }));
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setScreenshotPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setScreenshotPreview(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    /* ── Submit → POST to backend ── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setServerError(null);

        try {
            const fd = new FormData();
            fd.append("fullName", form.fullName.trim());
            fd.append("mobNum", form.mobNum.trim());
            fd.append("collegeName", form.collegeName.trim());
            fd.append("stayNeeded", String(form.stayNeeded));
            fd.append("screenshot", form.screenshot!);

            const res = await fetch("https://kuff-backend-production.up.railway.app/api/register", { method: "POST", body: fd });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error ?? "Registration failed.");
            setSubmitted(true);
        } catch (err: unknown) {
            setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ── Success Screen ── */
    if (submitted) {
        return (
            <section id="register" style={sectionWrap}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={successCard}
                >
                    <div style={successIconRing}>
                        <CheckCircle2 size={44} color="#06b6d4" />
                    </div>
                    <h2 style={successTitle}>You're Registered!</h2>
                    <p style={{ color: "#aaa", fontSize: "0.95rem", lineHeight: 1.6 }}>
                        Your registration for{" "}
                        <span style={{ color: "#f72585", fontWeight: 700 }}>KUFF 2026</span> has been
                        received. We'll get in touch with you on your mobile number.
                    </p>
                </motion.div>
            </section>
        );
    }

    /* ── Form ── */
    return (
        <section id="register" style={sectionWrap}>
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                style={{ textAlign: "center", marginBottom: "3rem" }}
            >
                <p style={eyebrow}>KUFF 2026</p>

                <h2 style={sectionTitle}>Register Now</h2>
                <p style={{ color: "#888", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                    Secure your spot at Kerala's premier student film festival.
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleSubmit}
                noValidate
                style={formCard}
            >
                {/* Food Warning */}
                <div style={warningBanner}>
                    <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                        <span style={warningBold}>NO FOOD will be provided.</span>
                        <span style={{ color: "#ccc", fontSize: "0.85rem" }}>
                            {" "}Please make your own meal arrangements.
                        </span>
                    </div>
                </div>

                {/* Full Name */}
                <FieldRow icon={<User size={16} color="#f72585" />} label="Full Name" error={errors.fullName}>
                    <input
                        id="fullName" name="fullName" type="text"
                        placeholder="e.g. Arjun Menon"
                        value={form.fullName} onChange={handleChange}
                        style={inputStyle(!!errors.fullName)} autoComplete="name"
                        disabled={loading}
                    />
                </FieldRow>

                {/* Mobile */}
                <FieldRow icon={<Phone size={16} color="#f72585" />} label="Mobile Number" error={errors.mobNum}>
                    <input
                        id="mobNum" name="mobNum" type="tel"
                        placeholder="10-digit mobile number"
                        value={form.mobNum} onChange={handleChange}
                        style={inputStyle(!!errors.mobNum)} maxLength={10} autoComplete="tel"
                        disabled={loading}
                    />
                </FieldRow>

                {/* College */}
                <FieldRow icon={<GraduationCap size={16} color="#f72585" />} label="College Name" error={errors.collegeName}>
                    <input
                        id="collegeName" name="collegeName" type="text"
                        placeholder="e.g. Government Engineering College, Thrissur"
                        value={form.collegeName} onChange={handleChange}
                        style={inputStyle(!!errors.collegeName)} autoComplete="organization"
                        disabled={loading}
                    />
                </FieldRow>

                {/* Stay checkbox */}
                <label style={{ ...checkboxRow, opacity: loading ? 0.5 : 1 }}>
                    <div style={checkboxBox(form.stayNeeded)}>
                        <input
                            type="checkbox" name="stayNeeded" id="stayNeeded"
                            checked={form.stayNeeded} onChange={handleChange}
                            style={{ display: "none" }} disabled={loading}
                        />
                        <AnimatePresence>
                            {form.stayNeeded && (
                                <motion.svg
                                    key="check"
                                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.15 }}
                                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                                >
                                    <polyline points="2,6 5,9 10,3" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            )}
                        </AnimatePresence>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <BedDouble size={16} color="#06b6d4" />
                        <span style={{ color: "#e0e0e0", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}>
                            Stay needed (accommodation required)
                        </span>
                    </div>
                </label>

                <div style={divider} />

                {/* Pay Now */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <p style={payLabel}>Step 1 — Complete Payment (₹50)</p>
                    <a
                        href={UPI_URL}
                        style={payButton}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(247,37,133,0.65)";
                            (e.currentTarget as HTMLElement).style.opacity = "0.9";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(247,37,133,0.35)";
                            (e.currentTarget as HTMLElement).style.opacity = "1";
                        }}
                    >
                        <ExternalLink size={16} />
                        Pay Now — ₹50 via UPI
                    </a>
                    <p style={payHint}>Opens your UPI app (PhonePe, GPay, Paytm…)</p>
                </div>

                {/* Screenshot Upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <p style={payLabel}>Step 2 — Upload Payment Screenshot</p>

                    {screenshotPreview ? (
                        <div style={previewWrap}>
                            <img src={screenshotPreview} alt="Payment screenshot preview" style={previewImg} />
                            <button type="button" onClick={handleRemoveFile} style={removeBtn} title="Remove">
                                <X size={14} />
                            </button>
                            <span style={{ color: "#06b6d4", fontSize: "0.78rem", marginTop: "0.4rem", textAlign: "center" }}>
                                {form.screenshot?.name}
                            </span>
                        </div>
                    ) : (
                        <label
                            htmlFor="screenshot"
                            style={uploadZone(!!errors.screenshot)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files?.[0];
                                if (file) setFile(file);
                            }}
                        >
                            <Upload size={28} color={errors.screenshot ? "#f72585" : "#555"} />
                            <span style={{ color: "#888", fontSize: "0.85rem", textAlign: "center" }}>
                                Drag & drop or <span style={{ color: "#06b6d4" }}>browse</span> to upload
                            </span>
                            <span style={{ color: "#555", fontSize: "0.75rem" }}>PNG, JPG, WEBP — max 10 MB</span>
                            <input
                                ref={fileInputRef}
                                id="screenshot" name="screenshot" type="file" accept="image/*"
                                onChange={handleFileChange} style={{ display: "none" }}
                                disabled={loading}
                            />
                        </label>
                    )}
                    {errors.screenshot && <ErrorMsg msg={errors.screenshot} />}
                </div>

                {/* Server error */}
                {serverError && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: "rgba(247,37,133,0.08)",
                            border: "1px solid rgba(247,37,133,0.35)",
                            borderRadius: "8px", padding: "0.75rem 1rem",
                            color: "#f72585", fontSize: "0.85rem",
                            fontFamily: "'Space Grotesk', sans-serif",
                        }}
                    >
                        ⚠ {serverError}
                    </motion.div>
                )}

                {/* Submit */}
                <motion.button
                    type="submit"
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    disabled={loading}
                    style={{ ...submitBtn, opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                    onMouseEnter={(e) => {
                        if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(247,37,133,0.7)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(247,37,133,0.3)";
                    }}
                >
                    {loading ? (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                            Submitting…
                        </span>
                    ) : (
                        "Submit Registration"
                    )}
                </motion.button>
            </motion.form>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </section >
    );
};

/* ────────── Sub-components ────────── */

const FieldRow: React.FC<{
    icon: React.ReactNode; label: string; error?: string; children: React.ReactNode;
}> = ({ icon, label, error, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <label style={fieldLabel}>{icon} {label}</label>
        {children}
        {error && <ErrorMsg msg={error} />}
    </div>
);

const ErrorMsg: React.FC<{ msg: string }> = ({ msg }) => (
    <motion.p
        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
        style={{ color: "#f72585", fontSize: "0.78rem", marginTop: "0.1rem" }}
    >
        {msg}
    </motion.p>
);

/* ────────── Styles ────────── */

const sectionWrap: React.CSSProperties = { padding: "6rem 1.5rem", maxWidth: "680px", margin: "0 auto" };

const eyebrow: React.CSSProperties = {
    fontSize: "0.7rem", fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "0.25em", color: "#f72585", fontWeight: 600,
    textTransform: "uppercase", marginBottom: "0.5rem",
};

const sectionTitle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, color: "#f0f0f0", lineHeight: 1.1,
};

const formCard: React.CSSProperties = {
    background: "rgba(17,17,17,0.9)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px", padding: "2.5rem", display: "flex", flexDirection: "column",
    gap: "1.5rem", backdropFilter: "blur(12px)", boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
};

const warningBanner: React.CSSProperties = {
    display: "flex", alignItems: "flex-start", gap: "0.75rem",
    background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.35)",
    borderRadius: "10px", padding: "0.85rem 1rem",
};

const warningBold: React.CSSProperties = {
    color: "#fbbf24", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
    fontSize: "0.9rem", letterSpacing: "0.02em",
};

const fieldLabel: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.4rem", color: "#ccc",
    fontSize: "0.82rem", fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500, letterSpacing: "0.03em",
};

const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "#f72585" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "8px", padding: "0.75rem 1rem", color: "#f0f0f0",
    fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
});

const checkboxRow: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", userSelect: "none",
};

const checkboxBox = (checked: boolean): React.CSSProperties => ({
    width: "20px", height: "20px", borderRadius: "5px",
    border: `2px solid ${checked ? "#06b6d4" : "rgba(255,255,255,0.2)"}`,
    background: checked ? "#06b6d4" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: "border-color 0.2s, background 0.2s",
});

const divider: React.CSSProperties = { borderBottom: "1px solid rgba(255,255,255,0.07)" };

const payLabel: React.CSSProperties = {
    color: "#aaa", fontSize: "0.78rem", fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600,
};

const payButton: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
    padding: "0.85rem 1.5rem", background: "var(--neon-pink)", color: "#fff",
    textDecoration: "none", borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700, fontSize: "1rem", letterSpacing: "0.04em",
    transition: "opacity 0.2s, box-shadow 0.2s",
    boxShadow: "0 0 14px rgba(247,37,133,0.35)", cursor: "pointer",
};

const payHint: React.CSSProperties = { color: "#555", fontSize: "0.75rem", textAlign: "center" };

const uploadZone = (hasError: boolean): React.CSSProperties => ({
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: "0.6rem", padding: "2rem",
    border: `2px dashed ${hasError ? "#f72585" : "rgba(255,255,255,0.12)"}`,
    borderRadius: "12px", background: hasError ? "rgba(247,37,133,0.04)" : "rgba(255,255,255,0.02)",
    cursor: "pointer", transition: "border-color 0.2s, background 0.2s",
});

const previewWrap: React.CSSProperties = {
    position: "relative", display: "flex", flexDirection: "column", alignItems: "center",
    gap: "0.4rem", padding: "0.75rem", border: "1px solid rgba(6,182,212,0.35)",
    borderRadius: "12px", background: "rgba(6,182,212,0.05)",
};

const previewImg: React.CSSProperties = {
    maxWidth: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px",
};

const removeBtn: React.CSSProperties = {
    position: "absolute", top: "8px", right: "8px",
    background: "rgba(247,37,133,0.85)", border: "none", borderRadius: "50%",
    width: "24px", height: "24px", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", color: "#fff",
};

const submitBtn: React.CSSProperties = {
    padding: "0.95rem", background: "linear-gradient(135deg, #f72585 0%, #b5179e 100%)",
    color: "#fff", border: "none", borderRadius: "10px",
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem",
    letterSpacing: "0.06em", transition: "box-shadow 0.2s",
    boxShadow: "0 0 16px rgba(247,37,133,0.3)",
};

const successCard: React.CSSProperties = {
    background: "rgba(17,17,17,0.9)", border: "1px solid rgba(6,182,212,0.25)",
    borderRadius: "16px", padding: "3.5rem 2rem", display: "flex", flexDirection: "column",
    alignItems: "center", gap: "1.25rem", textAlign: "center", backdropFilter: "blur(12px)",
};

const successIconRing: React.CSSProperties = {
    width: "80px", height: "80px", borderRadius: "50%",
    border: "2px solid rgba(6,182,212,0.4)", background: "rgba(6,182,212,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
};

const successTitle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f0f0f0",
};

export default RegistrationForm;
