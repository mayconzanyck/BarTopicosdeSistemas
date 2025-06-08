import React, { useEffect, useState } from 'react';

// Tipo que representa uma bebida
type Bebida = {
  id: number;
  nome: string;
  preco: number;
  alcoolica: boolean;
};

const BebidaManager: React.FC = () => {
  // Estado que guarda a lista de bebidas
  const [bebidas, setBebidas] = useState<Bebida[]>([]);

  // Estado para controle de carregamento enquanto busca as bebidas
  const [carregando, setCarregando] = useState(true);

  // Estado do formulário de bebida (nome, preço, se é alcoólica)
  const [form, setForm] = useState<Omit<Bebida, 'id'> & { id?: number }>({
    nome: '',
    preco: 0,
    alcoolica: false,
  });

  // Estado que controla se está editando uma bebida existente
  const [modoEdicao, setModoEdicao] = useState(false);

  // Mensagem de sucesso ou erro a ser exibida ao usuário
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');

  // Função para buscar bebidas do backend
  const buscarBebidas = async () => {
    setCarregando(true); // Inicia com carregando ativado
    try {
      const resp = await fetch('http://localhost:5271/api/cardapio'); // Faz requisição GET
      const dados = await resp.json(); // Converte resposta em JSON
      setBebidas(dados); // Atualiza estado com as bebidas recebidas
    } catch (e) {
      console.error(e); // Mostra erro no console caso falhe
    } finally {
      setCarregando(false); // Finaliza o carregamento
    }
  };

  // useEffect chama a função assim que o componente for montado
  useEffect(() => {
    buscarBebidas();
  }, []);

  // Função que envia os dados do formulário para API (cadastrar ou atualizar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede recarregamento da página
    const url = 'http://localhost:5271/api/cardapio';
    const metodo = modoEdicao ? 'PUT' : 'POST'; // Define se é atualização ou novo cadastro
    const finalUrl = modoEdicao ? `${url}/${form.id}` : url;

    try {
      const resposta = await fetch(finalUrl, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // Se resposta for ok, exibe mensagem de sucesso
      if (resposta.ok) {
        setMensagem(modoEdicao ? 'Bebida atualizada com sucesso!' : 'Bebida cadastrada com sucesso!');
        setTipoMensagem('sucesso');

        // Limpa o formulário e volta ao modo de cadastro
        setForm({ nome: '', preco: 0, alcoolica: false });
        setModoEdicao(false);

        // Atualiza a lista de bebidas
        buscarBebidas();
      } else {
        const erro = await resposta.json();
        setMensagem(erro.message || 'Erro ao salvar bebida.');
        setTipoMensagem('erro');
      }
    } catch (e) {
      console.error('Erro ao salvar bebida:', e);
      setMensagem('Erro de conexão com o servidor.');
      setTipoMensagem('erro');
    }

    // Limpa a mensagem depois de 3 segundos
    setTimeout(() => {
      setMensagem('');
      setTipoMensagem('');
    }, 3000);
  };

  // Preenche o formulário com os dados da bebida para edição
  const handleEdit = (bebida: Bebida) => {
    setForm(bebida);
    setModoEdicao(true);
  };

  // Remove uma bebida com base no ID
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5271/api/cardapio/${id}`, {
        method: 'DELETE',
      });
      buscarBebidas(); // Atualiza a lista após deletar
    } catch (e) {
      console.error('Erro ao deletar bebida:', e);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{modoEdicao ? 'Editar Bebida' : 'Cadastrar Nova Bebida'}</h2>

      {/* Exibe mensagem de sucesso ou erro */}
      {mensagem && (
        <p
          style={{
            color: tipoMensagem === 'sucesso' ? 'green' : 'red',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          {mensagem}
        </p>
      )}

      {/* Formulário para cadastrar ou editar bebida */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.preco}
          onChange={(e) =>
            setForm({ ...form, preco: parseFloat(e.target.value) })
          }
          required
        />
        <label>
          <input
            type="checkbox"
            checked={form.alcoolica}
            onChange={(e) =>
              setForm({ ...form, alcoolica: e.target.checked })
            }
          />
          Alcoólica
        </label>

        {/* Botões de enviar ou cancelar edição */}
        <button type="submit">{modoEdicao ? 'Atualizar' : 'Cadastrar'}</button>
        {modoEdicao && (
          <button
            onClick={() => {
              setForm({ nome: '', preco: 0, alcoolica: false });
              setModoEdicao(false);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de bebidas com botão de editar e remover */}
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        bebidas.map((b) => (
          <div
            key={b.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <h3>{b.nome}</h3>
            <p>Preço: R$ {b.preco.toFixed(2)}</p>
            <p>{b.alcoolica ? 'Alcoólica' : 'Não Alcoólica'}</p>
            <button
              onClick={() => handleDelete(b.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Remover
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BebidaManager;
