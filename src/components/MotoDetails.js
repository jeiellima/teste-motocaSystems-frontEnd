import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './style/MotoDetails.css';

const MotoDetails = () => {
  const { id } = useParams(); // Obtém o ID da moto da URL usando useParams do React Router
  const navigate = useNavigate(); // Utiliza useNavigate para navegação programática entre rotas
  const [moto, setMoto] = useState(null); // Estado para armazenar os detalhes da moto
  const [editedMoto, setEditedMoto] = useState({ // Estado para armazenar os dados editados da moto
    modelo: '',
    valor: '',
    cor: '',
    status: '',
  });

  useEffect(() => {
    // Efeito de busca da moto pelo ID quando o componente é montado ou o ID muda
    const fetchMoto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/motos/${id}`); // Requisição GET para obter os detalhes da moto
        setMoto(response.data); // Atualiza o estado com os detalhes da moto obtidos
        setEditedMoto(response.data); // Define os dados editados da moto com os detalhes obtidos
      } catch (error) {
        console.error('Erro ao buscar detalhes da moto:', error); // Tratamento de erro caso a requisição falhe
      }
    };

    fetchMoto(); // Chama a função de busca da moto ao montar o componente ou quando o ID muda
  }, [id]); // Dependência do useEffect para garantir que o efeito seja chamado quando o ID muda

  const handleInputChange = (event) => {
    // Função para lidar com a mudança nos inputs do formulário
    const { name, value } = event.target;
    setEditedMoto({ ...editedMoto, [name]: value }); // Atualiza o estado dos dados editados da moto conforme o input muda
  };

  const handleUpdate = async () => {
    // Função para lidar com a atualização dos dados da moto
    try {
      await axios.put(`http://localhost:5000/motos/${id}`, editedMoto); // Requisição PUT para atualizar os dados da moto no servidor
      navigate('/'); // Redireciona de volta para a lista de motos após a atualização
    } catch (error) {
      console.error('Erro ao atualizar a moto:', error); // Tratamento de erro caso a atualização falhe
    }
  };

  if (!moto) {
    return <div>Carregando detalhes da moto...</div>; // Exibe uma mensagem enquanto os detalhes da moto estão sendo carregados
  }

  return (
    <div className="moto-details">
      <h2>Detalhes da Moto</h2>
      <hr />
      <form onSubmit={(event) => { event.preventDefault(); handleUpdate(); }}>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={editedMoto.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={editedMoto.valor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cor:
          <input
            type="text"
            name="cor"
            value={editedMoto.cor}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-label">
          Status:
          <select
            className="form-select"
            name="status"
            value={editedMoto.status}
            onChange={handleInputChange}
          >
            <option value="">Selecionar</option>
            <option value="Em estoque">Em estoque</option>
            <option value="Sem estoque">Sem estoque</option>
            <option value="Em trânsito">Em trânsito</option>
          </select>
        </label>
        <button type="submit" className="form-button">Atualizar</button>
      </form>
    </div>
  );
};

export default MotoDetails;
