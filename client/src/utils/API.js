import axios from "axios";
const PLANTURL = "https://trefle.io/";
const PLANTAPIKEY = "token=WGEzWlEvMDFpOGlCQ3haODB1MC81UT09";

export default {
  searchPlants: query => axios.get(PLANTURL + "api/plants?" + PLANTAPIKEY + query),
  searchPlant: id => axios.get(PLANTURL + "api/plants/" + id + "?" + PLANTAPIKEY)
}