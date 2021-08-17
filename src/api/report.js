import axios from "axios";
import { config } from "../config";

export async function getMonthlyIncome(params) {
  return await axios.get(`${config.api_host}/api/monthly-income/`, {
    params,
  });
}

export async function getWeeklyIncome(params) {
  return await axios.get(`${config.api_host}/api/weekly-income/`, {
    params,
  });
}

export async function getDailyIncome(params) {
  return await axios.get(`${config.api_host}/api/daily-income/`, {
    params,
  });
}

export async function getCustomerReport(params) {
  return await axios.get(`${config.api_host}/api/customer-report/`, {
    params,
  });
}
