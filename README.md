# Express Docs (In Progress)

A Node.js and Express web application backed by SQLite (`better-sqlite3`), currently focused on the landing page, login/registration page, database schema setup, registration flow, session-based authentication, and protected page cache control.

## Current Features
- **Landing Page (`GET /`)**: Serves `views/index.html` via `LandingPage` in `controllers/pageController.js`, protected by `RequireLogin` and guarded against browser page caching so logged-out users cannot view stale cached pages via the Back button.
- **Login & Registration Page (`GET /loggin`)**: Serves `views/loggin.html` with tabbed **Sign In** and **Register** forms styled with Tailwind CSS, using standard HTML form `POST` submissions.
- **Centralized Router (`routes/routes.js`)**: Defines routes using `express.Router()` and mounts them in `server.js` via `app.use(routes)` (or `app.use("/", routes)`).
- **SQLite Database & Schema (`dbaccess.js`, `db/schema.js`)**: Connects to SQLite via `better-sqlite3` (with WAL mode enabled) in `dbaccess.js`, and defines the `users` table (`id`, `username`, `email`, `password`, `created_at` with `UNIQUE` constraints on `username` and `email`).
- **Registration Flow (`POST /api/register`)**:
  1. `Checkuser` (`middlewares/Authenticate.js`) validates `username` and `email` in `req.body` and queries `users` (`WHERE username = ? OR email = ?`), returning `400` if missing or `409` JSON if already taken before calling `next()`.
  2. `NewUser` (`controllers/pageController.js`) inserts the new `username`, `email`, and `password` into `users` and redirects to `/loggin`.
- **Session Management & Auth Flow**:
  - **Session Middleware (`server.js`)**: Configures session handling (`express-session` with `SESSION_SECRET` from `.env`, cookie options such as `httpOnly` / `sameSite` / `maxAge`, and session storage via memory or SQLite store).
  - **Login & Session Creation (`POST /api/login`)**: Verifies user credentials against the `users` table, stores the authenticated user (`req.session.user`) on the session, and redirects to `/` (or back to `/loggin` on failure).
  - **Active Session User Endpoint (`GET /api/me`)**: Guarded by `RequireLogin` and handled by `GetUserSessionName` (`controllers/pageController.js`), returning `{ username }` as JSON so jQuery on `index.html` can dynamically populate the logged-in user in the header.
  - **Route Protection & Anti-Cache Guard (`middlewares/Authenticate.js`)**:
    - `RequireLogin` verifies an active session before allowing access to protected pages and endpoints.
    - Cache-prevention header (`Cache-Control: no-store, no-cache, must-revalidate, private`) on protected pages prevents browsers from serving cached authenticated views when clicking **Back** after logging out.
  - **Logout & Session Destruction (`POST /logout`)**: Handled by `Logout` in `controllers/pageController.js`, calling `req.session.destroy()` to end the server-side session and redirecting to `/loggin`.
- **Body Parsing & Environment Setup**: Configured environment variable loading (`.env`), `express.urlencoded({ extended: true })`, `express.json()`, and session middleware in `server.js`.

## Environment Variables (`.env`)
- `PORT`: Server port (if configured).
- `SESSION_SECRET`: Secret key used to sign session IDs.
- Add any database path or session store variables used in `dbaccess.js` / `server.js`.

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