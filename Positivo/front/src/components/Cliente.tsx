import React, { useState } from 'react';

type Cliente = {
  nome: string;
  email: string;
  idade: number;
};

const ClienteManager: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({ nome: '', email: '', idade: 0 });
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch('https://localhost:5001/api/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      if (resp.ok) {
        setMensagem('Cliente cadastrado com sucesso!');
        setCliente({ nome: '', email: '', idade: 0 });
      } else {
        setMensagem('Erro ao cadastrar cliente.');
      }
    } catch (e) {
      console.error(e);
      setMensagem('Erro na conexão com a API.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', marginTop: '30px' }}>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={cliente.email}
            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Idade"
            value={cliente.idade}
            onChange={(e) => setCliente({ ...cliente, idade: parseInt(e.target.value) })}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default ClienteManager;
