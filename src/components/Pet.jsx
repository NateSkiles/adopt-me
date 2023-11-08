import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, heroImg, id }) => {
  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";

  if (heroImg) {
    hero = heroImg.small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>

      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
