const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('body', (request, response) => JSON.stringify(request.body));

app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>');
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>` +
    `<p>${new Date()}</p>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return Math.round(Math.random() * 1000000);
}

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  if (!person.name) {
    return response.status(400).json({
      error: 'name is required'
    });
  }

  if (!person.number) {
    return response.status(400).json({
      error: 'number is required'
    });
  }
  
  if (persons.find(p => p.name === person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});