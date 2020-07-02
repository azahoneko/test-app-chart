import axios from "axios";
import { API } from "../constants.js";


class DataService {
    getData() {
        return axios.get(`${API}?count=20`)
    }
}

export default new DataService();