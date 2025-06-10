import React, { useEffect, useState } from 'react';

type Bebida = {
  id: number;
  nome: string;
  preco: number;
  alcoolica: boolean;
};

// Tipo para as props do componente
type Props = {
  filtro: 'todas' | 'alcoolicas' | 'nao-alcoolicas';
};

// Componente funcional que recebe uma prop de filtro
const BebidaList: React.FC<Props> = ({ filtro }) => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);  // Estado para armazenar a lista de bebidas

  const [carregando, setCarregando] = useState(true);  // Estado para indicar se os dados estão sendo carregados

  useEffect(() => {
    const buscar = async () => {
      setCarregando(true);
      let url = 'http://localhost:5271/api/cardapio';

      // Modifica a URL conforme o filtro selecionado
      if (filtro === 'alcoolicas') url += '/alcoolicas';
      if (filtro === 'nao-alcoolicas') url += '/nao-alcoolicas';

      try {
        // Faz requisição à API
        const resposta = await fetch(url);
        const dados = await resposta.json();
        setBebidas(dados);
      } catch (erro) {
        // Trata erros na requisição
        console.error('Erro ao buscar bebidas:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscar();
  }, [filtro]); // O efeito é executado sempre que o filtro mudar

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
