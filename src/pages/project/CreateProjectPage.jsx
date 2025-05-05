import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectService';

// Backend'deki ENUM değerlerinin frontend karşılıkları
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

const CreateProjectPage = () => {
  const navigate = useNavigate();

  // Form verileri
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    responsible: '',
    startDate: '',
    endDate: '',
    projectStage: '',
    jobType: ''
  });

  //  Form input değişikliklerini yakala
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form gönderildiğinde
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gerekirse boş alanları gönderme
    const payload = { ...formData };
    if (!payload.projectStage) delete payload.projectStage;
    if (!payload.jobType) delete payload.jobType;

    createProject(payload)
      .then(() => {
        alert("Proje başarıyla oluşturuldu!");
        navigate('/projects');
      })
      .catch(err => {
        console.error("Proje oluşturulurken hata:", err);
        alert("Hata oluştu. Lütfen alanları kontrol edin.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Yeni Proje Oluştur</h2>
      <form onSubmit={handleSubmit}>
        {/* Proje Adı */}
        <div className="mb-3">
          <label>Proje Adı</label>
          <input type="text" name="name" className="form-control" required onChange={handleChange} />
        </div>

        {/* İşin Sahibi */}
        <div className="mb-3">
          <label>İşin Sahibi</label>
          <input type="text" name="owner" className="form-control" onChange={handleChange} />
        </div>

        {/* Sorumlu */}
        <div className="mb-3">
          <label>Sorumlu</label>
          <input type="text" name="responsible" className="form-control" onChange={handleChange} />
        </div>

        {/* Başlangıç ve Bitiş Tarihleri */}
        <div className="row">
          <div className="mb-3 col-md-6">
            <label>Başlangıç Tarihi</label>
            <input type="date" name="startDate" className="form-control" onChange={handleChange} />
          </div>

          <div className="mb-3 col-md-6">
            <label>Bitiş Tarihi</label>
            <input type="date" name="endDate" className="form-control" onChange={handleChange} />
          </div>
        </div>

        {/* Proje Aşaması */}
        <div className="mb-3">
          <label>Proje Aşaması</label>
          <select name="projectStage" className="form-control" onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {PROJECT_STAGE_OPTIONS.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        {/* İş Tipi */}
        <div className="mb-3">
          <label>İş Tipi</label>
          <select name="jobType" className="form-control" onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {JOB_TYPE_OPTIONS.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Kaydet Butonu */}
        <button type="submit" className="btn btn-success">Kaydet</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
