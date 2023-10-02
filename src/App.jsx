import { createRoot } from "react-dom/client";
import Pet from "./Pet";

const App = () => {
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Huey" species="Cat" breed="Tux" />
    <Pet name="Dusty" species="Cat" breed="Ragdoll" />
    <Pet name="Haley" species="Dog" breed="German Shepard" />
  </div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
