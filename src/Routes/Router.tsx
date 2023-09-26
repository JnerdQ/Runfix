import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Watson from '@/Components/Watson';
import SubMenu from '@/Components/SubMenu';
import Home from '@/pages/Home';
import EmployeeRegistration from '@/Components/EmployeeRegistration';
import EmployeeTable from '@/Components/EmployeeTable';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="register-employee" element={<EmployeeRegistration />} />
          <Route path="table-employee" element={<EmployeeTable />} />
          <Route path="submenu" element={<SubMenu user={'admin'} />} />
          <Route path="watson" element={<Watson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;
