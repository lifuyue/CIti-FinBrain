# Repository Guidelines

## Project Structure & Module Organization
- `Software/Backend/`: Flask REST API; `run.py` app entry, `routers/` endpoints (user, stock, bond, goods, notification, etc.), `dao/` data access, `model/` SQLAlchemy models, `utils/` helpers, `publicdata/` sample data; SQLite file created at runtime (`testdb.db`).
- `Software/Web/`: React + TypeScript UI (MobX, Ant Design); `src/` components/stores/routes, `tests/` for Mocha/Enzyme specs, `deploy/` scripts for build/serve.
- Research docs and assets live in `Doc/`, `Reference/`, `Data/`, `Asset Allocation/`, `大类资产配置`, and `static/`; keep code and data separated.

## Build, Test, and Development Commands
- Backend: `cd Software/Backend && pip install -r requirements.txt`; `python run.py` starts the dev server on :5000 with Swagger at `/api`; adjust `config.py` for Citi sandbox keys before hitting live APIs.
- Frontend: `cd Software/Web && npm install`; `npm start` for the dev server with HMR; `npm run build` for a production bundle and `npm run serveProd` to preview `dist/`; `npm run lint` applies TSLint fixes; `npm test` runs Mocha specs (`src/**/*.spec.ts*`).
- Utility: `restart.sh` is available if you need to reset local services or processes (review the script before use).

## Coding Style & Naming Conventions
- Backend follows PEP 8 with 4-space indents; avoid pinyin identifiers. Per `开发要求.md`: camelCase for API fields, PascalCase for classes, snake_case for functions/locals. Prefer type hints and UTC timestamps (`datetime.utcnow()`); keep comments concise (Chinese is acceptable).
- Frontend uses TypeScript with `tslint:recommended` + `tslint-react`; rely on `npm run lint` for formatting hints. Prefer typed props/state, functional components when practical, and existing styled-components/Ant Design patterns in `src/`.

## Testing Guidelines
- Frontend: place component/store tests next to code as `*.spec.tsx`/`*.spec.ts`; use Enzyme for rendering and Chai for assertions. Run `npm test` before pushing.
- Backend: automated tests are minimal—add Flask test-client cases under `Software/Backend/test/` using `unittest` or `pytest`, mocking Citi API calls and DB writes. Aim to cover routers, DAO functions, and auth helpers.

## Commit & Pull Request Guidelines
- Write concise, imperative commit subjects (`Add stock quotation endpoint`, `Fix login token refresh`); keep changes scoped.
- PRs should describe motivation, approach, and verification; link related issues/tasks; include curl/Postman examples for new APIs and screenshots/GIFs for UI changes.
- Ensure `npm test`, `npm run lint`, and a manual API smoke test on `python run.py` succeed before requesting review.

## Security & Configuration Tips
- Never commit real Citi credentials or tokens; store overrides via environment variables or a local, untracked config file and rotate any exposed keys immediately.
- SQLite files (`testdb.db`) and other generated artifacts should stay untracked; verify `.gitignore` before committing.
