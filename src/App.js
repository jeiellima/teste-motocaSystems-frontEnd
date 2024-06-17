import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MotoForm from './components/MotoForm';
import MotoList from './components/MotoList';
import MotoDetails from './components/MotoDetails';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>  // Use Routes instead of Switch
          <Route exact path="/" element={<MotoList />} />
          <Route path="/detalhes/:id" element={<MotoDetails />} />
          <Route path="/cadastro" element={<MotoForm />} />
          <Route path="/moto/:id" element={<MotoDetails />} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;
