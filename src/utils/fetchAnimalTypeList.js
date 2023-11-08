import client from "./petfinderClient";

const fetchAnimalTypeList = async () => {
  const apiRes = await client.animalData.types();

  if (apiRes.status !== 200) {
    throw new Error(`animal type fetch not ok`);
  }

  return apiRes;
};

export default fetchAnimalTypeList;
