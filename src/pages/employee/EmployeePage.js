// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import { getAllEmployees, searchEmployeesByName, deleteEmployee } from '../../services/employeeService';

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = () => {
//     getAllEmployees()
//       .then(response => setEmployees(response.data))
//       .catch(error => console.error("Veri alınırken hata:", error));
//   };

//   const handleSearch = () => {
//     if (searchTerm.trim() === '') {
//       fetchEmployees();
//     } else {
//       searchEmployeesByName(searchTerm)
//         .then(response => {
//           setEmployees(response.data);
//         })
//         .catch(error => {
//           console.error("Arama sırasında hata:", error);
//         });
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Bu çalışanı silmek istediğinizden emin misiniz?")) {
//       deleteEmployee(id)
//         .then(() => {
//           // Silindikten sonra listeyi güncelle
//           fetchEmployees();
//         })
//         .catch((error) => {
//           console.error("Silme sırasında hata:", error);
//         });
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Çalışanlar</h2>

//       {/* Yeni Çalışan Ekleme Linki */}
//       <div className="mb-3">
//         <Link to="/employees/create" className="btn btn-success">Yeni Çalışan Ekle</Link>
//       </div>

//        {/* Arama Alanı */}
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="İsim Soyisim ara..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button className="btn btn-outline-primary" onClick={handleSearch}>Ara</button>
//       </div>  

//       {/* Listeleme Tablosu */}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>İsim Soyisim</th>
//             <th>Departman</th>
//             <th>Telefon</th>
//             <th>Email</th>
//             <th>İşlemler</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length > 0 ? (
//             employees.map(emp => (
//               <tr key={emp.id}>
//                 <td>{emp.name}</td>
//                 <td>{emp.department}</td>
//                 <td>{emp.phone}</td>
//                 <td>{emp.email}</td>
//                 <td>
//                   <Link to={`/employees/edit/${emp.id}`} className="btn btn-warning btn-sm mr-2">Güncelle</Link>
//                   <button onClick={() => handleDelete(emp.id)} className="btn btn-danger btn-sm">Sil</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">Kayıt bulunamadı.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeePage;
