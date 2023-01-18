interface Props {
  target: HTMLDivElement;
}

class NotFoundPage {
  props: Props;

  constructor(props: Props) {
    this.props = props;
    this.addEventListener();
    this.render();
  }

  addEventListener = () => {};

  render() {
    /*html*/
    this.props.target.innerHTML = `
    <article>
      404 Not Found
    </article>
    `;
  }
}

export default NotFoundPage;
