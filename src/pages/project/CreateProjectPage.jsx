import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectService';
import ProjectStages from '../../constants/projectStages';
import JobTypes from '../../constants/jobTypes';
import ApprovalStatus from '../../constants/approvalStatus';

const CreateProjectPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', owner: '', responsible: '', startDate: '', endDate: '', projectStage: '', jobType: '',
    scope: '', description: '', generalNotes: '', locationOwner: '', address: '', parcel: '',
    panelType: '', panelCount: '', inverter: '', inverterSerial: '', callLetterStatus: '',
    approvalStatus: '', approvalDueText: '', connectionAgreement: '', staticStatus: '',
    lastOperation: '', invoiceStatus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <div className="accordion" id="projectAccordion">

          {/* Genel Bilgiler */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Genel Bilgiler
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Proje Adı</label><input type="text" name="name" className="form-control" required onChange={handleChange} /></div>
                <div className="mb-3"><label>İşin Sahibi</label><input type="text" name="owner" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Sorumlu</label><input type="text" name="responsible" className="form-control" onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* İş Tanımı */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                İş Tanımı
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3">
                  <label>İş Tipi</label>
                  <select name="jobType" className="form-control" onChange={handleChange} required>
                    <option value="">Seçiniz</option>
                    {JobTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Kapsam</label><input name="scope" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Mahiyet</label><textarea name="description" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Genel Notlar</label><textarea name="generalNotes" className="form-control" onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* Yer Bilgisi */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Yer Bilgisi
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Yer Sahibi</label><input name="locationOwner" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Adres</label><input name="address" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Ada / Parsel</label><input name="parcel" className="form-control" onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* Ekipman Bilgisi */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Ekipman Bilgisi
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Panel Tipi</label><input name="panelType" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Panel Sayısı</label><input type="number" name="panelCount" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>İnverter</label><input name="inverter" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>İnverter Seri No</label><input name="inverterSerial" className="form-control" onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* Zaman ve Süreç Bilgisi */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Zaman ve Süreç Bilgisi
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Başlangıç Tarihi</label><input type="date" name="startDate" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Bitiş Tarihi</label><input type="date" name="endDate" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3">
                  <label>Proje Aşaması</label>
                  <select name="projectStage" className="form-control" onChange={handleChange} required>
                    <option value="">Seçiniz</option>
                    {ProjectStages.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Çağrı Mektubu</label><input name="callLetterStatus" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3">
                  <label>Proje Onayı</label>
                  <select name="approvalStatus" className="form-control" onChange={handleChange}>
                    <option value="">Seçiniz</option>
                    {ApprovalStatus.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Onay Süresi</label><input name="approvalDueText" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Bağlantı Anlaşması</label><input name="connectionAgreement" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Statik Durumu</label><input name="staticStatus" className="form-control" onChange={handleChange} /></div>
                <div className="mb-3"><label>Son İşlem</label><input name="lastOperation" className="form-control" onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* Fatura Bilgisi */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                Fatura Bilgisi
              </button>
            </h2>
            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Fatura Durumu</label><input name="invoiceStatus" className="form-control" onChange={handleChange} /></div>
              </div>
            </div>
          </div>

        </div>
        <button type="submit" className="btn btn-success mt-3">Kaydet</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;