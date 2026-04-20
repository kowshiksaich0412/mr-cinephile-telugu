# Mr Cinephile Telugu (MERN)

Full-stack film media platform for Telugu cinema reviews, news, trailer breakdowns, and top lists.

## Stack
- Frontend: React + Vite + Tailwind + React Router + Axios
- Backend: Node.js + Express + JWT + Multer
- Database: MongoDB + Mongoose

## Project Structure
```
client/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
server/
  config/
  controllers/
  middleware/
  models/
  routes/
  uploads/
  server.js
```

## Run Locally

### 1) Backend
```bash
cd server
npm install
npm run dev
```

### 2) Frontend
```bash
cd client
npm install
npm run dev
```

## Required Backend Env
- `PORT`
- `MONGO_URI`
- `MONGO_DB_NAME` (optional, defaults to `CinephileDB`)
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Environment Files
- Use [server/.env.example](c:\Users\kowsh\Desktop\Cinephile Telugu\server\.env.example) as the backend template.
- Use [client/.env.example](c:\Users\kowsh\Desktop\Cinephile Telugu\client\.env.example) as the frontend template.
- Keep real `.env` files out of version control. The root [`.gitignore`](c:\Users\kowsh\Desktop\Cinephile Telugu\.gitignore) now excludes them.

Admin account is auto-seeded on first backend run if `ADMIN_EMAIL` + `ADMIN_PASSWORD` are set.
