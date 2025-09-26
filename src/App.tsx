import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './features/homepage/HomePage';
import LoginPage from './features/login/LoginPage';
import RegisterPage from './features/register/RegisterPage';
import PlantsListPage from './features/plantDetail/PlantsListPage';
import PlantDetailPage from './features/plantDetail/PlantDetailPage';
import './App.css';

function App() {
  return (
    <div className="App pt-32">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plants" element={<PlantsListPage />} />
        <Route path="/plants/:plantId" element={<PlantDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
