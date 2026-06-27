# Duitflow

Aplicação full stack para gerenciamento de tarefas, desenvolvida como projeto de estudo com foco em evolução prática e portfólio.

> Fluxo contínuo de execução: organize menos, conclua mais.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=SQLite&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Resumo

Duitflow é uma aplicação de lista de tarefas com backend em Node.js e frontend em React + Vite. O usuário pode criar, editar, concluir e remover tarefas por meio de uma interface minimalista com tema escuro, enquanto a API REST gerencia a persistência dos dados em um banco SQLite.

## Stack

**Backend**
- Node.js + Express 5
- Sequelize + SQLite
- AJV + ajv-errors + ajv-formats (validação de schema)
- dotenv + cors

**Frontend**
- React 19 + Vite
- React Router DOM

## Variáveis de ambiente

Crie o arquivo `backend/.env` com base em `backend/.env.example`:

```env
PORT=3000
NODE_ENV=development
```

## Como rodar

**1. Instale as dependências do backend**

```bash
cd backend
npm install
```

**2. Configure o banco de dados**

Para setar o banco de dados, basta rodar as migrations:

```bash
npm run migrate
```

Depois os, opcionalmente, os seeders:

```bash
npm run seed
```

**3. Inicie o servidor**

```bash
npm run dev
```

**4. Em outro terminal, instale as dependências do frontend**

```bash
cd duitflow-frontend
npm install
```

**5. Inicie o frontend**

```bash
npm run dev
```

**6. Acesse no navegador**

```
http://localhost:5173
```

## Scripts

**Backend** (`backend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor com nodemon (porta 3000) |

**Frontend** (`frontend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite (porta 5173) |

## API

Base: `/api/tasks`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/tasks` | Lista todas as tarefas |
| `GET` | `/api/tasks/:id` | Retorna uma tarefa pelo ID |
| `POST` | `/api/tasks` | Cria uma nova tarefa |
| `PUT` | `/api/tasks/:id` | Atualiza uma tarefa existente |
| `DELETE` | `/api/tasks/:id` | Remove uma tarefa |

## Notas

- O backend roda na porta 3000 e o frontend na porta 5173 (Vite). CORS está habilitado no backend.
- O backend valida os dados das tarefas com AJV antes de persistir.
