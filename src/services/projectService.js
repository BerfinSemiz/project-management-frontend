import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/projects';

// Tüm projeleri getir
export const getAllProjects = () => {
  return axios.get(BASE_URL);
};

// ID ile proje getir
export const getProjectById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

// Yeni proje oluştur
export const createProject = (project) => {
  return axios.post(BASE_URL, project);
};

// Projeyi güncelle
export const updateProject = (id, project) => {
  return axios.put(`${BASE_URL}/${id}`, project);
};

// Projeyi sil
export const deleteProject = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

// Proje adına göre arama (ignore case)
export const searchProjectsByName = (name) => {
  return axios.get(`${BASE_URL}/search?name=${name}`);
};

// İşin sahibine göre projeler
export const getProjectsByOwner = (owner) => {
  return axios.get(`${BASE_URL}/owner?owner=${owner}`);
};

// Sorumlu kişiye göre projeler
export const getProjectsByResponsible = (responsible) => {
  return axios.get(`${BASE_URL}/responsible?responsible=${responsible}`);
};

// Proje durumuna göre filtreleme (ENUM)
export const getProjectsByProjectStage = (projectStage) => {
  return axios.get(`${BASE_URL}/projectStage?projectStage=${projectStage}`);
};

// İş koluna göre filtreleme (ENUM)
export const getProjectsByJobType = (jobType) => {
  return axios.get(`${BASE_URL}/jobType?jobType=${jobType}`);
};
