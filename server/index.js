const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;

// Using multer with RAM storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// API status check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Dummy chatbot route
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  const responses = {
    hello: "Hello! I'm your health assistant. How can I help you today?",
    symptoms:
      "I can help you understand your symptoms. Please describe what you're experiencing.",
    report:
      "I can analyze your health reports. Would you like to upload a report or paste the content?",
    help: "I can assist with symptom checking, report analysis, and general health questions. What would you like to know?",
    default:
      "I understand you're asking about health-related topics. Could you please be more specific so I can provide better assistance?",
  };

  const lowerMessage = message.toLowerCase();
  let response = responses.default;

  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      response = value;
      break;
    }
  }

  res.json({
    response,
    timestamp: new Date().toISOString(),
  });
});

// Symptom checker
app.post("/api/symptoms", async (req, res) => {
  const { symptoms } = req.body;

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Flask returned error:", errorText);
      return res.status(500).json({ error: "Flask error", detail: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error talking to Flask:", err);
    res.status(500).json({ error: "ML service error" });
  }
});

// Analyze report (file or pasted content)
app.post("/api/analyze-report", upload.single("file"), (req, res) => {
  const { reportContent } = req.body;
  const uploadedFile = req.file;

  if (uploadedFile) {
    // File content is in uploadedFile.buffer
    res.json({
      summary: `Analyzed "${uploadedFile.originalname}" in-memory. No disk usage.`,
      recommendations: [
        "Memory-based processing complete",
        "No file saved on disk",
        "You're good to go",
      ],
    });
  } else if (reportContent) {
    res.json({
      summary: "Pasted text report analyzed successfully.",
      recommendations: [
        "Parsed from raw text",
        "Stateless processing complete",
        "No storage involved",
      ],
    });
  } else {
    res.status(400).json({ error: "No file or report content provided." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
