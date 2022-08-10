const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;
  const repository = repositories.find(repo=> repo.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.url = updatedRepository.url;
  repository.title = updatedRepository.title;
  repository.techs = updatedRepository.techs;

   return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo=> repo.id ===id)

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repoIndex = repositories.indexOf(repository);
  repositories.splice(repoIndex, 1)

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

   return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo=> repo.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.likes = repository.likes + 1;
  const {likes} = repository 

  return response.json({likes});

});

module.exports = app;
