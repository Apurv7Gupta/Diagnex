import { motion, AnimatePresence } from "framer-motion";
import ThemeSelector from "./ThemeSelector";
import AuthBtns from "./AuthBtns";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { getConfig } from "./config.ts";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

type NavbarProps = {
  setabout: (component: string) => void;
};

const Navbar = ({ setabout }: NavbarProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [history, setHistory] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = createBrowserHistory();
    setHistory(h);
  }, []);

  // Close mobile menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (!history) return null;

  const onRedirectCallback = (appState: any) => {
    history.push(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  const config = getConfig();

  const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    onRedirectCallback,
    authorizationParams: {
      redirect_uri: window.location.origin,
      ...(config.audience ? { audience: config.audience } : {}),
    },
    cacheLocation: "localstorage" as const,
    useRefreshTokens: true,
  };

  return (
    <Auth0Provider {...providerConfig}>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300"
        style={{
          backgroundColor: "var(--color-light)",
          color: "var(--color-text)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="lg:text-5xl sm:text-5xl font-bold"
              style={{ color: "black" }}
            >
              <div className="rounded-sm lg:pb-1.5">
                <span style={{ color: "var(--color-text)" }}>D</span>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  iagne
                </span>
                <span style={{ color: "var(--color-text)" }}>X</span>
              </div>
            </motion.div>

            {/* Hamburger (Small screens only) */}
            <div className="md:hidden flex gap-5">
              <ThemeSelector />
              <button onClick={() => setMenuOpen(true)} className="text-black">
                <Menu size={28} />
              </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => scrollToSection("home")}
                className="transition-colors cursor-pointer text-sm lg:text-base"
                style={{ color: "black" }}
              >
                Home
              </motion.a>
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => scrollToSection("features")}
                className="transition-colors cursor-pointer text-sm lg:text-base"
                style={{ color: "black" }}
              >
                Features
              </motion.a>
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => scrollToSection("summary")}
                className="transition-colors cursor-pointer text-sm lg:text-base"
                style={{ color: "black" }}
              >
                Summary
              </motion.a>
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => {
                  setabout("aboutus");
                  scrollToSection("about");
                }}
                className="transition-colors cursor-pointer text-sm lg:text-base"
                style={{ color: "black" }}
              >
                About Us
              </motion.a>
              <ThemeSelector />
              <AuthBtns />
            </nav>
          </div>
        </div>

        {/* Mobile Menu (Slide In Right) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-1/2 bg-white z-40 shadow-lg p-6 flex flex-col gap-4 md:hidden"
              style={{ backgroundColor: "var(--color-light)", color: "black" }}
              ref={menuRef}
            >
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => {
                  scrollToSection("home");
                  setMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                Home
              </motion.a>
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => {
                  scrollToSection("features");
                  setMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                Features
              </motion.a>
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => {
                  scrollToSection("summary");
                  setMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                Summary
              </motion.a>
              <motion.a
                whileHover={{ color: "var(--color-primary)" }}
                onClick={() => {
                  setabout("aboutus");
                  scrollToSection("about");
                  setMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                About Us
              </motion.a>

              <div className="flex items-center gap-4 mt-4">
                <AuthBtns />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </Auth0Provider>
  );
};

export default Navbar;
