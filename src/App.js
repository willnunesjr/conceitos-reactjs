import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Usuário ${Date.now()}`,
      url: 'https://github.com/willnunesjr',
      techs: ['Node.js', 'React Native', 'JavaScript'],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    /* A grande dificuldade aqui é entender e, principalmente, aplicar o 
    conceito de imutabilidade. Não podemos atuar diretamente sobre o 
    conteúdo do array repositories, e sim criar um novo array, colocar nele
    os dados pertinentes e depois substituir o antigo pelo novo.*/
    
    
    /* Buscando índice e removendo a posição correspondente a ele do array */
    //const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    /*A função slice retorna a cópia de um array. Podemos especificar as
    posições de início e fim.*/
    //const newRepositories = repositories.slice();
    //newRepositories.splice(repositoryIndex, 1);

    /* Utilizando um filtro*/

    const newRepositories = repositories.filter(repository => repository.id !== id);

    //console.log(repositories);

    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response);
    })
  },[]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
