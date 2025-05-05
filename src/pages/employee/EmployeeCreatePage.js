// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createEmployee } from '../../services/employeeService'; // Servisten createEmployee fonksiyonunu çağıracağız

// const EmployeeCreatePage = () => {
//   const [name, setName] = useState('');
//   const [department, setDepartment] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Form verilerini backend'e gönderiyoruz
//     const newEmployee = {
//       name,
//       department,
//       phone,
//       email,
//     };

//     createEmployee(newEmployee)
//       .then(() => {
//         alert("Çalışan başarıyla eklendi!");
//         navigate('/employees'); // Ekleme başarılı olursa çalışanlar sayfasına yönlendirme
//       })
//       .catch((error) => {
//         console.error("Çalışan eklenirken hata:", error);
//         alert("Çalışan eklenirken hata oluştu.");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Yeni Çalışan Ekle</h2>
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
//           <label className="form-label">Departman</label>
//           <input
//             type="text"
//             className="form-control"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
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

// export default EmployeeCreatePage;
