# Client Management System Backend (Technical Assessment for Sensia Ventures Group)

Author: Wakil Niazi
Email: contact@wani4.com
**Important Disclaimer**  
This project was completed under a strict time constraint as part of a technical assessment.  
Certain features remain incomplete or simplified, most notably, **Stripe payment integration has not been implemented** and real-world payment processing is not included.  
Also access levesl (permissions) are not implemented.
This codebase is provided solely for evaluation purposes and should not be considered production-ready, used in any real environment, or treated as a complete commercial system.

### Features Implemented (within time limit)

- Full CRUD: Products, Clients, Orders, Comments, Users
- Orders support split payments (Cash + Card) logic only
- JWT authentication + admin bypass
- Clean, typed TypeScript codebase with proper separation of concerns
- PostgreSQL + Sequelize + migrations + seed data

### Tech Stack

- Runtime: **Bun** (v1.2+) / Node 22
- Framework: Express
- ORM: Sequelize
- Database: PostgreSQL
- Auth: JWT + bcrypt

### Setup & Running

```bash
bun install

sudo -u postgres createdb client_management

cp .env.example .env

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

bun run src/index.ts


# Or if you using Node

npm install

sudo -u postgres createdb client_management

cp .env.example .env

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

node src/index.js   # or use ts-node
```
