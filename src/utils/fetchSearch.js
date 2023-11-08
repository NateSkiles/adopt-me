// import client from "./petfinderClient";

async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  // const searchParams = {
  //   ...(breed && { breed }),
  //   ...(animal && { type: animal }),
  //   ...(location && { location }),
  // };

  // client.animal.search(searchParams).then((data) => console.log(data));

  const res = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok) {
    throw new Error(`Pet search not okay ${animal}, ${location}, ${breed}`);
  }

  return res.json();
}

export default fetchSearch;
