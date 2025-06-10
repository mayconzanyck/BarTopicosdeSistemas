import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import BebidaAdmin from './pages/BebidaAdmin';
import ClienteAdmin from './pages/ClienteAdmin';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>

        {/* Cabeçalho do aplicativo com título e links de navegação */}
        <header style={{
          backgroundColor: '#5e0b15',
          color: '#fff',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '28px' }}>Bar do Projeto</h1>

           {/* Navegação principal */}
          <nav>
            <Link to="/" style={{ color: 'white', marginLeft: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Início</Link>
            <Link to="/admin/bebidas" style={{ color: 'white', marginLeft: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Gerenciar Bebidas</Link>
            <Link to="/admin/clientes" style={{ color: 'white', marginLeft: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Cadastrar Cliente</Link>
          </nav>
        </header>

        {/* Conteúdo principal da página, onde as rotas são renderizadas */}
        <main style={{ padding: '40px 20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/bebidas" element={<BebidaAdmin />} />
            <Route path="/admin/clientes" element={<ClienteAdmin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


