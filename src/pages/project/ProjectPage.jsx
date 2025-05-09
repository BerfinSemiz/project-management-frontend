import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllProjects,
  getProjectsByProjectStage,
  getProjectsByJobType
} from '../../services/projectService';
import ProjectStages from '../../constants/projectStages';
import JobTypes from '../../constants/jobTypes';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = () => {
    getAllProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error("Projeler alınamadı:", err));
  };

  const handleStageChange = (e) => {
    const value = e.target.value;
    setSelectedStage(value);
    if (value === '') {
      fetchAllProjects();
    } else {
      getProjectsByProjectStage(value)
        .then(res => setProjects(res.data))
        .catch(err => console.error("Duruma göre veri alınamadı:", err));
    }
  };

  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    setSelectedJobType(value);
    if (value === '') {
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

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Duruma Göre Filtrele:</label>
          <select className="form-control" value={selectedStage} onChange={handleStageChange}>
            <option value="">Tümü</option>
            {ProjectStages.map(stage => (
              <option key={stage.value} value={stage.value}>{stage.label}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>İş Tipine Göre Filtrele:</label>
          <select className="form-control" value={selectedJobType} onChange={handleJobTypeChange}>
            <option value="">Tümü</option>
            {JobTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <Link to="/projects/create" className="btn btn-primary">+ Yeni Proje</Link>
      </div>

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
          {projects.map(proj => {
            const stage = ProjectStages.find(p => p.value === proj.projectStage)?.label || proj.projectStage;
            const jobType = JobTypes.find(j => j.value === proj.jobType)?.label || proj.jobType;
            return (
              <tr key={proj.id}>
                <td><Link to={`/projects/${proj.id}`}>{proj.name}</Link></td>
                <td>{proj.owner}</td>
                <td>{proj.responsible}</td>
                <td>{proj.startDate}</td>
                <td>{stage}</td>
                <td>{jobType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectPage;
