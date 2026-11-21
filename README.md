# Express Docs (In Progress)

A Node.js and Express web app in early development, currently focused on the landing page, login/registration page, and authentication middleware flow.

## Current Features
- **Landing Page (`GET /`)**: Serves `views/index.html` via `LandingPage` in `controllers/pageController.js`.
- **Login & Registration Page (`GET /loggin`)**: Serves `views/loggin.html` with tabbed **Sign In** and **Register** forms styled with Tailwind CSS, using standard HTML form `POST` submissions.
- **Centralized Router (`routes/routes.js`)**: Defines routes using `express.Router()` and mounts them in `server.js` via `app.use(routes)` (or `app.use("/", routes)`).
- **Registration Flow (`POST /api/register`)**: Passes requests through `Checkuser` middleware (`middlewares/Authenticate.js`) before running `NewUser` (`controllers/pageController.js`), which currently redirects back to `/`.
- **Body Parsing & Environment Setup**: Configured `dotenv`, `express.urlencoded({ extended: true })`, and `express.json()` in `server.js`, alongside a `./dbaccess` module.

## Project Structure
```text
.
├── controllers/
│   └── pageController.js
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