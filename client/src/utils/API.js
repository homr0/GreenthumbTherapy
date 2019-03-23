import axios from "axios";

export default {
  // Goes to Trefle to find a selection of plants to return to the user.
  searchPlants: query => axios.post("/api/plants/search", query),

  // Manually adds a plant to the database.
  plantAdd: query => axios.post("/api/plants/", query),

  // Allows users to view, add, or remove favorite plants.
  viewFavorites: userId => axios.get("/api/user/" + userId),
  addFavorite: (userId, plantId) => axios.post("/api/user/" + userId, {plant_id: plantId}),
  removeFavorite: (userId, plantId) => axios.delete("/api/user/" + userId + "/" + plantId),

  // User-related functions
  register: userData => axios.post("/api/register", userData),
  login: userData => axios.post("/api/authenticate", userData),
  verify: () => axios.get("/api/verify"),
  logout: () => axios.get("/api/logout")
}