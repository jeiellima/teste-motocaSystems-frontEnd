import React, { useState } from 'react';
import axios from 'axios';
import './style/MotoForm.css';
import { useNavigate } from 'react-router-dom';

const MotoForm = () => {
  const navigate = useNavigate(); // Hook navigate para redirecionamento após o envio do formulário

  // Estado inicial para os dados da moto no formulário
  const [motoData, setMotoData] = useState({
    codigo: '',
    modelo: '',
    cor: '',
    valor: 0,
    status: '',
  });

  // Função para lidar com as mudanças nos inputs do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMotoData({ ...motoData, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    const { codigo, modelo, cor, valor, status } = motoData;

    try {
      // Requisição POST para enviar os dados da moto para o servidor
      await axios.post('http://localhost:5000/motos', { codigo, modelo, cor, valor, status });

      // Limpa os dados do formulário após o envio bem-sucedido
      setMotoData({
        codigo: '',
        modelo: '',
        cor: '',
        valor: 0,
        status: '',
      });

      // Redireciona de volta para a lista de motos após o registro
      navigate('/');

    } catch (error) {
      console.error('Erro ao registrar a moto:', error);
    }
  };

  return (
    <div className="moto-form">
      <h1 className="form-title">Registro de Motos</h1>
      <hr className="form-divider" />
      <h2 className="form-subtitle">Preencha as informações abaixo para registrar uma moto</h2>

      <form onSubmit={handleSubmit}>
        <label>Código:</label>
        <input
          placeholder='#'
          type="text"
          name="codigo"
          value={motoData.codigo}
          onChange={handleChange}
        />

        <label>Modelo da Moto:</label>
        <input
          type="text"
          name="modelo"
          value={motoData.modelo}
          onChange={handleChange}
        />

        <label>Cor:</label>
        <input
          type="text"
          name="cor"
          value={motoData.cor}
          onChange={handleChange}
        />

        <label>Valor:</label>
        <input
          type="number"
          name="valor"
          value={motoData.valor}
          onChange={handleChange}
        />

        <label>Status:</label>
        <select name="status" value={motoData.status} onChange={handleChange}>
          <option value="">Selecionar</option>
          <option value="Em estoque">Em estoque</option>
          <option value="Sem estoque">Sem estoque</option>
          <option value="Em trânsito">Em trânsito</option>
        </select>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default MotoForm;
