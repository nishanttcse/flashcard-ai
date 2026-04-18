from fastapi import FastAPI, UploadFile, File
import pdfplumber
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from google import genai
import json

load_dotenv()

# Gemini client (will try first)
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# PDF TEXT EXTRACTION
# ---------------------------
def extract_text(file):
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text


# ---------------------------
# AI FLASHCARDS (TRY)
# ---------------------------
def generate_flashcards_ai(text):
    prompt = f"""
You are an AI that ONLY returns valid JSON.

Convert this text into flashcards.

Return ONLY JSON.
No explanation.
No markdown.

Format:
[
  {{"question": "...", "answer": "..."}}
]

Text:
{text}
"""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    return response.text


# ---------------------------
# FALLBACK FLASHCARDS (NO AI)
# ---------------------------
def generate_flashcards_fallback(text):
    sentences = text.split(".")
    cards = []

    for sentence in sentences[:12]:
        sentence = sentence.strip()

        if len(sentence) > 20:
            # create smarter question
            words = sentence.split(" ")
            keyword = " ".join(words[:3])

            cards.append({
                "question": f"What is meant by '{keyword}...'?",
                "answer": sentence
            })

    return cards

# ---------------------------
# SAFE JSON PARSER
# ---------------------------
def safe_parse(ai_text):
    try:
        # remove markdown if present
        cleaned = ai_text.replace("```json", "").replace("```", "").strip()

        # extract JSON array
        start = cleaned.find("[")
        end = cleaned.rfind("]") + 1

        if start != -1 and end != -1:
            return json.loads(cleaned[start:end])

    except:
        return None

    return None


# ---------------------------
# API ROUTE
# ---------------------------
@app.post("/generate")
async def generate(file: UploadFile = File(...)):
    try:
        text = extract_text(file)

        if not text.strip():
            return {"error": "No text extracted from PDF"}

        # 🔥 TRY AI FIRST
        try:
            ai_response = generate_flashcards_ai(text[:3000])
            parsed = safe_parse(ai_response)

            if parsed:
                return {"flashcards": parsed, "mode": "ai"}

        except Exception as e:
            print("AI FAILED:", str(e))

        # 🔥 FALLBACK (ALWAYS WORKS)
        fallback_cards = generate_flashcards_fallback(text)
        return {"flashcards": fallback_cards, "mode": "fallback"}

    except Exception as e:
        return {"error": str(e)}