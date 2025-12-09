import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const QuestionForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        setError('Obraz jest za duży! (Max 500KB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || answers.some(a => !a)) {
      setError('Wypełnij treść pytania i wszystkie odpowiedzi.');
      return;
    }

    const newQuestion = {
      id: uuidv4(),
      text,
      answers,
      correctIndex,
      image
    };

    onAdd(newQuestion);
    setText('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
    setImage(null);
    setError('');
  };

  return (
    <Card className="p-3 mb-4 shadow-sm">
      <h4>Dodaj pytanie</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Treść pytania</Form.Label>
          <Form.Control type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Wpisz pytanie..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dodaj obraz    (opcjonalne)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Podgląd" style={{ height: '100px', marginTop: '10px' }} />}
        </Form.Group>

        <Form.Label>Odpowiedzi (zaznacz poprawną)</Form.Label>
        {answers.map((ans, idx) => (
          <div key={idx} className="d-flex align-items-center mb-2">
            <Form.Check 
              type="radio" 
              name="correctAnswer" 
              checked={correctIndex === idx} 
              onChange={() => setCorrectIndex(idx)}
              className="me-2"
            />
            <Form.Control 
              type="text" 
              value={ans} 
              onChange={(e) => handleAnswerChange(idx, e.target.value)} 
              placeholder={`Odpowiedź ${idx + 1}`} 
            />
          </div>
        ))}

        <Button variant="primary" type="submit" className="w-100 mt-2">Zapisz pytanie</Button>
      </Form>
    </Card>
  );
};

export default QuestionForm;