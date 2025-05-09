import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../services/projectService';
import {
  getFilesByProjectId,
  deleteProjectFile,
  downloadProjectFileUrl,
  uploadProjectFile
} from '../../services/projectFileService';
import DocumentTypes from '../../constants/documentTypes';

const ProjectNumericInfoPage = () => {
  const [projects, setProjects] = useState([]);
  const [uploadingProjectId, setUploadingProjectId] = useState(null);
  const [uploadingDocType, setUploadingDocType] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    file: null,
    documentDate: '',
    documentNumber: ''
  });

  useEffect(() => {
    fetchProjectsWithFiles();
  }, []);

  const fetchProjectsWithFiles = async () => {
    try {
      const res = await getAllProjects();
      const projectsWithFiles = await Promise.all(
        res.data.map(async (project) => {
          const filesRes = await getFilesByProjectId(project.id);
          return { ...project, files: filesRes.data };
        })
      );
      setProjects(projectsWithFiles);
    } catch (error) {
      console.error("Veriler alınırken hata:", error);
    }
  };

  const handleDelete = async (fileId) => {
    if (window.confirm("Bu belgeyi silmek istediğinizden emin misiniz?")) {
      await deleteProjectFile(fileId);
      fetchProjectsWithFiles();
    }
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.documentDate || !uploadForm.documentNumber) {
      alert("Tüm alanları doldurmalısınız.");
      return;
    }

    const formData = new FormData();
    formData.append("projectId", uploadingProjectId);
    formData.append("documentType", uploadingDocType);
    formData.append("documentDate", uploadForm.documentDate);
    formData.append("documentNumber", uploadForm.documentNumber);
    formData.append("file", uploadForm.file);

    try {
      await uploadProjectFile(formData);
      setUploadingProjectId(null);
      setUploadingDocType(null);
      setUploadForm({ file: null, documentDate: '', documentNumber: '' });
      fetchProjectsWithFiles();
    } catch (err) {
      alert("Yükleme sırasında hata oluştu.");
      console.error(err);
    }
  };

  const isUploading = (projectId, docType) =>
    uploadingProjectId === projectId && uploadingDocType === docType;

  return (
    <div className="container mt-4">
      <h2>Proje Nümerik Bilgileri</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th>Proje Adı</th>
              {DocumentTypes.map((doc) => (
                <th key={doc.value}>{doc.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                {DocumentTypes.map((doc) => {
                  const file = project.files.find(f => f.documentType === doc.value);
                  return (
                    <td key={doc.value}>
                      {file ? (
                        <div>
                          <div><strong>Tarih:</strong> {file.documentDate}</div>
                          <div><strong>Sayı:</strong> {file.documentNumber}</div>
                          <div className="d-flex gap-2 mt-1">
                            <a
                              href={downloadProjectFileUrl(file.id)}
                              className="btn btn-sm btn-success"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              İndir
                            </a>
                            <button
                              onClick={() => handleDelete(file.id)}
                              className="btn btn-sm btn-danger"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      ) : isUploading(project.id, doc.value) ? (
                        <div className="d-flex flex-column gap-1">
                          <input
                            type="file"
                            onChange={(e) =>
                              setUploadForm({ ...uploadForm, file: e.target.files[0] })
                            }
                          />
                          <input
                            type="date"
                            className="form-control"
                            value={uploadForm.documentDate}
                            onChange={(e) =>
                              setUploadForm({ ...uploadForm, documentDate: e.target.value })
                            }
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Belge Sayı"
                            value={uploadForm.documentNumber}
                            onChange={(e) =>
                              setUploadForm({ ...uploadForm, documentNumber: e.target.value })
                            }
                          />
                          <div className="d-flex gap-2 mt-1">
                            <button className="btn btn-sm btn-success" onClick={handleUpload}>
                              Kaydet
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => {
                                setUploadingProjectId(null);
                                setUploadingDocType(null);
                              }}
                            >
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            setUploadingProjectId(project.id);
                            setUploadingDocType(doc.value);
                          }}
                        >
                          Yükle
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectNumericInfoPage;
