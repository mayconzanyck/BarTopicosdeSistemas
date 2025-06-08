import React, { useEffect, useState } from 'react';

type Cliente = {
  id: number;
  nome: string;
  idade: number;
};

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const resposta = await fetch('http://localhost:5271/api/cliente');
        const dados = await resposta.json();
        setClientes(dados);
      } catch (erro) {
        console.error('Erro ao buscar clientes:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarClientes();
  }, []);

  if (carregando) return <p>Carregando clientes...</p>;

  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>Clientes Cadastrados</h3>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        clientes.map((cliente) => (
          <div key={cliente.id} style={{ marginBottom: '10px', background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Idade:</strong> {cliente.idade}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ClienteList;
