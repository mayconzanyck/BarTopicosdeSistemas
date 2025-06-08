import React, { useEffect, useState } from 'react';

type Bebida = {
  id: number;
  nome: string;
  preco: number;
  alcoolica: boolean;
};

const BebidaManager: React.FC = () => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState<Omit<Bebida, 'id'> & { id?: number }>({ nome: '', preco: 0, alcoolica: false });
  const [modoEdicao, setModoEdicao] = useState(false);

  const buscarBebidas = async () => {
    setCarregando(true);
    try {
      const resp = await fetch('https://localhost:5001/api/cardapio');
      const dados = await resp.json();
      setBebidas(dados);
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarBebidas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = 'https://localhost:5001/api/cardapio';
    const metodo = modoEdicao ? 'PUT' : 'POST';
    const finalUrl = modoEdicao ? `${url}/${form.id}` : url;

    try {
      await fetch(finalUrl, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ nome: '', preco: 0, alcoolica: false });
      setModoEdicao(false);
      buscarBebidas();
    } catch (e) {
      console.error('Erro ao salvar bebida:', e);
    }
  };

  const handleEdit = (bebida: Bebida) => {
    setForm(bebida);
    setModoEdicao(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://localhost:5001/api/cardapio/${id}`, { method: 'DELETE' });
      buscarBebidas();
    } catch (e) {
      console.error('Erro ao deletar bebida:', e);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{modoEdicao ? 'Editar Bebida' : 'Cadastrar Nova Bebida'}</h2>
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
          onChange={(e) => setForm({ ...form, preco: parseFloat(e.target.value) })}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={form.alcoolica}
            onChange={(e) => setForm({ ...form, alcoolica: e.target.checked })}
          />
          Alcoólica
        </label>
        <button type="submit">{modoEdicao ? 'Atualizar' : 'Cadastrar'}</button>
        {modoEdicao && <button onClick={() => { setForm({ nome: '', preco: 0, alcoolica: false }); setModoEdicao(false); }}>Cancelar</button>}
      </form>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        bebidas.map((b) => (
          <div key={b.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px', borderRadius: '8px' }}>
            <h3>{b.nome}</h3>
            <p>Preço: R$ {b.preco.toFixed(2)}</p>
            <p>{b.alcoolica ? 'Alcoólica' : 'Não Alcoólica'}</p>
            <button onClick={() => handleEdit(b)}>Editar</button>
            <button onClick={() => handleDelete(b.id)} style={{ marginLeft: '10px', color: 'red' }}>Remover</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BebidaManager;
