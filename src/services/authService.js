// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/auth/login', { email, password });
//       console.log(response.data); // Başarılı giriş sonrası gelen cevap
//       // Burada başarılı giriş sonrası yapılacak işlemleri ekleyebilirsiniz.
//     } catch (error) {
//       setErrorMessage('Login failed: Invalid credentials or server error');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );

// };

// export default LoginPage;
