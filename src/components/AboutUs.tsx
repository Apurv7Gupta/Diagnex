import { motion } from "framer-motion";
import {
  Users,
  LoaderPinwheel,
  Shield,
  Award,
  GitPullRequestArrow,
  AppWindow,
  FlaskConical,
  GitFork,
} from "lucide-react";
import BlurText from "./ReactBits/BlurText";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Khushraj Rai",
      role: "24BHI10012",
      icon: GitPullRequestArrow,
      description: "Backend Integration",
    },
    {
      name: "Apurv Gupta",
      role: "24BHI10011",
      icon: AppWindow,
      description: "Frontend design and code with Backend Integration",
    },
    {
      name: "Rudra Pattnik",
      role: "24BHI",
      icon: GitFork,
      description: "Backend integration",
    },
    {
      name: "Rohit Jadhav",
      role: "24BHI",
      icon: LoaderPinwheel,
      description: "AI Model Training",
    },
    {
      name: "Khushi Raisinghani",
      role: "24BHI",
      icon: FlaskConical,
      description: "Model implementation with Flask",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your health data is encrypted and never shared without consent",
    },
    {
      icon: Award,
      title: "Medical Accuracy",
      description: "AI models trained on peer-reviewed medical literature",
    },
    {
      icon: Users,
      title: "Accessible Care",
      description: "Making health insights available to everyone, everywhere",
    },
  ];

  return (
    <section
      id="about"
      className="py-12 sm:py-16 lg:py-20 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div style={{ color: "var(--color-text)" }}>
            <BlurText
              text="About Diagnex"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 transition-colors duration-300"
            />
          </div>
          <p
            className="text-center text-lg sm:text-xl max-w-3xl mx-auto transition-colors duration-300"
            style={{ color: "var(--color-text)" }}
          >
            A generative AI based website that provides insights and solutions
            for users' medical reports and queries. With a sleek, modern
            frontend, a smartly integrated backend, and extensively trained AI
            models, Diagnex delivers a top-tier functional system design.
          </p>
        </motion.div>

        {/* Our Mission*/}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 mb-12 sm:mb-16 transition-colors duration-300"
        >
          <div style={{ color: "var(--color-text)" }}>
            <BlurText
              text="Our Mission"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 transition-colors duration-300"
            />
          </div>
          <p
            className="text-center text-lg sm:text-xl max-w-3xl mx-auto transition-colors duration-300"
            style={{ color: "var(--color-text)" }}
          >
            To democratize healthcare by providing instant, AI-powered health
            insights that help people understand their symptoms, interpret
            medical reports, and make informed decisions about their health
            journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div style={{ color: "var(--color-text)" }}>
            <BlurText
              text="Our Values"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 transition-colors duration-300"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 rounded-xl transition-colors duration-300"
                style={{ backgroundColor: "var(--color-background)" }}
              >
                <div className="inline-flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-300">
                  <value.icon
                    className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300"
                    style={{ color: "var(--color-text)" }}
                  />
                </div>
                <h4
                  className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 transition-colors duration-300"
                  style={{ color: "var(--color-text)" }}
                >
                  {value.title}
                </h4>
                <p
                  className="text-sm sm:text-base transition-colors duration-300"
                  style={{ color: "var(--color-text)" }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{ color: "var(--color-text)" }}>
            <BlurText
              text="Meet Our Team"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 transition-colors duration-300"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "var(--color-background)" }}
              >
                <div className="inline-flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-300">
                  <member.icon
                    className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300"
                    style={{ color: "var(--color-text)" }}
                  />
                </div>
                <h4
                  className="text-lg sm:text-xl font-semibold mb-2 transition-colors duration-300"
                  style={{ color: "var(--color-text)" }}
                >
                  {member.name}
                </h4>
                <p
                  className="text-sm sm:text-base font-medium mb-2 sm:mb-3 transition-colors duration-300"
                  style={{ color: "var(--color-text)" }}
                >
                  {member.role}
                </p>
                <p
                  className="text-xs sm:text-sm transition-colors duration-300"
                  style={{ color: "var(--color-text)" }}
                >
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 p-6 sm:p-8"
          style={{
            color: "var(--color-text)",
          }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Ready to Take Control of Your Health?
          </h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
            Join thousands of users who trust Diagnex for their health insights
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-base"
            style={{
              color: "var(--color-accent)",
              backgroundColor: "var(--color-text)",
            }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
