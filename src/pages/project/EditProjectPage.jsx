import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../../services/projectService';

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

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectById(id)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Veri alınamadı:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(id, formData)
      .then(() => {
        alert("Proje güncellendi.");
        navigate('/projects');
      })
      .catch(err => {
        console.error("Güncelleme hatası:", err);
        alert("Hata oluştu.");
      });
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!formData) return <div>Proje bulunamadı.</div>;

  return (
    <div className="container mt-4">
      <h2>Proje Güncelle</h2>
      <form onSubmit={handleSubmit}>

        {/* Genel Bilgiler */}
        <h5 className="mt-4">Genel Bilgiler</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Proje Adı</th><td><input name="name" value={formData.name} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>İşin Sahibi</th><td><input name="owner" value={formData.owner} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Sorumlu</th><td><input name="responsible" value={formData.responsible} onChange={handleChange} className="form-control" /></td></tr>
          </tbody>
        </table>

        {/* İş Tanımı */}
        <h5 className="mt-4">İş Tanımı</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>İş Tipi</th><td><select name="jobType" value={formData.jobType} onChange={handleChange} className="form-control">{JOB_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></td></tr>
            <tr><th>Kapsam</th><td><input name="scope" value={formData.scope} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Mahiyet</th><td><textarea name="description" value={formData.description} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Genel Notlar</th><td><textarea name="generalNotes" value={formData.generalNotes} onChange={handleChange} className="form-control" /></td></tr>
          </tbody>
        </table>

        {/* Yer Bilgisi */}
        <h5 className="mt-4">Yer Bilgisi</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Yer Sahibi</th><td><input name="locationOwner" value={formData.locationOwner} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Adres</th><td><input name="address" value={formData.address} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Ada / Parsel</th><td><input name="parcel" value={formData.parcel} onChange={handleChange} className="form-control" /></td></tr>
          </tbody>
        </table>

        {/* Ekipman Bilgisi */}
        <h5 className="mt-4">Ekipman Bilgisi</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Panel Tipi</th><td><input name="panelType" value={formData.panelType} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Panel Sayısı</th><td><input name="panelCount" type="number" value={formData.panelCount} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>İnverter</th><td><input name="inverter" value={formData.inverter} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>İnverter Seri No</th><td><input name="inverterSerial" value={formData.inverterSerial} onChange={handleChange} className="form-control" /></td></tr>
          </tbody>
        </table>

        {/* Zaman Bilgisi */}
        <h5 className="mt-4">Zaman Bilgisi</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Başlangıç Tarihi</th><td><input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Bitiş Tarihi</th><td><input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="form-control" /></td></tr>
          </tbody>
        </table>

        {/* Süreçler ve Durumlar */}
        <h5 className="mt-4">Süreç Durumları</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Durum</th><td><select name="status" value={formData.status} onChange={handleChange} className="form-control">{PROJECT_STAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></td></tr>
            <tr><th>Çağrı Mektubu</th><td><input name="callLetterStatus" value={formData.callLetterStatus} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Proje Onayı</th><td><input name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Onay Süresi</th><td><input name="approvalDueText" value={formData.approvalDueText} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Bağlantı Anlaşması</th><td><input name="connectionAgreement" value={formData.connectionAgreement} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Statik Durumu</th><td><input name="staticStatus" value={formData.staticStatus} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Son İşlem</th><td><input name="lastOperation" value={formData.lastOperation} onChange={handleChange} className="form-control" /></td></tr>
            <tr><th>Fatura Durumu</th><td><input name="invoiceStatus" value={formData.invoiceStatus} onChange={handleChange} className="form-control" /></td></tr>
          </tbody>
        </table>

        <button type="submit" className="btn btn-primary mt-3">Kaydet</button>
      </form>
    </div>
  );
};

export default EditProjectPage;
