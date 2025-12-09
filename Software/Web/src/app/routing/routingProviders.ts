import { RouterStore } from "./RouterStore";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default [
  {provide: RouterStore, useValue: new RouterStore(history) },
];
