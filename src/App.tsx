import { useThemeStore } from "./store/useThemeStore";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  const { initializeTheme } = useThemeStore();
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  const [about, setabout] = useState<string | null>(null);

  return (
    <>
      <div
        className="min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
        }}
      >
        <Navbar setabout={setabout} />
        <Hero />
        <FeatureSection />
        {about === "aboutus" && <AboutUs />}

        <Footer />
        {/* <ChatBot /> */}
      </div>
    </>
  );
}

export default App;
