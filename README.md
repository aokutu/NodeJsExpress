# Express Docs (In Progress)

A Node.js and Express web application backed by SQLite (`better-sqlite3`), currently focused on the landing page, login/registration page, database schema setup, password hashing (`bcrypt`), registration flow, session-based authentication, protected page cache control, a jQuery SPA/PWA shell, and file uploads via `multer`.

## Current Features
- **Landing Page (`GET /`)**: Serves `views/index.html` via `LandingPage` in `controllers/pageController.js`, protected by `RequireLogin` and guarded against browser page caching so logged-out users cannot view stale cached pages via the Back button, with jQuery view switching (`pushState` / `popstate`), inline PWA manifest/Service Worker, and `/upload` excluded from SPA/Service Worker interception.
- **File Upload (`POST /upload`)**: Configured in `routes/routes.js` using `multer.diskStorage` with `destination: "./uploads/"` and a custom `filename` callback (`cb(null, ...)`), handled by `uploadFile` in `controllers/pageController.js` via a standard HTML form `POST` (`enctype="multipart/form-data"`) and full page reload.
- **Login & Registration Page (`GET /loggin`)**: Serves `views/loggin.html` with tabbed **Sign In** and **Register** forms styled with Tailwind CSS, using standard HTML form `POST` submissions.
- **Centralized Router (`routes/routes.js`)**: Defines routes using `express.Router()` and mounts them in `server.js` via `app.use(routes)` (or `app.use("/", routes)`).
- **SQLite Database & Schema (`dbaccess.js`, `db/schema.js`)**: Connects to SQLite via `better-sqlite3` (with WAL mode enabled) in `dbaccess.js`, and defines the `users` table (`id`, `username`, `email`, `password` stored as a `bcrypt` hash, `created_at` with `UNIQUE` constraints on `username` and `email`).
- **Password Hashing & Asynchronous Execution (`bcrypt`)**:
  - Uses `await bcrypt.hash(password, 10)` in `NewUser` during registration to generate a fresh salt and hash passwords asynchronously without blocking Node's main event loop.
  - Uses `await bcrypt.compare(password, user.password)` in `AuthenticateLoggin` during login to extract the embedded salt from the stored hash and verify credentials without hashing raw login inputs into SQL queries or stalling other incoming requests.
- **Registration Flow (`POST /api/register`)**:
  1. `Checkuser` (`middlewares/Authenticate.js`) validates `username` and `email` in `req.body` and queries `users` (`WHERE username = ? OR email = ?`), returning `400` if missing or `409` JSON if already taken before calling `next()` (or redirecting to `/loggin` when configured for form redirects).
  2. `NewUser` (`controllers/pageController.js`) hashes `req.body.password` with `await bcrypt.hash(password, 10)`, inserts `username`, `email`, and the hashed password into `users`, and redirects to `/loggin`.
- **Session Management & Auth Flow**:
  - **Session Middleware (`server.js`)**: Configures session handling (`express-session` with `SESSION_SECRET` from `.env`, cookie options such as `httpOnly` / `sameSite` / `maxAge`, and session storage via memory or SQLite store).
  - **Login & Session Creation (`POST /api/login`)**: Handled by `AuthenticateLoggin` (`controllers/pageController.js`), looking up the user by `email`, verifying the password with `await bcrypt.compare(password, user.password)`, using early-exit `return` statements on every branch to prevent zombie code or double-header errors, setting `req.session.user = user.username` on match, and redirecting to `/` (or `/loggin` on failure).
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
├── uploads/
├── views/
│   ├── index.html
│   └── loggin.html
├── dbaccess.js
├── server.js
└── .env