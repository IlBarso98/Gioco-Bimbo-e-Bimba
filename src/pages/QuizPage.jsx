import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { quizQuestions } from "../data/quizQuestions";
import { siteContent } from "../data/siteContent";
import { shuffle } from "../utils/shuffle";

const correctFeedback = [
  "Giusto. Onestamente era impossibile sbagliare questa.",
  "Brava bimba, era troppo facile?",
  "Risposta perfetta. Brava maestra, hai studiato abbastanza"
];

const wrongFeedback = [
  "Noo, risposta sbagliata. Recuperabile, ma con merenda obbligatoria.",
  "Che pippa al sugo! Ti serviranno un ripasso e delle ripetizioni!",
  "Errore tecnico-emotivo. Nessun dramma, solo un piccolo ripassino."
];

function buildRounds() {
  return quizQuestions.map((entry) => ({
    ...entry,
    options: shuffle([entry.correct, entry.wrong])
  }));
}

function getFinalMessage(score, total) {
  const ratio = score / total;

  if (ratio >= 0.75) {
    return "Lo sapevo, sei la custode ufficiale delle nostre cavolate.";
  }

  if (ratio >= 0.45) {
    return "Ti amo lo stesso, ma urge ripassino con merenda.";
  }

  return "Gravissimo, serve immediatamente una sessione di recupero con abbracci.";
}

function QuizPage() {
  const [rounds, setRounds] = useState(() => buildRounds());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const currentRound = rounds[currentIndex];
  const progress = ((currentIndex + (selectedAnswer ? 1 : 0)) / rounds.length) * 100;

  const handleAnswer = (answer) => {
    if (selectedAnswer) {
      return;
    }

    const answerIsCorrect = answer === currentRound.correct;

    setSelectedAnswer(answer);
    setIsCorrect(answerIsCorrect);
    setFeedback(
      answerIsCorrect
        ? correctFeedback[currentIndex % correctFeedback.length]
        : wrongFeedback[currentIndex % wrongFeedback.length]
    );

    if (answerIsCorrect) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === rounds.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((value) => value + 1);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback("");
  };

  const restartQuiz = () => {
    setRounds(buildRounds());
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback("");
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="page-section">
        <section className="section-block">
          <SectionTitle eyebrow="Quiz" intro={siteContent.quizIntro} title={siteContent.quizTitle} />
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className="glass-card score-card"
            initial={{ opacity: 0, y: 18 }}
          >
            <p className="score-display">
              {score} / {rounds.length}
            </p>
            <h2>Risultato finale</h2>
            <p>{getFinalMessage(score, rounds.length)}</p>
            <button className="action-button" onClick={restartQuiz} type="button">
              Ricomincia il quiz
            </button>
          </motion.article>
        </section>
      </div>
    );
  }

  return (
    <div className="page-section">
      <section className="section-block">
        <SectionTitle eyebrow="Quiz" intro={siteContent.quizIntro} title={siteContent.quizTitle} />
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="glass-card quiz-card"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45 }}
        >
          <div className="progress-shell" aria-hidden="true">
            <span className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz-meta">
            <span>Domanda {currentIndex + 1}</span>
            <span>{rounds.length} totali</span>
          </div>

          <h2>{currentRound.question}</h2>

          <div className="answer-grid">
            {currentRound.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const buttonClassName = [
                "answer-button",
                isSelected ? "is-selected" : "",
                selectedAnswer && option === currentRound.correct ? "is-correct" : "",
                selectedAnswer && isSelected && option !== currentRound.correct ? "is-wrong" : ""
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  className={buttonClassName}
                  disabled={Boolean(selectedAnswer)}
                  key={option}
                  onClick={() => handleAnswer(option)}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer ? (
            <div className={`feedback-card ${isCorrect ? "correct" : "wrong"}`}>
              <p>{feedback}</p>
              <button className="secondary-button" onClick={handleNext} type="button">
                {currentIndex === rounds.length - 1 ? "Vedi il risultato" : "Prossima domanda"}
              </button>
            </div>
          ) : null}
        </motion.article>
      </section>
    </div>
  );
}

export default QuizPage;
