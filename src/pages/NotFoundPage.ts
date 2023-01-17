interface Props {
  target: HTMLDivElement;
}

class NotFoundPage {
  target: HTMLDivElement;

  constructor({ target }: Props) {
    this.target = target;
    this.addEventListener();
    this.render();
  }

  addEventListener = () => {};

  render() {
    /*html*/
    this.target.innerHTML = `
    <article>
      404 Not Found
    </article>
    `;
  }
}

export default NotFoundPage;
