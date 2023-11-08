import client from "./petfinderClient";

const fetchAnimalTypeList = async () => {
  const apiRes = await client.animalData.types();

  if (!apiRes.ok) {
    throw new Error(`animal type fetch not ok`);
  }

  return apiRes.json();
};

export default fetchAnimalTypeList;
