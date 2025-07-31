import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="text-white py-8 sm:py-12 transition-colors duration-300"
      style={{ background: "var(--color-constant)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3
              className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-300"
              style={{ color: "var(--color-constant-secondary)" }}
            >
              Members
            </h3>
            <ul
              className="space-y-1 sm:space-y-2 text-sm sm:text-base transition-colors duration-300"
              style={{ color: "var(--color-constant-secondary)" }}
            >
              <li>Apurv Gupta</li>
              <li>Khushraj Rai</li>
              <li>Rudra Pattnik</li>
              <li>Rohit Jadhav</li>
              <li>Khushi Raisinghani</li>
            </ul>
          </div>

          <div>
            <h3
              className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-300"
              style={{ color: "var(--color-constant-secondary)" }}
            >
              Tech Stack
            </h3>
            <ul
              className="space-y-1 sm:space-y-2 text-sm sm:text-base transition-colors duration-300"
              style={{ color: "var(--color-constant-secondary)" }}
            >
              <li>React: 19.1.0</li>
              <li>React DOM: 19.1.0</li>
              <li>Vite: 7.0.4</li>
              <li>TypeScript: ~5.8.3</li>
              <li>Tailwind CSS: 4.1.11</li>
              <li>Express: 5.1.0</li>
              <li>Zustand: 5.0.6</li>
              <li>Framer Motion: 12.23.6</li>
              <li>Lucide React: 0.525.0</li>
              <li>Multer: 2.0.2</li>
              <li>CORS: 2.8.5</li>
            </ul>
          </div>

          <div>
            <h3
              className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-300"
              style={{ color: "var(--color-constant-secondary)" }}
            >
              Contact Us
            </h3>
            <div className="flex space-x-3 sm:space-x-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-black transition-colors duration-300"
                style={{ color: "var(--color-constant-secondary)" }}
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-300"
                style={{ color: "var(--color-constant-secondary)" }}
              >
                <Twitter size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-300"
                style={{ color: "var(--color-constant-secondary)" }}
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors duration-300"
                style={{ color: "var(--color-constant-secondary)" }}
              >
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 text-center transition-colors duration-300">
          <p
            className="text-xs sm:text-sm flex items-center justify-center transition-colors duration-300"
            style={{ color: "var(--color-constant-secondary)" }}
          >
            <span className="mr-2">⚠️</span>
            Not a substitute for medical advice. Always consult a professional.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
