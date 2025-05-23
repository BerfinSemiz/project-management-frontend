import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../../services/projectService';
import ProjectStages from '../../constants/projectStages';
import JobTypes from '../../constants/jobTypes';
import ApprovalStatus from '../../constants/approvalStatus';
import RegulationTypes from '../../constants/regulationTypes';


// Edit sayfası: mevcut proje bilgilerini getirip düzenlemeye imkân tanır
const EditProjectPage = () => {
  const { id } = useParams(); // URL'den proje id'si alınır
  const navigate = useNavigate(); // Kaydetmeden sonra yönlendirme için

  const [formData, setFormData] = useState(null); // Proje verileri burada tutulur
  const [loading, setLoading] = useState(true);   // Yüklenme kontrolü

  // Sayfa yüklendiğinde proje bilgileri çekilir
  useEffect(() => {
    getProjectById(id)
      .then(res => {
        setFormData(res.data); // Gelen veri formData'ya atanır
        setLoading(false);
      })
      .catch(err => {
        console.error("Veri alınamadı:", err);
        setLoading(false);
      });
  }, [id]);

  // Form elemanları değiştiğinde state güncellenir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submit edildiğinde backend'e güncelleme isteği gönderilir
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(id, formData)
      .then(() => {
        alert("Proje güncellendi.");
        navigate('/projects'); // Projeler sayfasına geri dönülür
      })
      .catch(err => {
        console.error("Güncelleme hatası:", err);
        alert("Hata oluştu.");
      });
  };

  // Yüklenme tamamlanmamışsa gösterilecek şeyler
  if (loading) return <div>Yükleniyor...</div>;
  if (!formData) return <div>Proje bulunamadı.</div>;

  return (
    <div className="container mt-4">
      <h2>Proje Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <div className="accordion" id="editProjectAccordion">

          {/* 1 - GENEL BİLGİLER */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Genel Bilgiler
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#editProjectAccordion">
              <div className="accordion-body">
                {/* Proje Adı, Sahibi, Sorumlusu */}
                <div className="mb-3"><label>Proje Adı</label><input name="name" value={formData.name ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>İşin Sahibi</label><input name="owner" value={formData.owner ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Sorumlu</label><input name="responsible" value={formData.responsible ?? ''} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 2 - İŞ TANIMI */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                İş Tanımı
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#editProjectAccordion">
              <div className="accordion-body">
                {/* İş tipi dropdown, kapsam, açıklama alanları */}
                <div className="mb-3">
                  <label>İş Tipi</label>
                  <select name="jobType" value={formData.jobType ?? ''} onChange={handleChange} className="form-control">
                    {JobTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Kapsam</label><input name="scope" value={formData.scope ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Mahiyet</label><textarea name="description" value={formData.description ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Genel Notlar</label><textarea name="generalNotes" value={formData.generalNotes ?? ''} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 3 - YER BİLGİSİ */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Yer Bilgisi
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#editProjectAccordion">
              <div className="accordion-body">
                {/* Adres ve yer bilgileri */}
                <div className="mb-3"><label>Yer Sahibi</label><input name="locationOwner" value={formData.locationOwner ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Adres</label><input name="address" value={formData.address ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Ada / Parsel</label><input name="parcel" value={formData.parcel ?? ''} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 4 - EKİPMAN BİLGİSİ */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Ekipman Bilgisi
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#editProjectAccordion">
              <div className="accordion-body">
                {/* Panel tipi, sayısı ve inverter bilgileri */}
                <div className="mb-3"><label>Panel Tipi</label><input name="panelType" value={formData.panelType ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Panel Sayısı</label><input type="number" name="panelCount" value={formData.panelCount ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>İnverter</label><input name="inverter" value={formData.inverter ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>İnverter Seri No</label><input name="inverterSerial" value={formData.inverterSerial ?? ''} onChange={handleChange} className="form-control" /></div>
              </div>
            </div>
          </div>

          {/* 5 - ZAMAN & SÜREÇ DURUMU */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Zaman ve Süreç Durumları
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#editProjectAccordion">
              <div className="accordion-body">
                {/* Tarihler, durum, onay ve belgeler */}
                <div className="mb-3"><label>Başlangıç Tarihi</label><input name="startDate" type="date" value={formData.startDate ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Bitiş Tarihi</label><input name="endDate" type="date" value={formData.endDate ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3">
                  <label>Durum</label>
                  <select name="status" value={formData.status ?? ''} onChange={handleChange} className="form-control">
                    {ProjectStages.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>

                <div className="mb-3">
                  <label>Yönetmelik Türü</label>
                  <select
                    name="regulationTypes"
                    value={formData.regulationTypes ?? ''}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Seçiniz</option>
                    {RegulationTypes.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3"><label>Çağrı Mektubu</label><input name="callLetterDate" type="date" value={formData.callLetterDate ?? ''} onChange={handleChange} className="form-control" /></div>
                
                <div className="mb-3">
                  <label>Proje Onayı</label>
                  <select name="approvalStatus" value={formData.approvalStatus ?? ''} onChange={handleChange} className="form-control">
                    <option value="">Seçiniz</option>
                    {ApprovalStatus.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3"><label>Onay Süresi</label><input name="approvalDueText" value={formData.approvalDueText ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Bağlantı Anlaşması</label><input name="connectionAgreement" value={formData.connectionAgreement ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Statik Durumu</label><input name="staticStatus" value={formData.staticStatus ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Son İşlem</label><input name="lastOperation" value={formData.lastOperation ?? ''} onChange={handleChange} className="form-control" /></div>
                <div className="mb-3"><label>Fatura Durumu</label><input name="invoiceStatus" value={formData.invoiceStatus ?? ''} onChange={handleChange} className="form-control" /></div>
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
        {/* KAYDET BUTONU */}
        <button type="submit" className="btn btn-primary mt-3">Kaydet</button>
      </form>
    </div>
  );
};

export default EditProjectPage;
