import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const createAccount = async (accountData) => {
  const response = await api.post("/accounts", accountData);
  return response.data.account;
};

export const getAccountByNumber = async (accountNumber) => {
  const response = await api.get(`/accounts/${accountNumber}`);
  return response.data.account;
};

export const getAllAccounts = async () => {
  const response = await api.get("/accounts");
  return response.data.accounts;
};

export const depositToAccount = async (accountNumber, amount) => {
  const response = await api.post(`/accounts/${accountNumber}/deposit`, {
    amount,
  });
  return response.data.account;
};

export const withdrawFromAccount = async (accountNumber, amount) => {
  const response = await api.post(`/accounts/${accountNumber}/withdraw`, {
    amount,
  });
  return response.data.account;
};

export default API_BASE_URL;
