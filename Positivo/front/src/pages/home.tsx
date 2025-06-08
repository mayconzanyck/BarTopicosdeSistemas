import React, { useState } from 'react';
import BebidaList from '../components/BebidaList';

const Home: React.FC = () => {
  const [filtro, setFiltro] = useState<'todas' | 'alcoolicas' | 'nao-alcoolicas'>('todas');

  return (
    <div>
      <h2>Cardápio de Bebidas</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('alcoolicas')}>Alcoólicas</button>
        <button onClick={() => setFiltro('nao-alcoolicas')}>Não Alcoólicas</button>
      </div>
      <BebidaList filtro={filtro} />
    </div>
  );
};

export default Home;
