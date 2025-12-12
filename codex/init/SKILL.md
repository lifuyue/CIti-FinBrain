---
name: legacy-react-mobx-frontend-boot
description: Bring up an old React 16 + MobX 5 frontend with broken lockfiles and missing API backend by pinning deps, patching webpack, and wiring API URLs/ports.
---

# Legacy React/MobX Frontend Boot

This repo is a legacy stack (React 16 / MobX 5 / webpack 4 + Flask-RESTPlus). Modern toolchains can run it, but require a few pins and flags.

## Prerequisites

### Frontend
- Node.js **14–16 recommended** (best compatibility with webpack 4).
- If you must use Node 17+ (OpenSSL 3), start with legacy OpenSSL mode (see below).
- npm is assumed (scripts use `webpack-dev-server`); avoid yarn/pnpm unless you adapt scripts yourself.

### Backend
- Python **3.7–3.10** (project requires `<3.11`).
- `uv` installed and on PATH (`uv --version`).
- If your machine lacks a compatible Python, let uv install one:
  - `cd Software/Backend`
  - `uv python install 3.9`
  - `uv python pin 3.9`

## Frontend setup (`Software/Web`)

1. Clean stale deps / lockfile (old lockfiles may reference taobao mirrors):
   - `rm -rf node_modules package-lock.json`
2. Install deps against the official registry with legacy peer tolerance:
   - `npm install --registry=https://registry.npmjs.org --legacy-peer-deps --no-package-lock`
   - If npmjs.org is slow (mainland China), try:
     - `npm install --registry=https://registry.npmmirror.com --legacy-peer-deps --no-package-lock`
3. Start dev server:
   - Node 14–16: `npm start`
   - Node 17+: `BROWSER=none NODE_OPTIONS=--openssl-legacy-provider npm start`
4. If file watching crashes on macOS (fsevents/chokidar):
   - `WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 WATCHPACK_DISABLE_CHOKIDAR=true BROWSER=none PORT=3000 HOST=0.0.0.0 NODE_OPTIONS=--openssl-legacy-provider npm start`

Dev URL: `http://localhost:3000/`. If port 3000 is taken, set `PORT=3001`.

API alignment:
- `webpack.config.js` dev `APIROOTURL` defaults to `"http://localhost:5001/api/"`.
- If your backend runs on 5000, change it to `"http://localhost:5000/api/"` and restart `npm start`.

Common frontend errors:
- `ERR_OSSL_EVP_UNSUPPORTED` / “digital envelope routines” -> use Node 14/16 or add `NODE_OPTIONS=--openssl-legacy-provider`.
- `fsevents` install failures -> optional dependency; ignore or run with polling flags above.
- `$mobx` undefined at runtime -> ensure ProvidePlugin exists:
  ```js
  new webpack.ProvidePlugin({ $mobx: ['mobx', '$mobx'] });
  ```

## Backend setup (`Software/Backend`, uv)

1. Sync environment:
   - `cd Software/Backend`
   - `uv sync`
2. Start server:
   - `uv run python run.py`
3. Swagger URL: `http://localhost:5000/api`.

Mirrors:
- If PyPI is slow, use TUNA mirror:
  - `uv sync --default-index https://pypi.tuna.tsinghua.edu.cn/simple`

Platform notes:
- macOS Apple Silicon (arm64):
  - Uses `tensorflow-macos` automatically via dependency markers.
  - Install Xcode Command Line Tools for compiled packages: `xcode-select --install`.
- macOS Intel / Linux x86_64:
  - Uses `tensorflow` wheels. If uv cannot resolve wheels for your Python, pin Python to 3.9/3.10 via `uv python pin`.
- Windows:
  - Prefer WSL2 for least friction.
  - Native Windows may require “Microsoft C++ Build Tools” for packages like `cvxopt`.

Common backend errors:
- `flask-restplus` import/runtime issues -> keep legacy pins in `pyproject.toml` (`Flask<2`, `Werkzeug<1`, `Flask-SQLAlchemy<3`, `SQLAlchemy<2`, `MarkupSafe<2`).
- TensorFlow / NumPy ABI errors (`_ARRAY_API not found`, “compiled against NumPy 1.x”) -> ensure `numpy<2` (already pinned).

## Quick smoke checks
- Backend: open `http://localhost:5000/api` or run `curl http://localhost:5000/api/`.
- Frontend: open `http://localhost:3000/` and verify network requests hit your configured `APIROOTURL`.

## Examples
- Clean frontend install:  
  `cd Software/Web && rm -rf node_modules package-lock.json && npm install --registry=https://registry.npmjs.org --legacy-peer-deps --no-package-lock`
- Start frontend (Node 17+):  
  `cd Software/Web && BROWSER=none NODE_OPTIONS=--openssl-legacy-provider npm start`
- Start frontend with polling (macOS):  
  `cd Software/Web && WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 WATCHPACK_DISABLE_CHOKIDAR=true BROWSER=none PORT=3000 HOST=0.0.0.0 NODE_OPTIONS=--openssl-legacy-provider npm start`
- Backend install with mirror:  
  `cd Software/Backend && uv sync --default-index https://pypi.tuna.tsinghua.edu.cn/simple`

## Guidelines
- Prefer official npm registry; treat old lockfiles as untrusted.
- Keep frontend/backend ports explicit; document current API root after changes.
- When mixing old Flask/RESTPlus, keep pins to pre-2.x stack.
- For macOS dev servers, assume fsevents issues and start with polling flags if needed.
- Keep virtualenvs, `.uv-cache`, and `node_modules` out of git; ignore generated logs.
