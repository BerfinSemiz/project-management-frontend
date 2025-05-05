// import React, { useState } from 'react';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
//       <h2>Giriş Yap</h2>
//       <form method="POST" action="/login">
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Email:</label>
//           <input
//             type="text"
//             name="username" // dikkat! Spring Security username bekler
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ width: '100%', padding: '0.5rem' }}
//           />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Şifre:</label>
//           <input
//             type="password"
//             name="password" // Spring Security için doğru parametre
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ width: '100%', padding: '0.5rem' }}
//           />
//         </div>
//         <button type="submit" style={{ padding: '0.5rem 1rem' }}>Giriş Yap</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
