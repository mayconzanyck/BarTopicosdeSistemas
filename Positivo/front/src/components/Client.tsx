import React, { useState } from 'react';

// Componente funcional React
const ClienteManager: React.FC = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!nome || !dataNascimento) {
      setMensagem('Preencha todos os campos.');
      setTipoMensagem('erro');
      return;
    }

    try {
      // Faz requisição POST para a API para cadastrar o cliente
      const resposta = await fetch('http://localhost:5271/api/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          dataNascimento,
        }),
      });

      // Converte a resposta da API em JSON
      const json = await resposta.json();

      if (resposta.ok) {
        setMensagem(json.message || 'Cliente cadastrado com sucesso!');
        setTipoMensagem('sucesso');
        setNome('');
        setDataNascimento('');
      } else {
        // Se a API retornou erro, mostra mensagem apropriada
        setMensagem(json.message || 'Erro ao cadastrar cliente.');
        setTipoMensagem('erro');
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro);
      setMensagem('Erro ao conectar com o servidor.');
      setTipoMensagem('erro');
    }
  };

  return (
     // Formulário com evento de submit tratado pela função handleSubmit
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px', width: '200px' }}
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px', width: '200px' }}
        />
      </div>
      
      <button type="submit" className="filtro-btn">Cadastrar Cliente</button>

      {mensagem && (
        <p
          style={{
            marginTop: '10px',
            color: tipoMensagem === 'sucesso' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {mensagem}
        </p>
      )}
    </form>
  );
};

export default ClienteManager;
