import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import BebidaAdmin from './pages/BebidaAdmin';
import ClienteAdmin from './pages/ClienteAdmin';

function App() {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          minHeight: '100vh',
        }}
      >
        <h1>Bar do Projeto</h1>

        <nav style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ margin: '0 10px' }}>Início</Link>
          <Link to="/admin/bebidas" style={{ margin: '0 10px' }}>Gerenciar Bebidas</Link>
          <Link to="/admin/clientes" style={{ margin: '0 10px' }}>Cadastrar Cliente</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/bebidas" element={<BebidaAdmin />} />
          <Route path="/admin/clientes" element={<ClienteAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
