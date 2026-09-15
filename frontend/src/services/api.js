import axios from 'axios';

const API_BASE = '/api';

export const scanWebsite = async (url) => {
  const response = await axios.post(`${API_BASE}/scan`, { url });
  return response.data;
};

export const getScanHistory = async () => {
  const response = await axios.get(`${API_BASE}/scans`);
  return response.data;
};

export const getScanById = async (id) => {
  const response = await axios.get(`${API_BASE}/scans/${id}`);
  return response.data;
};

export const deleteScan = async (id) => {
  const response = await axios.delete(`${API_BASE}/scans/${id}`);
  return response.data;
};
