from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL = "Falconsai/medical_summarization"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL)

app = Flask(__name__)

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    # flattening report by removing repeated newlines or headings
    clean_text = " ".join(line.strip() for line in text.splitlines() if line.strip())

    inputs = tokenizer(clean_text, return_tensors="pt", truncation=True, max_length=1024)
    summary_ids = model.generate(
        **inputs,
        max_new_tokens=150,       # limiting output tokens
        num_beams=4,              # beam search
        no_repeat_ngram_size=3,   # to avoid repeated phrases
        do_sample=False
    )
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(port=7000)
