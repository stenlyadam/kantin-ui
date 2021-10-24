import axios from "axios";

import { config } from "../config";

export async function getAllEmployees(params) {
  return await axios.get(`${config.api_host}/api/unklab-employees`, {
    params,
  });
}
