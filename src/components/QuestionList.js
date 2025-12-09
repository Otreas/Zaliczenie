import React from 'react';
import { Card, Button, ListGroup, Badge, Alert } from 'react-bootstrap';

const DEFAULT_IMAGE = "https://via.placeholder.com/150?text=Brak+Zdjecia";

const QuestionList = ({ questions, onDelete }) => {
  if (questions.length === 0) {
    return <Alert variant="info">Brak pytań. Dodaj pierwsze pytanie!</Alert>;
  }

  return (
    <div>
      <h4>Lista pytań ({questions.length})</h4>
      {questions.map((q, index) => (
        <Card key={q.id} className="mb-3 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h5>{index + 1}. {q.text}</h5>
              <Button variant="danger" size="sm" onClick={() => onDelete(q.id)}>Usuń</Button>
            </div>
            
            <div className="row mt-2">
              <div className="col-md-4">
                 <img 
                   src={q.image || DEFAULT_IMAGE} 
                   alt="Ilustracja" 
                   className="img-fluid rounded" 
                   style={{ maxHeight: '150px' }} 
                 />
              </div>
              <div className="col-md-8">
                <ListGroup variant="flush">
                  {q.answers.map((ans, idx) => (
                    <ListGroup.Item key={idx} style={idx === q.correctIndex ? { fontWeight: 'bold', color: 'green' } : {}}>
                      {ans} {idx === q.correctIndex && <Badge bg="success">Poprawna</Badge>}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default QuestionList;