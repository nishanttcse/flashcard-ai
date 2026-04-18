import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("https://flashcard-ai-0mo1.onrender.com/generate", formData);

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      const enhanced = res.data.flashcards.map((card) => ({
        ...card,
        difficulty: "new",
      }));

      setCards(enhanced);
      setIndex(0);
      setFlipped(false);
      setMode(res.data.mode);

    } catch (err) {
      console.error(err);
      alert("Error generating flashcards");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const markDifficulty = (level) => {
    const updated = [...cards];

    if (level === "easy") {
      updated.push(updated[index]);
    } else if (level === "hard") {
      updated.splice(index + 1, 0, updated[index]);
    }

    updated[index].difficulty = level;
    setCards(updated);
    handleNext();
  };

  const explainCard = () => {
    const text = cards[index]?.answer;
    if (!text) return;

    const simple =
      text.split(" ").slice(0, 12).join(" ") + "...";

    alert("Simple Explanation:\n\n" + simple);
  };

  return (
    <div className="container">
      <h1>Flashcard AI 🚀</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Generate Cards</button>

      {loading && (
        <p className="loading">⚡ Generating smart flashcards...</p>
      )}

      {mode === "fallback" && (
        <p style={{ color: "orange" }}>
          ⚠️ AI limit reached – using smart fallback
        </p>
      )}

      <h3>Total Cards: {cards.length}</h3>
      <h3>
        Mastered: {cards.filter((c) => c.difficulty === "easy").length}
      </h3>

      {cards.length > 0 && (
        <div className="card-section">

          <h4>Card {index + 1} / {cards.length}</h4>

          {/* 🔥 3D CARD */}
          <div
            className="card-wrapper"
            onClick={() => setFlipped(!flipped)}
          >
            <div className={`card-3d ${flipped ? "flipped" : ""}`}>

              <div className="card-face front">
                {cards[index]?.question}
              </div>

              <div className="card-face back">
                {cards[index]?.answer}
              </div>

            </div>
          </div>

          {/* 🔥 UX Hint */}
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            Tap card to flip
          </p>

          {/* 🔥 Buttons */}
          <div className="buttons">
            <button onClick={() => markDifficulty("easy")}>Easy</button>
            <button onClick={() => markDifficulty("medium")}>Medium</button>
            <button onClick={() => markDifficulty("hard")}>Hard</button>
            <button onClick={explainCard}>Explain Simply</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;