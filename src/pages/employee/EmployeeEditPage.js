// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getEmployeeById, updateEmployee } from '../../services/employeeService';

// const EmployeeEditPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [employee, setEmployee] = useState({
//     name: '',
//     department: '',
//     phone: '',
//     email: ''
//   });

//   useEffect(() => {
//     getEmployeeById(id)
//       .then(response => setEmployee(response.data))
//       .catch(error => console.error("Çalışan bilgisi alınamadı:", error));
//   }, [id]);

//   const handleChange = (e) => {
//     setEmployee({ ...employee, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateEmployee(id, employee)
//       .then(() => {
//         alert("Çalışan başarıyla güncellendi.");
//         navigate("/employees");
//       })
//       .catch(error => console.error("Güncelleme hatası:", error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Çalışan Güncelle</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>İsim Soyisim</label>
//           <input type="text" className="form-control" name="name" value={employee.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Departman</label>
//           <input type="text" className="form-control" name="department" value={employee.department} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Telefon</label>
//           <input type="text" className="form-control" name="phone" value={employee.phone} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">Güncelle</button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeEditPage;
