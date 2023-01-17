import type { RouteInfo, EventWithRouteInfo } from "src/types";
import MainPage from "pages/MainPage";
import NewPage from "pages/NewPage";
import NotFoundPage from "pages/NotFoundPage";

const routes = [
  { path: /^\/$/, view: MainPage },
  { path: /^\/new$/, view: NewPage },
  // { path: /^\/post\/[\w]+$/, view: () => console.log("Viewing Posts") },
];

export const navigate = ({ to, isReplace = false }: RouteInfo) => {
  const historyChangeEvent = new CustomEvent("historychange", {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};

export class Router {
  $container: HTMLDivElement;

  constructor($container: HTMLDivElement) {
    this.$container = $container;
    window.addEventListener(
      "historychange",
      ({ detail }: EventWithRouteInfo) => {
        const { to, isReplace } = detail;

        if (isReplace || to === location.pathname) {
          history.replaceState(null, "", to);
        } else {
          history.pushState(null, "", to);
        }

        this.route();
      }
    );

    window.addEventListener("popstate", () => {
      this.route();
    });

    document.addEventListener("DOMContentLoaded", () => {
      this.route();
    });
  }

  findMatchedRoute = () =>
    routes.find((route) => route.path.test(location.pathname));

  route = () => {
    const TargetPage = this.findMatchedRoute()?.view || NotFoundPage;
    new TargetPage({ target: this.$container });
  };
}
