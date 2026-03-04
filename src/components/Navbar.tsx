import React, { useState, useEffect } from "react";
import { Menu, X, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { label: "Home", href: "#hero" },
    { label: "Films", href: "#films" },
    { label: "About", href: "#about" },
];

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
                    background: scrolled
                        ? "rgba(5,5,5,0.88)"
                        : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                    backdropFilter: scrolled ? "blur(18px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                }}
            >
                <nav
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0 1.5rem",
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, "#hero")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Film size={20} color="#f72585" />
                        <span
                            style={{
                                fontFamily: "Space Grotesk, sans-serif",
                                fontWeight: 700,
                                fontSize: "1.25rem",
                                letterSpacing: "0.1em",
                                color: "#f0f0f0",
                            }}
                        >
                            KUFF
                        </span>
                        <span
                            style={{
                                fontSize: "0.6rem",
                                fontFamily: "Space Grotesk, sans-serif",
                                color: "#fbbf24",
                                fontWeight: 600,
                                letterSpacing: "0.12em",
                                marginLeft: "2px",
                                padding: "2px 6px",
                                border: "1px solid rgba(251,191,36,0.4)",
                                borderRadius: "3px",
                            }}
                        >
                            2026
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <ul
                        style={{
                            display: "flex",
                            listStyle: "none",
                            gap: "2rem",
                            margin: 0,
                            padding: 0,
                        }}
                        className="desktop-nav"
                    >
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    style={{
                                        textDecoration: "none",
                                        color: "#aaa",
                                        fontFamily: "Space Grotesk, sans-serif",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.05em",
                                        transition: "color 0.2s",
                                        position: "relative",
                                    }}
                                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#f0f0f0"; }}
                                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#aaa"; }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA + Hamburger */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <a
                            href="#hero"
                            onClick={(e) => handleNavClick(e, "#hero")}
                            style={{
                                display: "none",
                                padding: "0.4rem 1rem",
                                background: "var(--neon-pink)",
                                color: "#fff",
                                textDecoration: "none",
                                fontFamily: "Space Grotesk, sans-serif",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                letterSpacing: "0.08em",
                                borderRadius: "4px",
                                transition: "opacity 0.2s, box-shadow 0.2s",
                            }}
                            className="nav-register-btn"
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.opacity = "0.85";
                                (e.target as HTMLElement).style.boxShadow = "0 0 16px rgba(247,37,133,0.6)";
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.opacity = "1";
                                (e.target as HTMLElement).style.boxShadow = "none";
                            }}
                        >
                            Register
                        </a>
                        <button
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setMenuOpen((v) => !v)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#f0f0f0",
                                padding: "4px",
                                display: "none",
                            }}
                            className="hamburger-btn"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: "fixed",
                            top: "64px",
                            left: 0,
                            right: 0,
                            zIndex: 99,
                            background: "rgba(5,5,5,0.97)",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            backdropFilter: "blur(20px)",
                            padding: "1.5rem",
                        }}
                    >
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        style={{
                                            textDecoration: "none",
                                            color: "#f0f0f0",
                                            fontFamily: "Space Grotesk, sans-serif",
                                            fontSize: "1.25rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-register-btn { display: block !important; }
        }
      `}</style>
        </>
    );
};

export default Navbar;
