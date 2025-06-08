import React from 'react';
import ClienteManager from '../components/Client';       // se Client.tsx exporta o form
import ClienteList from '../components/Clientlist';      // se Clientlist.tsx lista os clientes


const ClienteAdmin: React.FC = () => {
  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <ClienteManager />

      <hr style={{ margin: '40px 0' }} />

      <ClienteList />
    </div>
  );
};

export default ClienteAdmin;
