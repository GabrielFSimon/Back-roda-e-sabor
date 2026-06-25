# Roda & Sabor — Backend (API)

API REST em Node.js + Express + PostgreSQL.  
**Deploy: Render.com**

## Configurar no Render

1. Crie um novo serviço **Web Service** no Render
2. Conecte este repositório
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

4. Adicione as variáveis de ambiente em **Environment > Add Environment Variable**:

| Variável | Valor |
|---|---|
| `DB_HOST` | host do banco Postgres (Render fornece) |
| `DB_PORT` | `5432` |
| `DB_NAME` | nome do banco |
| `DB_USER` | usuário do banco |
| `DB_PASSWORD` | senha do banco |
| `JWT_SECRET` | qualquer string longa e secreta |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | URL do seu frontend no Vercel (ex: `https://roda-sabor.vercel.app`) |
| `API_PORT` | `3333` (ou deixe em branco, Render usa a porta padrão) |

5. Crie um banco **PostgreSQL** no Render e copie as credenciais

## Login admin padrão

```
Email: admin@rodaesabor.com  
Senha: admin123
```

## Rodar localmente

```bash
cp .env.example .env
# edite o .env com suas credenciais locais
npm install
npm run dev
```
