import React from 'react';
import ClienteManager from '../components/Client';       // se Client.tsx exporta o form
import ClienteList from '../components/Clientlist';      // se Clientlist.tsx lista os clientes


const ClienteAdmin: React.FC = () => {
  return (
    <div>
      <h2 className="cardapio-titulo">Cadastro de Cliente</h2>

    {/* Componente de formulário para cadastrar um novo cliente */}
      <div>
        <ClienteManager />
      </div>

      <hr style={{ margin: '40px 0' }} />

      <h3 className="cardapio-titulo">Lista de Clientes</h3>
      
       {/* Componente que exibe a lista de clientes cadastrados */}
      <ClienteList />
    </div>
  );
};

export default ClienteAdmin;
