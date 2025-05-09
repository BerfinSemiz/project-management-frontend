import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/files';

export const getFilesByProjectId = (projectId) => {
  return axios.get(`${API_BASE}/project/${projectId}`);
};

export const uploadProjectFile = (formData) => {
  return axios.post(`${API_BASE}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProjectFile = (fileId) => {
  return axios.delete(`${API_BASE}/${fileId}`);
};

export const downloadProjectFileUrl = (fileId) => {
  return `${API_BASE}/download/${fileId}`;
};
