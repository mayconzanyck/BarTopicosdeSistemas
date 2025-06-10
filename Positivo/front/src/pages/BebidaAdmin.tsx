import React from 'react';
import BebidaManager from '../components/BebidaManager';

const BebidaAdmin: React.FC = () => {
  return (
    <div>
      <h2 className="cardapio-titulo">Administração de Bebidas</h2>

      {/* Componente que gerencia a listagem, criação, edição e remoção de bebidas */}
      <BebidaManager />
    </div>
  );
};

export default BebidaAdmin;

