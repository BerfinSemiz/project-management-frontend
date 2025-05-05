// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createCustomer } from '../../services/customerService'; // Servisten createCustomer fonksiyonunu çağıracağız

// const CustomerCreatePage = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Form verilerini backend'e gönderiyoruz
//     const newCustomer = {
//       name,
//       phone,
//       email,
//     };

//     createCustomer(newCustomer)
//       .then(() => {
//         alert("Müşteri başarıyla eklendi!");
//         navigate('/customers'); // Ekleme başarılı olursa müşteriler sayfasına yönlendirme
//       })
//       .catch((error) => {
//         console.error("Müşteri eklenirken hata:", error);
//         alert("Müşteri eklenirken hata oluştu.");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Yeni Müşteri Ekle</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">İsim Soyisim</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>


//         <div className="mb-3">
//           <label className="form-label">Telefon</label>
//           <input
//             type="text"
//             className="form-control"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Ekle</button>
//       </form>
//     </div>
//   );
// };

// export default CustomerCreatePage;
