import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Container>
    <Router>
      <App />
    </Router>
  </Container>
);
