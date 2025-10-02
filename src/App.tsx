import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './features/homepage/HomePage';
import LoginPage from './features/login/LoginPage';
import RegisterPage from './features/register/RegisterPage';
import PlantsListPage from './features/plantDetail/PlantsListPage';
import PlantDetailPage from './features/plantDetail/PlantDetailPage';
import UserProfilePage from './features/profile/UserProfilePage';
import AddPlantForm from './features/plants/components/AddPlantForm';
import AddDeviceForm from './features/devices/components/AddDeviceForm';
import DevicesListPage from './features/devices/DevicesListPage';
import './App.css';

function App() {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  const isPlantDetail = location.pathname.startsWith('/monitoring/') && location.pathname !== '/monitoring' && location.pathname !== '/monitoring/new';
  
  return (
    <div className={`App ${!isLoginOrRegister && !isPlantDetail ? 'pt-32' : ''}`}>
      {!isLoginOrRegister && !isPlantDetail && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/monitoring" element={
          <ProtectedRoute>
            <PlantsListPage />
          </ProtectedRoute>
        } />
        <Route path="/monitoring/new" element={
          <ProtectedRoute>
            <AddPlantForm />
          </ProtectedRoute>
        } />
        <Route path="/monitoring/:plantId" element={
          <ProtectedRoute>
            <PlantDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/devices" element={
          <ProtectedRoute>
            <DevicesListPage />
          </ProtectedRoute>
        } />
        <Route path="/devices/new" element={
          <ProtectedRoute>
            <AddDeviceForm />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
