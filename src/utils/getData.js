// const API = "https://randomuser.me/api/";
const API = process.env.API; // De esta manera protegemos nuestro código

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log("Fetch Error", error);
  }
};

export default getData;
