import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Gruntech Proje Takip Sistemi</h1>
        <p className="lead">Lütfen aşağıdan gitmek istediğiniz sayfayı seçiniz.</p>
      </div>

      <div className="row justify-content-center">
        {/* Projeler Sayfası */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h4 className="card-title">📁 Tüm Projeler</h4>
              <p className="card-text">
                Sistemde kayıtlı tüm projeleri görüntüleyebilir, proje detaylarına ulaşabilir, yeni proje ekleyebilirsiniz.
              </p>
              <Link to="/projects" className="btn btn-outline-primary mt-auto">
                Projeleri Görüntüle
              </Link>
            </div>
          </div>
        </div>

        {/* Nümerik Bilgi Sayfası */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-lg h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h4 className="card-title">📊 Proje Nümerik Bilgileri</h4>
              <p className="card-text">
                Her projeye ait yüklenen belge türlerini, tarih ve sayı bilgileri ile birlikte tablo olarak görebilirsiniz.
              </p>
              <Link to="/project-numeric-info" className="btn btn-outline-success mt-auto">
                Nümerik Bilgileri Aç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
