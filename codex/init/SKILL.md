---
name: legacy-react-mobx-frontend-boot
description: Bring up an old React 16 + MobX 5 frontend with broken lockfiles and missing API backend by pinning deps, patching webpack, and wiring API URLs/ports.
---

# Legacy React/MobX Frontend Boot

## Instructions
- Use modern npm against the official registry; ignore/remove stale package-lock files with taobao URLs (`--no-package-lock`, delete `node_modules` first).
- Install with legacy peer tolerance: `npm install --registry=https://registry.npmjs.org --legacy-peer-deps --no-package-lock`.
- Fix MobX `$mobx` undefined by injecting the symbol in webpack:
  - Add `new webpack.ProvidePlugin({ $mobx: ['mobx', '$mobx'] })` to plugins.
- Align dev API endpoint with the running backend; update DefinePlugin in `webpack.config.js` (e.g., `APIROOTURL: "http://localhost:5001/api/"`) and restart dev server.
- For macOS fsevents errors, force polling/disable chokidar when starting dev server:
  - `WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 WATCHPACK_DISABLE_CHOKIDAR=true BROWSER=none PORT=3000 HOST=0.0.0.0 npm start`.
- If port 5000 is occupied, run backend on 5001 and point frontend there.
- Use mirrors for Python deps when timeouts occur: `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`.
- Downgrade Flask stack for `flask-restplus`: `Flask<2`, `Werkzeug<1`, `Flask-SQLAlchemy<3`, `SQLAlchemy<2`, `MarkupSafe<2`.

## Examples
- Clean install:  
  `rm -rf node_modules && npm install --registry=https://registry.npmjs.org --legacy-peer-deps --no-package-lock`
- Start frontend with polling:  
  `WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 WATCHPACK_DISABLE_CHOKIDAR=true BROWSER=none PORT=3000 HOST=0.0.0.0 npm start`
- Inject `$mobx` (webpack):  
  ```js
  new webpack.ProvidePlugin({ $mobx: ['mobx', '$mobx'] });
  ```
- Backend install with mirror:  
  `source .venv/bin/activate && pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`

## Guidelines
- Prefer official npm registry; treat old lockfiles as untrusted.
- Keep frontend/backend ports explicit; document current API root after changes.
- When mixing old Flask/RESTPlus, pin versions to the pre-2.x stack to avoid import errors.
- For macOS dev servers, assume fsevents issues and start with polling flags to avoid crashes.
- Verify `$mobx` availability via `ProvidePlugin`; rebuild after webpack changes.
- Keep virtualenvs and node_modules out of git; ignore generated logs.***
