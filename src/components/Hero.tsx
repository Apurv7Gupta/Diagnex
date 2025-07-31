import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Upload } from "lucide-react";
import BlurText from "./ReactBits/BlurText";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://images.pexels.com/photos/7722680/pexels-photo-7722680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3952241/pexels-photo-3952241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7580292/pexels-photo-7580292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 brightness-60">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-opacity-50 dark:bg-opacity-70 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ color: "black" }}
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <BlurText
            text="Your health questions,"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: "var(--color-constant-secondary)" }}
          />
          <BlurText
            text="answered."
            delay={300}
            animateBy="letters"
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: "var(--color-constant)" }}
          />
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 transition-colors duration-300"
          style={{ color: "var(--color-constant-secondary)" }}
        >
          Instantly analyze symptoms, summarize health reports, and get
          AI-generated remedies — all in one secure platform.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-300 w-full sm:w-auto"
            style={{ backgroundColor: "var(--color-border)" }}
          >
            <Play size={20} />
            <span>Try It Now</span>
          </motion.button>

          <motion.button
            onClick={() => {
              document.getElementById("file-upload")?.click();
              document
                .getElementById("analyze")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 rounded-lg font-semibold hover:text-gray-800 transition-colors duration-300 w-full sm:w-auto"
            style={{
              color: "var(--color-constant-secondary)",
              borderColor: "var(--color-constant)",
            }}
          >
            <Upload size={20} />
            <span>Upload Report</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
