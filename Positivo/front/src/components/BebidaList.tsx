import React, { useEffect, useState } from 'react';

type Bebida = {
  id: number;
  nome: string;
  preco: number;
  alcoolica: boolean;
};

type Props = {
  filtro: 'todas' | 'alcoolicas' | 'nao-alcoolicas';
};

const BebidaList: React.FC<Props> = ({ filtro }) => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      setCarregando(true);
      let url = 'http://localhost:5271/api/cardapio';

      if (filtro === 'alcoolicas') url += '/alcoolicas';
      if (filtro === 'nao-alcoolicas') url += '/nao-alcoolicas';

      try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        setBebidas(dados);
      } catch (erro) {
        console.error('Erro ao buscar bebidas:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscar();
  }, [filtro]);

  if (carregando) return <p>Carregando bebidas...</p>;

  return (
    <div>
      {bebidas.map((b) => (
        <div key={b.id} style={{ marginBottom: '15px', background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
          <h3>{b.nome}</h3>
          <p>Preço: R$ {b.preco.toFixed(2)}</p>
          <p>{b.alcoolica ? 'Alcoólica' : 'Não Alcoólica'}</p>
        </div>
      ))}
    </div>
  );
};

export default BebidaList;
