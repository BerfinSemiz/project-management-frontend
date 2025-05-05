import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// import HomePage from './pages/HomePage'; 
// import LoginPage from "./pages/LoginPage"; 
// import Dashboard from "./pages/Dashboard";

// import EmployeePage from './pages/employee/EmployeePage';
// import EmployeeEditPage from './pages/employee/EmployeeEditPage';
// import EmployeeCreatePage from './pages/employee/EmployeeCreatePage';

import ProjectPage from './pages/project/ProjectPage';
import DetailProjectPage from './pages/project/DetailProjectPage';
import CreateProjectPage from './pages/project/CreateProjectPage';
import EditProjectPage from './pages/project/EditProjectPage';
import FileListPage from './pages/project/FileListPage';
import ProjectNumericInfoPage from './pages/project/ProjectNumericInfoPage';

// import CustomerPage from './pages/customer/CustomerPage'; 
// import CustomerEditPage from './pages/customer/CustomerEditPage';
// import CustomerCreatePage from './pages/customer/CustomerCreatePage';

function App() {
  return (
    <Router>
      <Routes>

        {/* <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
         

        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/employees/edit/:id" element={<EmployeeEditPage />} />
        <Route path="/employees/create" element={<EmployeeCreatePage />} /> */}
        
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<DetailProjectPage />} />
        <Route path="*" element={<Navigate to="/projects" />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
        <Route path="/projects/edit/:id" element={<EditProjectPage />} />
        <Route path="/projects/:id/files" element={<FileListPage />} />

        <Route path="/project-numeric-info" element={<ProjectNumericInfoPage />} />

        {/* <Route path="/customers" element={<CustomerPage />} />
        <Route path="/customers/edit/:id" element={<CustomerEditPage />} />
        <Route path="/customers/create" element={<CustomerCreatePage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
