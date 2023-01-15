import "./index.css";
import New from "./pages/New";

function component() {
  console.log("hi");

  const element = document.createElement("div");

  element.innerHTML = New();

  return element;
}

document.body.appendChild(component());
