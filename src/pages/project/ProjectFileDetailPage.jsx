import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getProjectFiles,
  uploadProjectFile,
  deleteProjectFile,
  downloadProjectFileUrl
} from '../../services/projectFileDetailService';

import documentTypes from '../../constants/documentTypes';


const ProjectFileDetailPage = () => {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    file: null,
    documentType: '',
    documentDate: '',
    documentNumber: ''
  });

  const fetchFiles = useCallback(() => {
    getProjectFiles(id)
      .then(res => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dosyalar alınamadı:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const { file, documentType, documentDate, documentNumber } = formData;
    if (!file || !documentType || !documentDate) {
      alert("Lütfen tüm gerekli alanları doldurun.");
      return;
    }

    const existingFile = files.find(f => f.documentType === documentType);

    const proceedUpload = () => {
      uploadProjectFile(id, file, documentType, documentDate, documentNumber)
        .then(() => {
          alert("Dosya yüklendi.");
          setFormData({ file: null, documentType: '', documentDate: '', documentNumber: '' });
          document.getElementById('fileInput').value = '';
          fetchFiles();
        })
        .catch(err => {
          console.error("Yükleme hatası:", err);
          alert("Yükleme başarısız.");
        });
    };

    if (existingFile) {
      if (window.confirm("Bu belge türü zaten mevcut. Üzerine yazmak istiyor musunuz?")) {
        deleteProjectFile(existingFile.id)
          .then(() => proceedUpload())
          .catch(err => {
            console.error("Önceki dosya silinemedi:", err);
            alert("Dosya güncellenemedi.");
          });
      }
    } else {
      proceedUpload();
    }
  };

  const handleDelete = (fileId) => {
    if (window.confirm("Bu dosya silinsin mi?")) {
      deleteProjectFile(fileId)
        .then(() => fetchFiles())
        .catch(err => {
          console.error("Silme hatası:", err);
          alert("Silinemedi.");
        });
    }
  };

  const getFileByType = (type) => files.find(f => f.documentType === type.value);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="container mt-4">
      <h3>Proje Dosyaları</h3>

      <form onSubmit={handleUpload} className="mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-md-3">
            <label>Belge Türü</label>
            <select name="documentType" className="form-control" value={formData.documentType} onChange={handleChange} required>
              <option value="">Seçiniz</option>
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label>Belge Tarihi</label>
            <input type="date" name="documentDate" className="form-control" value={formData.documentDate} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <label>Belge Sayı</label>
            <input type="text" name="documentNumber" className="form-control" value={formData.documentNumber} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <label>Dosya</label>
            <input type="file" id="fileInput" name="file" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Yükle</button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Belge Türü</th>
            <th>Tarih</th>
            <th>Sayı</th>
            <th>Belge</th>
          </tr>
        </thead>
        <tbody>
          {documentTypes.map(type => {
            const file = getFileByType(type);
            return (
              <tr key={type.value}>
                <td>{type.label}</td>
                <td>{file?.documentDate || '-'}</td>
                <td>{file?.documentNumber || '-'}</td>
                <td>
                  {file ? (
                    <>
                      <a
                        href={downloadProjectFileUrl(file.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Belge
                      </a>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Sil
                      </button>
                    </>
                  ) : (
                    <span className="text-muted">Dosya yok</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link to={`/projects/${id}`} className="btn btn-secondary mt-4">← Projeye Geri Dön</Link>
    </div>
  );
};

export default ProjectFileDetailPage;
