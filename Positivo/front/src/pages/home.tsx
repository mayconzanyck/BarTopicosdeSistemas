  import React, { useState } from 'react';
  import BebidaList from '../components/BebidaList';

  const Home: React.FC = () => {
    const [filtro, setFiltro] = useState<'todas' | 'alcoolicas' | 'nao-alcoolicas'>('todas');

    return (
      <div>
        <h2 className="cardapio-titulo">Cardápio de Bebidas</h2>

         {/* Botões de filtro para alternar entre as categorias */}
        <div className="filtro-container">
          <button className="filtro-btn" onClick={() => setFiltro('todas')}>Todas</button>
          <button className="filtro-btn" onClick={() => setFiltro('alcoolicas')}>Alcoólicas</button>
          <button className="filtro-btn" onClick={() => setFiltro('nao-alcoolicas')}>Não Alcoólicas</button>
        </div>

        {/* Componente que renderiza a lista de bebidas com base no filtro selecionado */}
        <BebidaList filtro={filtro} />
      </div>
    );
  };

  export default Home;

