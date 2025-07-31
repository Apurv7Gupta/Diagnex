import { motion } from "framer-motion";
import ThemeSelector from "./ThemeSelector";
import AuthBtns from "./AuthBtns";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { getConfig } from "./config.ts";
import { useState, useEffect } from "react";

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

  // Auth0 setup
  const [history, setHistory] = useState<any>(null);
  useEffect(() => {
    const h = createBrowserHistory();
    setHistory(h);
  }, []);

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="lg:text-5xl sm:text-2xl font-bold"
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

            {/* Navigation */}
            <nav className="flex flex-wrap items-center justify-end gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
              </div>

              {/* Theme + Auth */}
              <div className="flex items-center gap-3 sm:gap-4">
                <ThemeSelector />
                <AuthBtns />
              </div>
            </nav>
          </div>
        </div>
      </motion.header>
    </Auth0Provider>
  );
};

export default Navbar;
