# Duitflow

Aplicação full stack de gerenciamento de tarefas, desenvolvida como projeto de estudo com foco em evolução prática e portfólio.

> Fluxo contínuo de execução: organize menos, conclua mais.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## Resumo

Duitflow é uma aplicação de gerenciamento de tarefas com backend em Node.js/Express e frontend em React + TypeScript + Vite. Cada usuário autentica-se via JWT e gerencia suas próprias tarefas (criar, editar, concluir e remover) através de um dashboard com filtros por status, modais de criação/edição e tema claro/escuro.

## Funcionalidades

- **Autenticação**: registro e login com JWT, senhas com hash via bcrypt
- **Autorização por papel (RBAC)**: usuários comuns só acessam suas próprias tarefas; admins têm acesso irrestrito
- **Rate limiting** nas rotas de login e registro contra tentativas de força bruta
- **CRUD completo de tarefas**, com título, descrição, status (`pending` / `in_progress` / `done`), data e hora de vencimento
- **Dashboard** com contadores por status e filtro rápido
- **UI**: modais para criar/editar tarefas, notificações via toast, tema claro/escuro persistido localmente

## Stack

**Backend**
- Node.js + Express 5
- Sequelize + SQLite
- JWT + bcrypt (autenticação)
- express-rate-limit
- AJV + ajv-errors + ajv-formats (validação de schema)
- dotenv + cors

**Frontend**
- React 19 + TypeScript + Vite
- React Router DOM
- Context API para estado de autenticação

## Variáveis de ambiente

Crie o arquivo `duitflow-backend/.env` com base em `duitflow-backend/.env.example`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=uma_chave_secreta_forte
JWT_EXPIRES_IN=1d
```

## Como rodar

**1. Instale as dependências do backend**

```bash
cd duitflow-backend
npm install
```

**2. Configure o banco de dados**

Rode as migrations:

```bash
npm run db:migrate
```

Depois, opcionalmente, os seeders:

```bash
npm run db:seed
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

**Backend** (`duitflow-backend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor com nodemon (porta 3000) |
| `npm run db:migrate` | Executa as migrations do banco |
| `npm run db:seed` | Popula o banco com dados de exemplo |

**Frontend** (`duitflow-frontend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite (porta 5173) |

## API

**Usuários** — base `/api/users`

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/api/users/register` | Cria uma nova conta | - |
| `POST` | `/api/users/login` | Autentica e retorna um token JWT | - |
| `GET` | `/api/users` | Lista todos os usuários | Admin |

**Tarefas** — base `/api/tasks`

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/tasks/me` | Lista as tarefas do usuário autenticado | Sim |
| `GET` | `/api/tasks/:id` | Retorna uma tarefa pelo ID (dono ou admin) | Sim |
| `POST` | `/api/tasks` | Cria uma nova tarefa | Sim |
| `PUT` | `/api/tasks/:id` | Atualiza uma tarefa existente (dono ou admin) | Sim |
| `DELETE` | `/api/tasks/:id` | Remove uma tarefa (dono ou admin) | Sim |

## Notas

- O backend roda na porta 3000 e o frontend na porta 5173 (Vite). CORS está habilitado no backend.
- O backend valida os dados de entrada com AJV antes de persistir.
- Rotas autenticadas exigem o header `Authorization: Bearer <token>`.