import React from 'react';
import ClienteManager from '../components/Cliente';
import ClienteList from '../components/ClienteList';

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
