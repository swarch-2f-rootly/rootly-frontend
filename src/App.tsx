import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './features/homepage/HomePage';
import LoginPage from './features/login/LoginPage';
import RegisterPage from './features/register/RegisterPage';
import PlantsListPage from './features/plantDetail/PlantsListPage';
import PlantDetailPage from './features/plantDetail/PlantDetailPage';
import UserProfilePage from './features/profile/UserProfilePage';
import './App.css';

function App() {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  const isPlantDetail = location.pathname.startsWith('/monitoring/') && location.pathname !== '/monitoring';
  
  return (
    <div className={`App ${!isLoginOrRegister && !isPlantDetail ? 'pt-32' : ''}`}>
      {!isLoginOrRegister && !isPlantDetail && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/monitoring" element={<PlantsListPage />} />
        <Route path="/monitoring/:plantId" element={<PlantDetailPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
