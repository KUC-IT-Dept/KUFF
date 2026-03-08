import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, AlertTriangle, Download } from "lucide-react";
import PostersSlider from "./PostersSlider";

import brochurePdf from "../assets/𝗞𝗨𝗙𝗙 𝟮𝟬𝟮𝟲_𝗞𝗔𝗡𝗡𝗨𝗥 𝗨𝗡𝗜𝗩𝗘𝗥𝗦𝗜𝗧𝗬 𝗙𝗜𝗟𝗠 𝗙𝗘𝗦𝗧𝗜𝗩𝗔𝗟_𝗠𝗔𝗥𝗖𝗛 𝟭𝟭-𝟭𝟮.pdf";

const REGISTER_URL = "https://tiqr.events/e/Kannur-University-Film-Festival-1855/t/2730/";

const RegistrationForm: React.FC = () => {
    return (
        <section id="register" style={sectionWrap}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                style={{ textAlign: "center" }}
            >
                <p style={eyebrow}>KUFF 2026</p>
                <h2 style={sectionTitle}>Register Now</h2>
                <p style={subtitle}>Secure your spot at Kerala's premier student film festival.</p>

                <div style={{ width: "100%", marginBottom: "1.75rem" }}>
                    <PostersSlider />
                </div>

                <a
                    href={brochurePdf}
                    download
                    style={brochureLink}
                    aria-label="Download KUFF brochure (PDF)"
                >
                    <Download size={18} />
                    Download Brochure
                </a>

                <div style={warningBanner}>
                    <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                        <span style={warningBold}>NO FOOD will be provided.</span>
                        <span style={{ color: "#ccc", fontSize: "0.85rem" }}>
                            {" "}Please make your own meal arrangements.
                        </span>
                    </div>
                </div>


                <motion.a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={registerBtn}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(247,37,133,0.7)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ExternalLink size={18} />
                    Register Now
                </motion.a>
            </motion.div>
        </section>
    );
};

/* ── Styles ── */

const sectionWrap: React.CSSProperties = {
    padding: "7rem 1.5rem",
    maxWidth: "680px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const eyebrow: React.CSSProperties = {
    fontSize: "0.7rem",
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "0.25em",
    color: "#f72585",
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: "0.5rem",
};

const sectionTitle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(2rem, 5vw, 2.8rem)",
    fontWeight: 700,
    color: "#f0f0f0",
    lineHeight: 1.1,
    marginBottom: "0.75rem",
};

const warningBanner: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    background: "rgba(251,191,36,0.08)",
    border: "1px solid rgba(251,191,36,0.35)",
    borderRadius: "10px",
    padding: "0.85rem 1rem",
    marginBottom: "1.5rem",
    textAlign: "left",
};

const warningBold: React.CSSProperties = {
    color: "#fbbf24",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "0.9rem",
    letterSpacing: "0.02em",
};

const subtitle: React.CSSProperties = {
    color: "#888",
    fontSize: "0.95rem",
    marginBottom: "2.5rem",
};

const registerBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.95rem 2.5rem",
    background: "linear-gradient(135deg, #f72585 0%, #b5179e 100%)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "12px",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "1.05rem",
    letterSpacing: "0.05em",
    boxShadow: "0 0 20px rgba(247,37,133,0.4)",
    transition: "box-shadow 0.2s",
    cursor: "pointer",
};

const brochureLink: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.15rem",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#f0f0f0",
    textDecoration: "none",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.02em",
    marginBottom: "1.5rem",
    cursor: "pointer",
};

export default RegistrationForm;
