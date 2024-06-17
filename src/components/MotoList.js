import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/MotoList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const MotoList = () => {
  const [motos, setMotos] = useState([]); // Estado para armazenar a lista de motos

  useEffect(() => {
    fetchMotos(); // Chama a função para buscar as motos ao montar o componente
  }, []);

  // Função para buscar as motos na API
  const fetchMotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/motos'); // Requisição GET para buscar as motos
      setMotos(response.data); // Atualiza o estado com os dados das motos obtidos na resposta
    } catch (error) {
      console.error('Erro ao buscar motos:', error); // Trata erros na busca das motos
    }
  };

  // Função para lidar com a exclusão de uma moto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/motos/${id}`); // Requisição DELETE para excluir a moto com o ID fornecido
      fetchMotos(); // Após a exclusão, atualiza a lista de motos
    } catch (error) {
      console.error('Erro ao deletar a moto:', error); // Trata erros na exclusão da moto
    }
  };

  // Função para definir a classe CSS baseada no status da moto
  const getStatusClass = (status) => {
    switch (status) {
      case 'Sem estoque':
        return 'status-sem-estoque'; // Retorna classe para status "Sem estoque"
      case 'Em trânsito':
        return 'status-transito'; // Retorna classe para status "Em trânsito"
      default:
        return 'status'; // Retorna classe padrão para outros status
    }
  };

  return (
    <div className="moto-list">
      <div className="header">
        <h2>Tabela de Motos</h2>
        <Link to="/cadastro" className="btn-novo-registro">+ Novo Registro</Link> {/* Link para cadastrar nova moto */}
      </div>
      <hr />
      <ul>
        {motos.map((moto) => (
          <li key={moto.id}>
            <div className="moto-info">
              <div className="code">#{moto.codigo}</div> {/* Exibe o código da moto */}
              <div>
                <strong>{moto.modelo}</strong> {/* Exibe o modelo da moto */}
                <span className={`status ${getStatusClass(moto.status)}`}>{moto.status}</span> {/* Exibe o status da moto com classe CSS dinâmica */}
                <p>Valor: R${moto.valor}</p> {/* Exibe o valor da moto */}
                <p>Cor: {moto.cor}</p> {/* Exibe a cor da moto */}
              </div>
            </div>
            <div className="moto-actions">
              <Link to={`/detalhes/${moto.id}`}>
                <button className="btn-editar">
                  <FontAwesomeIcon icon={faEye} /> {/* Ícone de olho para detalhes da moto */}
                </button>
              </Link>
              <button className="btn-deletar" onClick={() => handleDelete(moto.id)}>
                <FontAwesomeIcon icon={faTrashAlt} /> {/* Ícone de lixeira para deletar a moto */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotoList;
