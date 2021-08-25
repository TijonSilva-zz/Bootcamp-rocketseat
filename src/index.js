const express = require('express');
const { v4: uuid_v4 } = require('uuid');
uuid_v4();

const app = express();
app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel)

  next(); //proximo middleware
  console.timeEnd(logLabel)
}

app.use(logRequests);

app.get("/projects", (request, response) => {
  const { title } = request.query

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results)
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body

  const project = { id: uuid_v4(), title, owner }

  projects.push(project)
  return response.json(project)
})

app.put("/projects/:id", (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body

  const projectIndex = projects.findIndex(project => project.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' })
  }

  const project = {
    id,
    title,
    owner,
  }
  projects[projectIndex] = project

  return response.json(project)
})

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params
  const projectIndex = projects.findIndex(project => project.id == id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' })
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log("🔐pai ta oon e atualizado💻")
})
