// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getCustomerById, updateCustomer } from '../../services/customerService';

// const CustomerEditPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState({
//     name: '',
//     phone: '',
//     email: ''
//   });

//   useEffect(() => {
//     getCustomerById(id)
//       .then(response => setCustomer(response.data))
//       .catch(error => console.error("Müşteri bilgisi alınamadı:", error));
//   }, [id]);

//   const handleChange = (e) => {
//     setCustomer({ ...customer, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateCustomer(id, customer)
//       .then(() => {
//         alert("Müşteri başarıyla güncellendi.");
//         navigate("/customers");
//       })
//       .catch(error => console.error("Güncelleme hatası:", error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Müşteri Güncelle</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>İsim Soyisim</label>
//           <input type="text" className="form-control" name="name" value={customer.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Telefon</label>
//           <input type="text" className="form-control" name="phone" value={customer.phone} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control" name="email" value={customer.email} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">Güncelle</button>
//       </form>
//     </div>
//   );
// };

// export default CustomerEditPage;
