// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import { getAllCustomers, searchCustomersByName, deleteCustomer } from '../../services/customerService';

// const CustomerPage = () => {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = () => {
//     getAllCustomers()
//       .then(response => {
//         console.log("Gelen veri:", response.data); // Veriyi loglayın
//         setCustomers(response.data);
//       })
//       .catch(error => console.error("Veri alınırken hata:", error));
//   };
  

//   const handleSearch = () => {
//     if (searchTerm.trim() === '') {
//       fetchCustomers();
//     } else {
//       searchCustomersByName(searchTerm)
//         .then(response => {
//           setCustomers(response.data);
//         })
//         .catch(error => {
//           console.error("Arama sırasında hata:", error);
//         });
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Bu müşteriyi silmek istediğinizden emin misiniz?")) {
//       deleteCustomer(id)
//         .then(() => {
//           // Silindikten sonra listeyi güncelle
//           fetchCustomers();
//         })
//         .catch((error) => {
//           console.error("Silme sırasında hata:", error);
//         });
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Müşteriler</h2>

//       {/* Yeni Müşteri Ekleme Linki */}
//       <div className="mb-3">
//         <Link to="/customers/create" className="btn btn-success">Yeni Müşteri Ekle</Link>
//       </div>

//       {/* Arama Alanı */}
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
//             <th>Telefon</th>
//             <th>Email</th>
//             <th>İşlemler</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.length > 0 ? (
//             customers.map(cust => (
//               <tr key={cust.id}>
//                 <td>{cust.name}</td>
//                 <td>{cust.phone}</td>
//                 <td>{cust.email}</td>
//                 <td>
//                   <Link to={`/customers/edit/${cust.id}`} className="btn btn-warning btn-sm mr-2">Güncelle</Link>
//                   <button onClick={() => handleDelete(cust.id)} className="btn btn-danger btn-sm">Sil</button>
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

// export default CustomerPage;
