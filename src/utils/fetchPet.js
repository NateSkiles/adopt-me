import client from "./petfinderClient";

const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const res = await client.animal.show(+id);

  if (res.status !== 200) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return res;
};

export default fetchPet;
