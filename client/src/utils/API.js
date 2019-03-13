import axios from "axios";
const PLANTURL = "https://trefle.io/";
const PLANTAPIKEY = "token=WGEzWlEvMDFpOGlCQ3haODB1MC81UT09";

export default {
  // Goes to Trefle to find a selection of plants and individual plant information.
  searchPlants: query => axios.get(PLANTURL + "api/plants?" + PLANTAPIKEY + query),
  searchPlant: id => axios.get(PLANTURL + "api/plants/" + id + "?" + PLANTAPIKEY),

  homeTest: () => axios.get("/api/home"),
  loginTest: userData => axios.post("/api/authenticate", userData),
  registerTest: userData => axios.post("/api/register", userData),
  secretTest: () => axios.get("/api/secret"),
  checkToken: () => axios.get("/checkToken")
}