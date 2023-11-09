import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import AdoptedPetContext from "../utils/AdpotedPetContext";
import Results from "./Results";
import useBreedList from "../utils/useBreedList";
import useAnimalTypeList from "../utils/useAnimalTypeList";
import fetchSearch from "../utils/fetchSearch";
import fetchLocation from "../utils/fetchLocation";

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasLocationFetched, setHasLocationFetched] = useState(false);
  const [animalTypes] = useAnimalTypeList();
  const [breeds] = useBreedList(animal);
  const locationData = useQuery(["location"], fetchLocation, {
    enabled: !hasLocationFetched,
  });
  const searchResults = useQuery(["search", requestParams], fetchSearch, {
    enabled: !isInputFocused && hasLocationFetched, // Only enable the query when the input is not focused
  });
  const pets = searchResults?.data?.data?.animals ?? [];

  console.log(searchResults);

  // Check if locationData is available and set the location state
  useEffect(() => {
    if (!hasLocationFetched) {
      const data = locationData.data?.data?.results[0].components;
      if (data) {
        const local = `${data.city}, ${data.state}`;
        setRequestParams((prevParams) => ({
          ...prevParams,
          location: local, // Assuming locationData contains the user's location
        }));
      }

      if (locationData.isFetched) {
        setHasLocationFetched(true);
      }
    }
  }, [locationData, hasLocationFetched]);

  const handleChange = (value) => {
    setRequestParams((prevParams) => ({
      ...prevParams,
      location: value,
    }));
  };

  const debouncedHandleChange = debounce(handleChange, 300);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            placeholder="Location"
            value={requestParams.location}
            onChange={(e) =>
              setRequestParams({ ...requestParams, location: e.target.value })
            }
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => {
              setIsInputFocused(false);
              debouncedHandleChange.flush();
            }}
          />
        </label>

        <label htmlFor="animal">
          Animal Type
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {animalTypes.map((animal) => (
              <option key={animal.name} value={animal.name}>
                {animal.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed.name} value={breed.name}>
                {breed.name}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} searchResults={searchResults} />
    </div>
  );
};

export default SearchParams;
