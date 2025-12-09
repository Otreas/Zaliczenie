import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css"
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import QuizMode from './components/QuizMode';

const App = () => {

  const [questions, setQuestions] = useState(() => {
      const saved = localStorage.getItem('quiz-data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Błąd parsowania JSON:", e);
          return [];
        }
      }
      return [];
    });
  const [view, setView] = useState('creator'); // 'creator' lub 'student'

  //Zapis LocalStorage
  useEffect(() => {
    localStorage.setItem('quiz-data', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Generator Testów</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant={view === 'creator' ? "primary" : "outline-light"} onClick={() => setView('creator')} className="me-2">Edytor</Button>
            <Button variant={view === 'student' ? "success" : "outline-light"} onClick={() => setView('student')}>Rozwiąż Test</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {view === 'creator' ? (
          <div className="row">
            <div className="col-md-5">
              <QuestionForm onAdd={addQuestion} />
            </div>
            <div className="col-md-7">
              <QuestionList questions={questions} onDelete={deleteQuestion} />
            </div>
          </div>
        ) : (
          <QuizMode questions={questions} />
        )}
      </Container>
    </>
  );
};

export default App;