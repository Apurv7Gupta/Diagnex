import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, BarChart3, Upload, X, File } from "lucide-react";

const FeatureSection = () => {
  const [symptomInput, setSymptomInput] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [precautions, setPrecautions] = useState<string[] | null>(null);
  const [medications, setMedications] = useState<string[] | null>(null);
  const [diet, setDiet] = useState<string[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [workout, setWorkout] = useState<string[] | null>(null);

  const [reportInput, setReportInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleSymptomSubmit = async () => {
    if (!symptomInput.trim()) return;

    try {
      const response = await fetch("http://localhost:3001/api/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptomInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();

      if (data.corrected_symptoms) {
        setPrediction(data.predicted_disease || "Unknown");
        setPrecautions(data.precautions || []);
        setMedications(data.medications || []);
        setDiet(data.diet || []);
        setDescription(data.description || "");
        setWorkout(data.workout || []);
      } else {
        setPrediction("Input symptoms not recognized.");
        setPrecautions(null);
        setMedications(null);
        setDiet(null);
        setDescription(null);
        setWorkout(null);
      }
    } catch (err) {
      console.error("Symptom analysis failed:", err);
      setPrediction("Error analyzing symptoms.");
      setPrecautions(null);
      setMedications(null);
      setDiet(null);
      setDescription(null);
      setWorkout(null);
    }
  };

  const handleReportSubmit = async () => {
    if (!reportInput.trim()) return;

    try {
      const response = await fetch("http://localhost:3001/api/analyze-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportContent: reportInput }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      alert(data.summary);
    } catch (err) {
      console.error("Text report analysis failed:", err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target?.result as string);

    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("text/")) {
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      setFilePreview("pdf");
    } else {
      setFilePreview("file");
    }
  };

  const analyzeUploadedFile = async () => {
    if (!uploadedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch("http://localhost:3001/api/analyze-report", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      alert(data.summary);
    } catch (err) {
      console.error("File report analysis failed:", err);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
  };

  return (
    <div
      id="features"
      className="py-12 sm:py-16 lg:py-20 transition-colors duration-300"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Symptom Checker */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex flex-col items-start mb-6">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Symptom Checker
            </h2>
            <div
              className="w-11 h-1 mt-2"
              style={{ backgroundColor: "#fd2a36" }}
            ></div>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 lg:p-16 min-h-[300px] flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <div className="text-center max-w-2xl">
              <Search
                className="mx-auto mb-4 sm:mb-6"
                size={48}
                style={{ color: "var(--color-text)" }}
              />
              <h3
                className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6"
                style={{ color: "var(--color-text)" }}
              >
                Describe what you're feeling — get instant possible causes &
                suggestions.
              </h3>
              <div className="space-y-4">
                <textarea
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="E.g.: swelling, stomach pain, fever, acidity"
                  className="w-full p-4 border rounded-lg resize-none h-32 text-base"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text-secondary)",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSymptomSubmit}
                  className="px-6 py-3 rounded-lg text-base"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Analyze Symptoms
                </motion.button>

                {prediction && (
                  <div
                    className="mt-4 p-4 rounded-lg text-left text-base"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text)",
                    }}
                  >
                    <strong>Possible Diagnosis:</strong> {prediction}
                    <br />
                    <br />
                    {description && (
                      <>
                        <strong>Description:</strong> {description}
                        <br />
                        <br />
                      </>
                    )}
                    {precautions && (
                      <>
                        <strong>Precautions:</strong> {precautions.join(", ")}
                        <br />
                        <br />
                      </>
                    )}
                    {medications && (
                      <>
                        <strong>Medications:</strong> {medications.join(", ")}
                        <br />
                        <br />
                      </>
                    )}
                    {diet && (
                      <>
                        <strong>Recommended Diet:</strong> {diet.join(", ")}
                        <br />
                        <br />
                      </>
                    )}
                    {workout && (
                      <>
                        <strong>Recommended Workout:</strong>{" "}
                        {workout.join(", ")}
                        <br />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Report Analyzer */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex flex-col items-start mb-6">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Report Analyzer
            </h2>
            <div
              className="w-11 h-1 mt-2"
              style={{ backgroundColor: "#fd2a36" }}
            ></div>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 lg:p-16 min-h-[300px] flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <div className="text-center max-w-2xl w-full">
              {!uploadedFile ? (
                <>
                  <FileText
                    id="analyze"
                    className="mx-auto mb-4 sm:mb-6"
                    size={48}
                    style={{ color: "var(--color-text)" }}
                  />
                  <h3
                    className="text-xl sm:text-2xl font-semibold mb-6"
                    style={{ color: "var(--color-text)" }}
                  >
                    Paste or upload your health report to see summaries &
                    possible diagnoses.
                  </h3>
                  <div className="space-y-4">
                    <textarea
                      value={reportInput}
                      onChange={(e) => setReportInput(e.target.value)}
                      placeholder="Paste your health report content here..."
                      className="w-full p-4 border rounded-lg resize-none h-32 text-base"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-background)",
                        color: "var(--color-text-secondary)",
                      }}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReportSubmit}
                        className="px-6 py-3 rounded-lg text-base"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        Analyze Report
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-base"
                        style={{
                          backgroundColor: "var(--color-border)",
                          color: "black",
                        }}
                      >
                        <Upload size={16} />
                        <span>Upload Report</span>
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Uploaded File Preview
                  </h3>

                  <div className="relative bg-white dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600 p-6 max-w-md mx-auto">
                    <button
                      onClick={removeUploadedFile}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                    <div className="text-center">
                      {filePreview?.startsWith("data:image") ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="max-w-full max-h-48 mx-auto rounded"
                        />
                      ) : filePreview === "pdf" ? (
                        <FileText className="text-red-500 mb-2" size={40} />
                      ) : filePreview !== "file" ? (
                        <div className="bg-gray-100 p-4 rounded text-left max-h-32 overflow-y-auto">
                          <pre className="text-sm whitespace-pre-wrap text-gray-800">
                            {filePreview}
                          </pre>
                        </div>
                      ) : (
                        <File className="text-gray-500 mb-2" size={40} />
                      )}

                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-800">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={analyzeUploadedFile}
                      className="px-6 py-3 rounded-lg"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Analyze This File
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                      className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg"
                      style={{
                        backgroundColor: "var(--color-border)",
                        color: "black",
                      }}
                    >
                      <Upload size={16} />
                      <span>Upload Different File</span>
                    </motion.button>
                  </div>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
                className="hidden"
              />
            </div>
          </div>
        </motion.section>

        {/* Summary Section */}
        <motion.section
          id="summary"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-start mb-6">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Summary
            </h2>
            <div
              className="w-11 h-1 mt-2"
              style={{ backgroundColor: "#fd2a36" }}
            ></div>
          </div>
          <div
            className="rounded-2xl p-6 sm:p-8 lg:p-16 min-h-[300px] flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <div className="text-center">
              <BarChart3
                className="mx-auto mb-6"
                size={48}
                style={{ color: "var(--color-text)" }}
              />
              <h3
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                Your health result summarized
              </h3>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FeatureSection;
