import axios from "axios";

export default {
  // Goes to Trefle to find a selection of plants to return to the user.
  searchPlants: query => axios.post("/api/plants/search", query),

  // Manually adds a plant to the database.
  plantAdd: query => axios.post("/api/plants/", query),

  // Pulls the entire plant database.
  getPlants: query => axios.get("/api/plants"),

  // Allows users to view, add, or remove favorite plants.
  viewFavorites: userId => axios.get("/api/user/" + userId),
  checkFavorites: userId => axios.get("/api/user/" + userId + "/check/favorites"),
  addFavorite: (userId, plantId) => axios.post("/api/user/" + userId, {plant_id: plantId}),
  removeFavorite: (userId, plantId) => axios.delete("/api/user/" + userId + "/" + plantId),

  // User management functions
  register: userData => axios.post("/api/register", userData),
  login: userData => axios.post("/api/authenticate", userData),
  verify: () => axios.get("/api/verify"),
  logout: () => axios.get("/api/logout"),
  updatePassword: userData => axios.post("/api/password", userData),

  // User preferences
  setPreferences: (userId, userData) => axios.post("/api/user/" + userId + "/preferences", userData),
  getPreferences: userId => axios.get("/api/user/" + userId + "/preferences"),

  // Allows users to view, add, or remove banned plants.
  viewBanned: userId => axios.get("/api/user/" + userId + "/banned/"),
  checkBanned: userId => axios.get("/api/user/" + userId + "/check/banned"),
  addBanned: (userId, plantId) => axios.post("/api/user/" + userId + "/banned", {plant_id: plantId}),
  removeBanned: (userId, plantId) => axios.delete("/api/user/" + userId + "/banned/" + plantId)
}