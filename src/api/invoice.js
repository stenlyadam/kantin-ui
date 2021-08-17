import axios from "axios";
import { config } from "../config";

export async function getInvoiceByOrderId(order_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${config.api_host}/api/invoices/${order_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function updateInvoice(payload, order_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.put(
    `${config.api_host}/api/invoices/${order_id}`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
