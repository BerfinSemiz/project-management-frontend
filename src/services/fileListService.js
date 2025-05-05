import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/projects';

export const getProjectFiles = (projectId) => {
  return axios.get(`${BASE_URL}/${projectId}/files`);
};

export const uploadProjectFile = (projectId, file, documentType, documentDate, documentNumber) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType); 
  formData.append('documentDate', documentDate);
  formData.append('documentNumber', documentNumber);

  return axios.post(`${BASE_URL}/${projectId}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteProjectFile = (fileId) => {
  return axios.delete(`http://localhost:8080/api/project-files/${fileId}`);
};

export const downloadProjectFileUrl = (filePath) => {
  return `http://localhost:8080/${filePath}`;
};