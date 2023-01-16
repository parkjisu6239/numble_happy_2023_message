import NewPage from "pages/NewPage";

interface Props {
  target: HTMLDivElement;
}
class App {
  newPage: NewPage;
  constructor({ target }: Props) {
    this.newPage = new NewPage({ target });
  }
}

export default App;
