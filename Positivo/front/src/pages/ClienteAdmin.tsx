import React from 'react';
import ClienteManager from '../components/Cliente';

const ClienteAdmin: React.FC = () => {
  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <ClienteManager />
    </div>
  );
};

export default ClienteAdmin;
