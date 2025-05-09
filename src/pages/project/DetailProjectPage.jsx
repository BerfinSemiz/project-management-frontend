import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../../services/projectService';
import JobTypes from '../../constants/jobTypes';
import ProjectStages from '../../constants/projectStages';

const DetailProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectById(id)
      .then(res => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Proje detayı alınamadı:", err);
        setLoading(false);
      });

  }, [id]);

  useEffect(() => {
    return () => {
      document.title = 'GRUNTECH SOLAR - Proje Detayı';
    };
  }, []);
  

  
  if (loading) return <div>Yükleniyor...</div>;
  if (!project) return <div>Proje bulunamadı.</div>;

  const jobTypeLabel = JobTypes.find(j => j.value === project.jobType)?.label || project.jobType;
  const projectStageLabel = ProjectStages.find(s => s.value === project.status)?.label || project.status;

  const renderTable = (title, rows) => (
    <div className="card mb-4 shadow-sm">
      <div className="card-header fw-bold bg-light">{title}</div>
      <div className="card-body p-0">
        <table className="table table-sm table-striped mb-0">
          <tbody>
            {rows.map(([label, value], idx) => (
              <tr key={idx}>
                <th className="w-25 text-nowrap text-secondary small">{label}</th>
                <td>{value || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 d-print-none">
        
        <div className="mt-2 mt-md-0 ms-md-auto">
          <button onClick={() => window.print()} className="btn btn-outline-secondary btn-sm me-2">
            Yazdır
          </button>
          <Link to={`/projects/${project.id}/files`} className="btn btn-info btn-sm me-2">
            Belgeleri Görüntüle
          </Link>
          <Link to={`/projects/edit/${project.id}`} className="btn btn-warning btn-sm">
            Güncelle
          </Link>
        </div>
      </div>
      <h2>{project.name}</h2>     
      {renderTable("Genel Bilgiler", [
        ["İşin Sahibi", project.owner],
        ["Sorumlu", project.responsible]
      ])}

      {renderTable("İş Tanımı", [
        ["İş Tipi", jobTypeLabel],
        ["Kapsam", project.scope],
        ["Mahiyet", project.description],
        ["Genel Notlar", project.generalNotes]
      ])}

      {renderTable("Yer Bilgisi", [
        ["Yer Sahibi", project.locationOwner],
        ["Adres", project.address],
        ["Ada / Parsel", project.parcel]
      ])}

      {renderTable("Ekipman Bilgisi", [
        ["PV Panel Tipi", project.panelType],
        ["Panel Adedi", project.panelCount],
        ["İnverter", project.inverter],
        ["İnverter Seri No", project.inverterSerial]
      ])}

      {renderTable("Zaman Bilgisi", [
        ["Başlangıç Tarihi", project.startDate],
        ["Bitiş Tarihi", project.endDate]
      ])}

      {renderTable("Süreç ve Durumlar", [
        ["Durum", projectStageLabel],
        ["Çağrı Mektubu", project.callLetterStatus],
        ["Proje Onayı", project.approvalStatus || '-'],
        ["Bağlantı Anlaşması", project.connectionAgreement],
        ["Statik Durumu", project.staticStatus],
        ["Son İşlem", project.lastOperation]
      ])}

      {renderTable("Faturalandırmalar", [
        ["Fatura Durumu", project.invoiceStatus]
      ])}

      <div className="d-print-none">
        <Link to="/projects" className="btn btn-secondary mt-4">
          ← Proje Listesine Geri Dön
        </Link>
      </div>
    </div>
  );
};

export default DetailProjectPage;
