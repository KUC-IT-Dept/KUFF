import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilmsSection from "./components/FilmsSection";
import AboutSection from "./components/AboutSection";
import RegistrationForm from "./components/RegistrationForm";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";

/* Hidden /admin route — not linked anywhere in the UI */
const isAdminRoute = window.location.pathname === "/admin";

function App() {
  if (isAdminRoute) return <AdminPage />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)" }}>
      <Navbar />
      <main>
        <HeroSection />
        <FilmsSection />
        <AboutSection />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

