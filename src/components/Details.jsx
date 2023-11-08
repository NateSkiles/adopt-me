import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../utils/AdpotedPetContext";
import fetchPet from "../utils/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "../ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // using _ as we don't need to read the value from context, just set it
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">⏳</h2>
      </div>
    );
  }

  const pet = results.data.data.animal;

  const images = pet.photos.map((photo) => photo.full);

  console.log(pet);

  return (
    <div className="details">
      <Carousel images={images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          <span>
            {pet.species} - {pet.breeds.primary}{" "}
            {pet.colors.primary && <span>- {pet.colors.primary}</span>}
          </span>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>
            Description:{" "}
            <span dangerouslySetInnerHTML={{ __html: pet.description }} /> Find
            out more <a href={pet.url}>here!</a>
          </p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
