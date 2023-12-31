import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Watson from '../components/Watson';
import SubMenu from '../components/SubMenu';
import Home from '../pages/Home';
import EmployeeRegistration from '../components/employee/EmployeeRegistration';
import EmployeeTable from '../components/employee/EmployeeTable';
import SparePartsRegistration from '../components/SparePartsRegistration';
import PhotoMenu from '../components/vehicle/VehiclesPhotos';
import Vehicle from '../components/vehicle/Vehicle';
import PasswordChange from '../pages/PasswordChange';
import PrivateRoute from './PrivateRoute';
import RepairRegister from 'src/components/vehicle/repair/RepairRegister';
import RepairHistory from 'src/components/vehicle/repair/RepairHistory';
import RepairSearch from 'src/pages/RepairsSearch';
import CustomerRegistration from 'src/components/customer/CustomerRegistration';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="repair-search" element={<RepairSearch />} />
        <Route
          path="repair-history/:plate/:documento"
          element={<RepairHistory />}
        />

        {/*  Rutas protegidas */}
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="password-change" element={<PasswordChange />} />

          <Route path="employee-register" element={<EmployeeRegistration />} />
          <Route path="employee-table" element={<EmployeeTable />} />
          <Route path="customer-register" element={<CustomerRegistration />} />
          <Route path="submenu" element={<SubMenu />} />
          <Route path="watson" element={<Watson />} />
          <Route
            path="spare-parts-registration"
            element={<SparePartsRegistration />}
          />
          <Route path="vehicle-menu" element={<PhotoMenu />} />
          <Route path="vehicle-repair" element={<RepairRegister />} />
          <Route path="vehicle" element={<Vehicle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
