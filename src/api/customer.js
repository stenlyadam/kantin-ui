import axios from "axios";

import { config } from "../config";

export async function getCustomers(params) {
  return await axios.get(`${config.api_host}/api/customers`, {
    params,
  });
}

export async function getCustomersId(customer_id) {
  return await axios.get(`${config.api_host}/api/customers/${customer_id}`);
}

export async function createCustomer(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(config.api_host + "/api/customers", payload, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function updateCustomer(payload, customer_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.put(
    `${config.api_host}/api/customers/${customer_id}`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export async function deleteCustomer(customer_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.delete(`${config.api_host}/api/customers/${customer_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
