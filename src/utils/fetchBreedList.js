import client from "./petfinderClient";

const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return [];

  const apiRes = await client.animalData.breeds(animal);

  if (apiRes.status !== 200) {
    throw new Error(`details/${animal} fetch not ok`);
  }

  console.log(apiRes);

  return apiRes;
};

export default fetchBreedList;
