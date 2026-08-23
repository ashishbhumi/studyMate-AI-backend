# StudyMate AI Backend

NestJS backend service using TypeORM and MySQL for authentication, note management, folders, tags, and study session tracking.

## 🚀 Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **Docker & Docker Compose** (for running MySQL database)

---

## 🛠️ Step-by-Step Setup & How to Start

### 1. Clone & Navigate to Repository
```bash
cd studyMate-AI-backend
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optionally modify `.env` to customize database credentials, JWT secrets, or ports).*

### 3. Start Database (MySQL)
Run MySQL in a Docker container using Docker Compose:
```bash
docker compose up -d
```
> **Note:** This starts MySQL on port `5001` (mapped to container port 3306) with database `study_mate_db` as defined in `docker-compose.yml`.

### 4. Install Dependencies
```bash
npm install
```

### 5. Seed Initial Auth Users (Optional)
Populate default users (`admin@studymate.com`, `demo@studymate.com`, `user@example.com`) with hashed passwords into MySQL:
```bash
npm run seed
```

### 6. Start the Application

#### Development Mode (with hot-reload)
```bash
npm run start:dev
```
The server will start at `http://localhost:3000`.

#### Production Mode
```bash
# Build TypeScript code
npm run build

# Start production server
npm run start:prod
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Starts the server in development mode with auto-reload |
| `npm run start` | Starts NestJS app without auto-reload |
| `npm run build` | Compiles TypeScript source to `./dist` |
| `npm run start:prod` | Runs compiled production app from `./dist/main` |
| `npm run seed` | Seeds default initial auth users into MySQL database |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run test` | Runs Jest unit tests |
| `npm run test:e2e` | Runs end-to-end tests |

---

## 🔗 Related Services

- **Frontend:** [studyMate-AI-fe](../studyMate-AI-fe) (Vite + React)
- **AI Service:** [studyMate-AI-service](../studyMate-AI-service) (FastAPI + Gemini)
