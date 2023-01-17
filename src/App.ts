import NewPage from "pages/NewPage";
import MainPage from "pages/MainPage";
import { Router, navigate } from "./router";

interface Props {
  target: HTMLDivElement;
}
class App {
  constructor({ target }: Props) {
    new Router(target);

    this.replaceAnchor(target);
  }

  replaceAnchor = (target: HTMLDivElement) => {
    target.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const aTag = target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();
      navigate({ to: target.href });
    });
  };
}

export default App;
