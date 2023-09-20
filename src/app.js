const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.species),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Huey",
      species: "Cat",
      breed: "Tuxedo",
    }),
    React.createElement(Pet, {
      name: "Dusty",
      species: "Cat",
      breed: "Ragdoll",
    }),
    React.createElement(Pet, {
      name: "Haley",
      species: "Dog",
      breed: "German Shepard",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(React.createElement(App));
