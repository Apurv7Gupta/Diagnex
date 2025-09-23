require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_KEY = process.env.GEMINI_KEY;

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

// Generating summary route (T5 Small)
app.post("/api/generate-summary", async (req, res) => {
  const { symptomOutput, reportOutput } = req.body;

  if (!symptomOutput && !reportOutput) {
    return res.status(400).json({
      summary: "No symptom or report data available to generate summary.",
    });
  }

  const inputText = `
Using outputs:
${symptomOutput ? `Symptoms: ${symptomOutput}` : ""}
${reportOutput ? `Report: ${reportOutput}` : ""}

Generate a concise, human-readable, easily understandable summary for a patient.
`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: inputText }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText);
      return res.status(500).json({ error: "HF API error", detail: errorText });
    }

    const data = await response.json();
    const summary = data?.[0]?.generated_text || "No summary returned";

    res.json({ summary });
  } catch (err) {
    console.error("Error generating summary:", err);
    res.status(500).json({ summary: "Error generating summary" });
  }
});

// Symptom checker (Flask service on port 5000)
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

// Analyze report (file or pasted content using Gemini)
app.post("/api/analyze-report", upload.single("file"), async (req, res) => {
  const { reportContent } = req.body;
  const uploadedFile = req.file;
  let text = "";

  let requestParts = [];

  if (uploadedFile) {
    // send raw file as base64 inlineData
    requestParts.push({
      inlineData: {
        mimeType: uploadedFile.mimetype,
        data: uploadedFile.buffer.toString("base64"),
      },
    });
  } else if (reportContent) {
    requestParts.push({ text: reportContent });
  } else {
    return res
      .status(400)
      .json({ error: "No file or report content provided." });
  }

  try {
    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "You are a medical assistant. Read this health report and explain in simple human language.",
                },
                ...requestParts,
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", errorText);
      return res
        .status(500)
        .json({ error: "Gemini API error", detail: errorText });
    }

    const data = await geminiResponse.json();
    const summary =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Gemini returned no summary.";

    res.json({
      summary,
      recommendations: [
        "Report processed by Gemini LLM",
        "Human-readable summary generated",
      ],
    });
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    res.status(500).json({ error: "Gemini API call failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
