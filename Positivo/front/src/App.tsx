import React, { useState } from 'react';
import BebidaList from './components/BebidaList';
import BebidaManager from './components/BebidaManager';
import ClienteManager from './components/Cliente'; // Novo import

function App() {
  const [filtro, setFiltro] = useState<'todas' | 'alcoolicas' | 'nao-alcoolicas'>('todas');

  return (
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
      <h1>Cardápio de Bebidas</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('alcoolicas')}>Alcoólicas</button>
        <button onClick={() => setFiltro('nao-alcoolicas')}>Não Alcoólicas</button>
      </div>

      <BebidaList filtro={filtro} />

      {/* Área administrativa */}
      <hr style={{ margin: '40px 0', width: '100%' }} />

      <h2 style={{ marginBottom: '20px' }}>Área Administrativa</h2>
      <BebidaManager />

      {/* Cadastro de cliente */}
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Cadastro de Cliente</h2>
      <ClienteManager />
    </div>
  );
}

export default App;
