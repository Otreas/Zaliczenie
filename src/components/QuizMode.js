import React, { useState } from 'react';
import { Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap';

const DEFAULT_IMAGE = "https://via.placeholder.com/300?text=Pytanie";

const QuizMode = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (questions.length === 0) {
    return <Alert variant="warning">Brak pytań w bazie. Przejdź do edytora, aby stworzyć test.</Alert>;
  }

  const handleSelect = (qId, ansIdx) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [qId]: ansIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="pb-5">
      {submitted && (
        <Card className="mb-4 text-center border-success">
          <Card.Header as="h3" className="bg-success text-white">Wynik: {score} / {questions.length}</Card.Header>
          <Card.Body>
            <h4>{percentage}% Poprawnych odpowiedzi</h4>
            <Button variant="outline-dark" onClick={resetQuiz} className="mt-3">Rozwiąż ponownie</Button>
          </Card.Body>
        </Card>
      )}

      {questions.map((q, index) => {
        const isCorrect = userAnswers[q.id] === q.correctIndex;
        const isSelected = userAnswers[q.id] !== undefined;
        let cardBorder = "";
        
        if (submitted) {
            cardBorder = isCorrect ? "border-success" : "border-danger";
        }

        return (
          <Card key={q.id} className={`mb-4 shadow ${cardBorder}`}>
            <Card.Header>Pytanie {index + 1}</Card.Header>
            <Card.Body>
               <div className="text-center mb-3">
                 <img src={q.image || DEFAULT_IMAGE} alt="Pytanie" style={{ maxHeight: '200px', maxWidth: '100%' }} />
               </div>
               <Card.Title>{q.text}</Card.Title>
               
               <div className="mt-3">
                 {q.answers.map((ans, idx) => {
                   let btnVariant = "outline-primary";

                   if (submitted) {
                     if (idx === q.correctIndex) btnVariant = "success";
                     else if (userAnswers[q.id] === idx) btnVariant = "danger";
                     else btnVariant = "outline-secondary";
                   } else {
                     if (userAnswers[q.id] === idx) btnVariant = "primary";
                   }

                   return (
                     <Button 
                       key={idx}
                       variant={btnVariant}
                       className="w-100 mb-2 text-start"
                       onClick={() => handleSelect(q.id, idx)}
                       disabled={submitted}
                     >
                       {['A', 'B', 'C', 'D'][idx]}. {ans}
                     </Button>
                   );
                 })}
               </div>
            </Card.Body>
            {submitted && !isCorrect && (
                <Card.Footer className="text-danger">
                    Wybrano błędną odpowiedź. Prawidłowa to: <b>{q.answers[q.correctIndex]}</b>
                </Card.Footer>
            )}
          </Card>
        );
      })}

      {!submitted && (
        <Button size="lg" variant="success" className="w-100" onClick={() => setSubmitted(true)}>
          Zakończ test i sprawdź wynik
        </Button>
      )}
    </div>
  );
};

export default QuizMode;