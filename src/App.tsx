import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PlantsListPage from './components/PlantsListPage';
import PlantDetailPage from './components/PlantDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monitoring" element={<PlantsListPage />} />
          <Route path="/monitoring/:plantId" element={<PlantDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
