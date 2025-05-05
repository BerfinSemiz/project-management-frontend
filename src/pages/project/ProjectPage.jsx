import React, { useEffect, useState } from 'react';
import {
  getAllProjects,
  getProjectsByProjectStage,
  getProjectsByJobType
} from '../../services/projectService';

import { Link } from 'react-router-dom';

// ENUM değerleri: Backend'deki ProjectStage ve JobType enum'larının karşılıkları
const PROJECT_STAGE_OPTIONS = [
  "IPTAL",
  "VERILDI_ONAY_BEKLIYOR",
  "TAMAMLANDI",
  "HAZIRLANDI_VERILMEDI",
  "HAZIRLANDI_EKSIK_VAR",
  "HAZIRLANACAK"
];

const JOB_TYPE_OPTIONS = [
  "GES_PROJESI",
  "GUC_ARTISI",
  "YENI_ABONELIK"
];

const ProjectPage = () => {
  const [projects, setProjects] = useState([]); // API'den gelen proje listesi
  const [selectedStage, setSelectedStage] = useState(''); // Seçilen durum filtresi
  const [selectedJobType, setSelectedJobType] = useState(''); // Seçilen iş tipi filtresi

  // Sayfa ilk yüklendiğinde tüm projeleri getir
  useEffect(() => {
    fetchAllProjects();
  }, []);

  // Tüm projeleri çek (varsayılan liste)
  const fetchAllProjects = () => {
    getAllProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error("Projeler alınamadı:", err));
  };

  // Duruma göre filtreleme yap
  const handleStageChange = (e) => {
    const value = e.target.value;
    setSelectedStage(value); // seçilen değeri Stage'e ata

    if (value === '') {
      // "Tümü" seçildiyse tekrar tüm projeleri getir
      fetchAllProjects();
    } else {
      getProjectsByProjectStage(value)
        .then(res => setProjects(res.data))
        .catch(err => console.error("Duruma göre veri alınamadı:", err));
    }
  };

  // İş tipine göre filtreleme yap
  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    setSelectedJobType(value); // seçilen iş tipini state'e ata

    if (value === '') {
      // "Tümü" seçildiyse tekrar tüm projeleri getir
      fetchAllProjects();
    } else {
      getProjectsByJobType(value)
        .then(res => setProjects(res.data))
        .catch(err => console.error("İş koluna göre veri alınamadı:", err));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Proje Listesi</h2>

      {/* Filtreleme Seçenekleri */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Duruma Göre Filtrele:</label>
          <select
            className="form-control"
            value={selectedStage}
            onChange={handleStageChange}
          >
            <option value="">Tümü</option>
            {PROJECT_STAGE_OPTIONS.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>İş Tipine Göre Filtrele:</label>
          <select
            className="form-control"
            value={selectedJobType}
            onChange={handleJobTypeChange}
          >
            <option value="">Tümü</option>
            {JOB_TYPE_OPTIONS.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <Link to="/projects/create" className="btn btn-primary">+ Yeni Proje</Link>
      </div>


      {/* Projeleri Listele */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Proje Adı</th>
            <th>İşin Sahibi</th>
            <th>Sorumlu</th>
            <th>Başlangıç Tarihi</th>
            <th>Durumu</th>
            <th>İş Tipi</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(proj => (
            <tr key={proj.id}>
              <td><Link to={`/projects/${proj.id}`}>{proj.name}</Link></td>
              <td>{proj.owner}</td>
              <td>{proj.responsible}</td>
              <td>{proj.startDate}</td>
              <td>{proj.projectStage}</td>
              <td>{proj.jobType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectPage;
