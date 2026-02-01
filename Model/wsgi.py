from app import app as app1  # This imports the symptom-checker app
from summarizer_service import app as app2  # This imports the summarizer-service app

if __name__ == "__main__":
    app.run()
