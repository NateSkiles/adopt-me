import axios from "axios";

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getCoordinates = async () => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  } catch (error) {
    return error;
  }
};

const fetchLocation = async () => {
  const API_KEY = import.meta.env.VITE_OPEN_CAGE_API_KEY;

  const cords = await getCoordinates().catch((error) => {
    if (error.code === 1) {
      return error;
    }
    return console.error("Error getting location: ", error);
  });

  if (!cords.latitude || !cords.longitude) return [];

  const { latitude, longitude } = cords;

  const res = await axios(
    `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&language=en&q=${latitude}+${longitude}`
  );

  if (res.status !== 200) {
    throw new Error(`location fetch not ok`);
  }

  return res;
};

export default fetchLocation;
