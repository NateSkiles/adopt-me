import client from "./petfinderClient";

async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const searchParams = {
    ...(breed && { breed }),
    ...(animal && { type: animal }),
    ...(location && { location }),
  };

  const res = await client.animal.search(searchParams);

  if (res.status !== 200) {
    throw new Error(`Pet search not okay ${animal}, ${location}, ${breed}`);
  }

  return res;
}

export default fetchSearch;
