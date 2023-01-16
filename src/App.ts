import NewPage from "pages/NewPage";
import MainPage from "pages/MainPage";

interface Props {
  target: HTMLDivElement;
}
class App {
  newPage: NewPage;
  mainPage: MainPage;
  constructor({ target }: Props) {
    // this.newPage = new NewPage({ target });
    this.mainPage = new MainPage({ target });
  }
}

export default App;
