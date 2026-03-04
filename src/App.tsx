import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilmsSection from "./components/FilmsSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)" }}>
      <Navbar />
      <main>
        <HeroSection />
        <FilmsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
