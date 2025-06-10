import React, { useEffect, useState } from 'react';

// Define o tipo Cliente, com os campos esperados vindos do backend
type Cliente = {
  id: number;
  nome: string;
  dataNascimento: string;
};

// Função para calcular a idade a partir da data de nascimento
const calcularIdade = (dataNascimento: string): number => {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [novaDataNascimento, setNovaDataNascimento] = useState('');

  // Função que busca os clientes da API
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

  // Executa a busca de clientes assim que o componente é montado
  useEffect(() => {
    buscarClientes();
  }, []);

  const handleEditar = (cliente: Cliente) => {
    setEditandoId(cliente.id);
    setNovoNome(cliente.nome);
    setNovaDataNascimento(cliente.dataNascimento.split('T')[0]);
  };

  // Salva as alterações do cliente editado
    const handleSalvar = async (id: number) => {
    try {
        const resposta = await fetch(`http://localhost:5271/api/cliente/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id, // <- IMPORTANTE!
            nome: novoNome,
            dataNascimento: novaDataNascimento,
        }),
        });

        const json = await resposta.json();
        console.log('Resposta do PUT:', resposta.status, json);

        if (resposta.ok) {
        await buscarClientes(); // Recarrega a lista com os dados atualizados
        setEditandoId(null); // Fecha o modo de edição
        } else {
        alert(json.message || 'Erro ao atualizar cliente.');
        }
    } catch (erro) {
        console.error('Erro ao atualizar cliente:', erro);
        alert('Erro ao atualizar cliente.');
    }
    };

// Remove um cliente após confirmação
  const handleRemover = async (id: number) => {
    if (!window.confirm('Deseja realmente remover este cliente?')) return;

    try {
      const resposta = await fetch(`http://localhost:5271/api/cliente/${id}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        setClientes(clientes.filter((c) => c.id !== id));
      } else {
        console.error('Erro ao remover cliente');
      }
    } catch (erro) {
      console.error('Erro ao remover cliente:', erro);
    }
  };

  // Enquanto carrega os dados, mostra uma mensagem
  if (carregando) return <p>Carregando clientes...</p>;

  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>Clientes Cadastrados</h3>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        clientes.map((cliente) => (
          <div key={cliente.id} style={{ marginBottom: '10px', background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
            {editandoId === cliente.id ? (
              <div>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  style={{ marginBottom: '5px' }}
                />
                <input
                  type="date"
                  value={novaDataNascimento}
                  onChange={(e) => setNovaDataNascimento(e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
                <br />
                  <button className="filtro-btn" onClick={() => handleSalvar(cliente.id)}>Salvar</button>
                  <button className="filtro-btn" onClick={() => setEditandoId(null)} style={{ marginLeft: '10px' }}>Cancelar</button>

              </div>
            ) : (
              <>
                <p><strong>Nome:</strong> {cliente.nome}</p>
                <p><strong>Idade:</strong> {calcularIdade(cliente.dataNascimento)} anos</p>
              <button className="filtro-btn" onClick={() => handleEditar(cliente)}>Editar</button>
              <button className="filtro-btn" onClick={() => handleRemover(cliente.id)} style={{ marginLeft: '10px' }}>Remover</button>

              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ClienteList;
