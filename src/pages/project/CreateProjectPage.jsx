import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectService';
import ProjectStages from '../../constants/projectStages';
import JobTypes from '../../constants/jobTypes';
import ApprovalStatus from '../../constants/approvalStatus';
import RegulationTypes from '../../constants/regulationTypes';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', owner: '', responsible: '', startDate: '', endDate: '', projectStage: '', jobType: '',
    scope: '', description: '', generalNotes: '', locationOwner: '', address: '', parcel: '',
    panelType: '', panelCount: '', inverter: '', inverterSerial: '', callLetterDate: '',
    approvalStatus: '', approvalDueText: '', connectionAgreement: '', staticStatus: '',
    lastOperation: '', invoiceStatus: '', regulationTypes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];
    if (!formData.name) errors.push("• Genel Bilgiler: Proje Adı");
    if (!formData.jobType) errors.push("• İş Tanımı: İş Tipi");
    if (!formData.owner) errors.push("• İş Tanımı: İşin Sahibi");


    if (errors.length > 0) {
      alert("Lütfen aşağıdaki zorunlu alanları doldurun:\n\n" + errors.join("\n"));
      return;
    }

    const payload = { ...formData };

    // Hatalı veri tipine neden olabilecek opsiyonel alanlar silinir
    if (!payload.projectStage) delete payload.projectStage;
    if (!payload.approvalStatus) delete payload.approvalStatus;
    if (!payload.regulationTypes) delete payload.regulationTypes;
    
    createProject(payload)
      .then(() => {
        alert("Proje başarıyla oluşturuldu.");
        navigate('/projects');
      })
      .catch(err => {
        console.error("Oluşturma hatası:", err);
        alert("Hata oluştu.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Yeni Proje Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div className="accordion" id="projectAccordion">

          {/* 1 - GENEL BİLGİLER */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Genel Bilgiler
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Proje Adı *</label><input name="name" value={formData.name} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>İşin Sahibi</label><input name="owner" value={formData.owner} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Sorumlu</label><input name="responsible" value={formData.responsible} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 2 - İŞ TANIMI */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                İş Tanımı
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3">
                  <label>İş Tipi *</label>
                  <select name="jobType" value={formData.jobType} onChange={handleChange} className="form-control">
                    <option value="">Seçiniz</option>
                    {JobTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Kapsam</label><input name="scope" value={formData.scope} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Mahiyet</label><textarea name="description" value={formData.description} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Genel Notlar</label><textarea name="generalNotes" value={formData.generalNotes} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 3 - YER BİLGİSİ */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Yer Bilgisi
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Yer Sahibi</label><input name="locationOwner" value={formData.locationOwner} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Adres</label><input name="address" value={formData.address} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Ada / Parsel</label><input name="parcel" value={formData.parcel} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 4 - EKİPMAN BİLGİSİ */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                Ekipman Bilgisi
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Panel Tipi</label><input name="panelType" value={formData.panelType} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Panel Sayısı</label><input type="number" name="panelCount" value={formData.panelCount} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>İnverter</label><input name="inverter" value={formData.inverter} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>İnverter Seri No</label><input name="inverterSerial" value={formData.inverterSerial} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 5 - ZAMAN VE SÜREÇ */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                Zaman ve Süreç Bilgisi
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3"><label>Başlangıç Tarihi</label><input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Bitiş Tarihi</label><input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3">
                  <label>Proje Aşaması</label>
                  <select name="projectStage" value={formData.projectStage} onChange={handleChange} className="form-control">
                    <option value="">Seçiniz</option>
                    {ProjectStages.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Yönetmelik Türü</label>
                  <select name="regulationTypes" value={formData.regulationTypes} onChange={handleChange} className="form-control">
                    <option value="">Seçiniz</option>
                    {RegulationTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Çağrı Mektubu</label><input type="date" name="callLetterDate" value={formData.callLetterDate} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3">
                  <label>Proje Onayı</label>
                  <select name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} className="form-control">
                    <option value="">Seçiniz</option>
                    {ApprovalStatus.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Onay Süresi</label><input name="approvalDueText" value={formData.approvalDueText} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Bağlantı Anlaşması</label><input name="connectionAgreement" value={formData.connectionAgreement} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Statik Durumu</label><input name="staticStatus" value={formData.staticStatus} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Son İşlem</label><input name="lastOperation" value={formData.lastOperation} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 6 - FATURA BİLGİSİ */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                Fatura Bilgisi
              </button>
            </h2>
            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#projectAccordion">
              <div className="accordion-body">
                <div className="mb-3">
                  <label>Fatura Durumu</label>
                  <input
                    name="invoiceStatus"
                    value={formData.invoiceStatus}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
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