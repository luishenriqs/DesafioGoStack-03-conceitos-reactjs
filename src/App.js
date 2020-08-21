import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  const [ repositories, setRepositories ] = useState([]);
 
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);
  

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "uuid", 
      title: `Desafio ReactJS, ${Date.now()}`, 
      url: "https://github.com/luishenriqs/GoStack-conceitos-nodejs", 
      techs: ["NodeJS", "ReactJS"], 
      likes: 0 
    })
    const project = response.data;
    setRepositories([...repositories, project])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
  
    setRepositories(repositories.filter(repositories => (repositories.id != id )))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
