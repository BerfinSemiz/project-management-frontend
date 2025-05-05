import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, deleteProject } from '../../services/projectService';

const DetailProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = () => {
    if (window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      deleteProject(id)
        .then(() => {
          alert("Proje başarıyla silindi.");
          navigate('/projects');
        })
        .catch(err => {
          console.error("Silme işlemi sırasında hata:", err);
          alert("Proje silinirken bir hata oluştu.");
        });
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!project) return <div>Proje bulunamadı.</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{project.name}</h2>
        <div>
          <Link to={`/projects/${project.id}/files`} className="btn btn-info btn-sm me-2">
            Belgeleri Görüntüle
          </Link>
          <Link to={`/projects/edit/${project.id}`} className="btn btn-warning btn-sm">
            Güncelle
          </Link>
        </div>
      </div>

      {/* 1 Genel Bilgiler */}
      <h5 className="mt-4">Genel Bilgiler</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>İşin Sahibi</th><td>{project.owner}</td></tr>
          <tr><th>Sorumlu</th><td>{project.responsible}</td></tr>
        </tbody>
      </table>

      {/* 2 İş Tanımı */}
      <h5 className="mt-4">İş Tanımı</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>İş Tipi</th><td>{project.jobType}</td></tr>
          <tr><th>Kapsam</th><td>{project.scope}</td></tr>
          <tr><th>Mahiyet</th><td>{project.description}</td></tr>
          <tr><th>Genel Notlar</th><td>{project.generalNotes}</td></tr>
        </tbody>
      </table>

      {/* 3 Yer Bilgisi */}
      <h5 className="mt-4">Yer Bilgisi</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Yer Sahibi</th><td>{project.locationOwner}</td></tr>
          <tr><th>Adres</th><td>{project.address}</td></tr>
          <tr><th>Ada/Parsel</th><td>{project.parcel}</td></tr>
        </tbody>
      </table>

      {/* 4 Ekipman Bilgisi */}
      <h5 className="mt-4">Ekipman Bilgisi</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>PV Panel Tipi</th><td>{project.panelType}</td></tr>
          <tr><th>Panel Adedi</th><td>{project.panelCount}</td></tr>
          <tr><th>İnverter</th><td>{project.inverter}</td></tr>
          <tr><th>İnverter Seri No</th><td>{project.inverterSerial}</td></tr>
        </tbody>
      </table>

      {/* 5 Zaman Bilgisi */}
      <h5 className="mt-4">Zaman Bilgisi</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Başlangıç Tarihi</th><td>{project.startDate}</td></tr>
          <tr><th>Bitiş Tarihi</th><td>{project.endDate}</td></tr>
        </tbody>
      </table>

      {/* 6 Diğer Süreçler ve Durumlar */}
      <h5 className="mt-4">Proje Süreç Durumları</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Durum</th><td>{project.status}</td></tr>
          <tr><th>Çağrı Mektubu</th><td>{project.callLetterStatus}</td></tr>
          <tr><th>Proje Onayı</th><td>{project.approvalStatus} ({project.approvalDueText})</td></tr>
          <tr><th>Bağlantı Anlaşması</th><td>{project.connectionAgreement}</td></tr>
          <tr><th>Statik Durumu</th><td>{project.staticStatus}</td></tr>
          <tr><th>Son İşlem</th><td>{project.lastOperation}</td></tr>
        </tbody>
      </table>

      {/* 7 Faturalandırmalar */}
      <h5 className="mt-4">Faturalandırmalar</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Fatura Durumu</th><td>{project.invoiceStatus}</td></tr>
        </tbody>
      </table>

      {/* Geri Dön */}
      <Link to="/projects" className="btn btn-secondary mt-4">
        ← Proje Listesine Geri Dön
      </Link>
    </div>
  );
};

export default DetailProjectPage;
