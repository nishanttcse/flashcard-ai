# 🚀 Flashcard AI – Smart Learning System

An AI-powered full-stack web application that converts PDF content into interactive flashcards for efficient learning and revision.

---

## 🌟 Live Demo

🔗 Frontend: https://flashcard-a13d4fske-nishants-projects-ee733107.vercel.app/  
🔗 Backend: https://flashcard-ai-0mo1.onrender.com/

---

## 🎯 Problem Statement

Students often struggle to revise large volumes of content efficiently.  
Traditional reading is passive and ineffective.

This project solves that by converting study material into **active recall flashcards**.

---

## 💡 Solution

Flashcard AI allows users to:

- 📄 Upload any PDF  
- 🤖 Automatically generate flashcards  
- 🔄 Interact with cards (flip, review)  
- 📊 Track learning progress  
- 🧠 Simplify complex answers  

---

## ✨ Features

- 📤 PDF Upload & Text Extraction (pdfplumber)
- 🧠 AI-based Flashcard Generation
- 🔁 Smart Fallback System (works even without AI)
- 🎴 3D Flip Card UI (interactive learning)
- 📊 Difficulty Tracking (Easy / Medium / Hard)
- ⚡ Explain Simply Feature
- 🌐 Fully Deployed (Frontend + Backend)

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- CSS (Glassmorphism UI)
- Axios

### Backend
- FastAPI
- pdfplumber
- python-dotenv
- google-genai

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🧠 System Design

1. User uploads PDF  
2. Backend extracts text  
3. AI generates flashcards  
4. If AI fails → fallback system activates  
5. Frontend displays interactive cards  

---

## ⚖️ Trade-offs

- Free-tier AI APIs may fail or limit usage  
- Implemented fallback to ensure reliability  

---

## 🚀 Future Improvements

- Spaced Repetition Algorithm  
- User Authentication  
- Save & Manage Flashcard Decks  
- Mobile Optimization  
- Better AI explanation engine  

---

## 🎥 Demo Video

👉 [Add your video link here]

---

## 📂 GitHub Repository

👉 https://github.com/YOUR_USERNAME/flashcard-ai

---

## ⚠️ Note

This project is designed with **graceful degradation**, ensuring it works even when AI services are unavailable.

---

## 👨‍💻 Author

Nishant Srivastava  
B.Tech Student | Full Stack Developer  

---

## 📜 License

This project is for educational and evaluation purposes.