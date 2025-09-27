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
  
  return (
    <div className={`App ${!isLoginOrRegister ? 'pt-32' : ''}`}>
      {!isLoginOrRegister && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plants" element={<PlantsListPage />} />
        <Route path="/plants/:plantId" element={<PlantDetailPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
