import axios from "axios";
import { API } from "../constants.js";

export const requestData = () => {
    return axios.get(`${API}?count=20`)
}
