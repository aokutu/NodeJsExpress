# Express Docs (In Progress)

A Node.js and Express web application backed by SQLite (`better-sqlite3`), currently focused on the landing page, login/registration page, database schema setup, and registration middleware flow.

## Current Features
- **Landing Page (`GET /`)**: Serves `views/index.html` via `LandingPage` in `controllers/pageController.js`.
- **Login & Registration Page (`GET /loggin`)**: Serves `views/loggin.html` with tabbed **Sign In** and **Register** forms styled with Tailwind CSS, using standard HTML form `POST` submissions.
- **Centralized Router (`routes/routes.js`)**: Defines routes using `express.Router()` and mounts them in `server.js` via `app.use(routes)` (or `app.use("/", routes)`).
- **SQLite Database & Schema (`dbaccess.js`, `db/schema.js`)**: Connects to SQLite via `better-sqlite3` (with WAL mode enabled) in `dbaccess.js`, and defines the `users` table (`id`, `username`, `email`, `password`, `created_at` with `UNIQUE` constraints on `username` and `email`).
- **Registration Flow (`POST /api/register`)**:
  1. `Checkuser` (`middlewares/Authenticate.js`) validates `username` and `email` in `req.body` and queries `users` (`WHERE username = ? OR email = ?`), returning `400` if missing or `409` JSON if already taken before calling `next()`.
  2. `NewUser` (`controllers/pageController.js`) inserts the new `username`, `email`, and `password` into `users` and redirects to `/loggin`.
- **Body Parsing & Environment Setup**: Configured environment variable loading (`.env`), `express.urlencoded({ extended: true })`, and `express.json()` in `server.js`.

## Project Structure
```text
.
├── controllers/
│   └── pageController.js
├── db/
│   └── schema.js
├── middlewares/
│   └── Authenticate.js
├── routes/
│   └── routes.js
├── views/
│   ├── index.html
│   └── loggin.html
├── dbaccess.js
├── server.js
└── .env