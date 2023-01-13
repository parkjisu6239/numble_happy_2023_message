import "./index.css";

function component() {
  console.log("hi");

  const element = document.createElement("div");

  element.innerHTML = "Hello webpack";

  return element;
}

document.body.appendChild(component());
