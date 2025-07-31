import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          color: "var(--color-text-secondary)",
          background: "var(--color-text-background)",
        }}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Select theme"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      {/* Dropdown content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 p-2 shadow-2xl bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl w-56 border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto z-50"
          >
            <div className="space-y-1">
              {THEMES.map((themeOption) => (
                <motion.button
                  key={themeOption.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                    theme === themeOption.name
                      ? "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                  }}
                >
                  <Palette className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">
                    {themeOption.name}
                  </span>
                  {/* Theme preview colors */}
                  <div className="ml-auto flex gap-1">
                    {themeOption.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
