import React, { useState } from 'react';
import BebidaList from './components/BebidaList';

function App() {
  const [filtro, setFiltro] = useState<'todas' | 'alcoolicas' | 'nao-alcoolicas'>('todas');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // centraliza horizontalmente
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>Cardápio de Bebidas</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('alcoolicas')}>Alcoólicas</button>
        <button onClick={() => setFiltro('nao-alcoolicas')}>Não Alcoólicas</button>
      </div>

      <BebidaList filtro={filtro} />
    </div>
  );
}

export default App;



