import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/files';

export const getProjectFiles = (projectId) => {
  return axios.get(`${BASE_URL}/project/${projectId}`);
};

export const uploadProjectFile = (projectId, file, documentType, documentDate, documentNumber) => {
  const formData = new FormData();
  formData.append("projectId", projectId);
  formData.append("documentType", documentType);
  formData.append("documentDate", documentDate);
  formData.append("documentNumber", documentNumber);
  formData.append("file", file);

  return axios.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteProjectFile = (fileId) => {
  return axios.delete(`${BASE_URL}/${fileId}`);
};

// filePath yerine fileId ile çalışmalı
export const downloadProjectFileUrl = (fileId) => {
  return `${BASE_URL}/download/${fileId}`;
};
