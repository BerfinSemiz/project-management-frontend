import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { downloadProjectFileUrl } from '../../services/fileListService';

const documentTypes = [
  { label: 'Statik Proje', value: 'STATIK_PROJE' },
  { label: 'Çağrı Mektubu', value: 'CAGRI_MEKTUBU' },
  { label: 'Bağlantı Anlaşması', value: 'BAGLANTI_ANLASMASI' },
  { label: 'GES Elektrik Proje', value: 'GES_ELEKTRIK_PROJE' },
  { label: 'Belediye Uygunluk', value: 'BELEDIYE_UYGUNLUK' },
  { label: 'Ön Kabul', value: 'ON_KABUL' },
  { label: 'Geçici Kabul', value: 'GECICI_KABUL' },
];

const ProjectNumericInfoPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/project-files/all-summary')
      .then(res => setData(res.data))
      .catch(err => console.error("Veri alınamadı:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Proje Nümerik Bilgileri</h2>
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead>
            <tr>
              <th rowSpan={2}>Proje Adı</th>
              {documentTypes.map(doc => (
                <th colSpan={3} key={doc.value}>{doc.label}</th>
              ))}
            </tr>
            <tr>
              {documentTypes.map(doc => (
                <React.Fragment key={doc.value + '-inner'}>
                  <th>Tarih</th>
                  <th>Sayı</th>
                  <th>Belge</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(project => (
              <tr key={project.projectId}>
                <td>{project.projectName}</td>
                {documentTypes.map(doc => {
                  const date = project[`${doc.value}_date`];
                  const number = project[`${doc.value}_number`];
                  const fileId = project[`${doc.value}_id`];

                  return (
                    <React.Fragment key={doc.value + project.projectId}>
                      <td>{date || '-'}</td>
                      <td>{number || '-'}</td>
                      <td>
                        {fileId ? (
                          <a
                            href={downloadProjectFileUrl(fileId)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Belge
                          </a>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    </React.Fragment>
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
