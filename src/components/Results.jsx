import Pet from "./Pet";

const Results = ({ pets, searchResults }) => {
  const { isLoading } = searchResults || false;
  console.log(isLoading);
  return (
    <div className="search">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : !pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.species}
            id={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            heroImg={pet.primary_photo_cropped}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
