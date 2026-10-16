# Daylist Todo App

A simple React todo app with a demo login, localStorage persistence, and a Dockerized Node.js development environment.

## Run with Docker

Docker Desktop must be running. From this directory, start the app with:

```powershell
docker compose up -d todo-app
```

Open http://localhost:5173 and sign in with:

- Email: `student@example.com`
- Password: `password123`

Stop the app with `docker compose stop todo-app`.

Todos are saved in the browser localStorage. The Compose service runs Node.js in Docker and stores dependencies in a named Docker volume.
