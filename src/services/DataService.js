import axios from "axios";
import { API_URL } from "../config";

export const requestData = () => {
    return axios.get(`${API_URL}?count=20`)
}
