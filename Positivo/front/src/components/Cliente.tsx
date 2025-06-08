import React, { useState, useEffect } from 'react';

type Cliente = {
  id: number;
  nome: string;
  dataNascimento: string;
};

const ClienteManager: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const buscarClientes = async () => {
    try {
      const res = await fetch('http://localhost:5271/api/cliente');
      const dados = await res.json();
      setClientes(dados);
    } catch (e) {
      console.error('Erro ao buscar clientes', e);
    }
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !dataNascimento) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    const url = editandoId
      ? `http://localhost:5271/api/cliente/${editandoId}`
      : 'http://localhost:5271/api/cliente';

    const method = editandoId ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editandoId, nome, dataNascimento }),
      });

      const json = await resposta.json();
      setMensagem(json.message || 'Operação concluída');

      setNome('');
      setDataNascimento('');
      setEditandoId(null);
      buscarClientes();
    } catch (erro) {
      console.error('Erro ao enviar:', erro);
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  const editarCliente = (cliente: Cliente) => {
    setNome(cliente.nome);
    setDataNascimento(cliente.dataNascimento.substring(0, 10));
    setEditandoId(cliente.id);
  };

  const cancelarEdicao = () => {
    setNome('');
    setDataNascimento('');
    setEditandoId(null);
  };

  const removerCliente = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5271/api/cliente/${id}`, {
        method: 'DELETE',
      });

      const json = await res.json();
      setMensagem(json.message || 'Cliente removido.');

      buscarClientes();
    } catch (erro) {
      console.error('Erro ao deletar cliente:', erro);
      setMensagem('Erro ao deletar cliente.');
    }
  };

  return (
    <div>
      <h2>{editandoId ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>

      {mensagem && <p style={{ color: 'blue' }}>{mensagem}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
        <button type="submit">{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
        {editandoId && (
          <button type="button" onClick={cancelarEdicao} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>

      {clientes.map((cliente) => (
        <div key={cliente.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento.substring(0, 10)}</p>
          <button onClick={() => editarCliente(cliente)}>Editar</button>
          <button
            onClick={() => removerCliente(cliente.id)}
            style={{ marginLeft: '10px', color: 'red' }}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};

export default ClienteManager;
