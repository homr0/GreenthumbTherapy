import axios from "axios";
const PROXYURL = "https://cors-anywhere.herokuapp.com/"
const PLANTURL = "https://trefle.io/";
const PLANTAPIKEY = "WGEzWlEvMDFpOGlCQ3haODB1MC81UT09";

export default {
  // Goes to Trefle to find a selection of plants and individual plant information.
  searchPlants: query => {
    // query.token = PLANTAPIKEY;
    // return axios.get(PROXYURL + PLANTURL + "api/plants", {params: query});
    return axios.post("/api/plants/search", query);
  },
  searchPlant: id => axios.get(PROXYURL + PLANTURL + "api/plants/" + id + "?" + PLANTAPIKEY),

  plantAddTest: query => axios.post("/api/plants/", query),

  homeTest: () => axios.get("/api/home"),
  loginTest: userData => axios.post("/api/authenticate", userData),
  registerTest: userData => axios.post("/api/register", userData),
  secretTest: () => axios.get("/api/secret"),
  checkToken: () => axios.get("/checkToken")
}