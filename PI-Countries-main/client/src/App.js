import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Country from './components/Country/Country.jsx';
import Activity from './components/Activity/Activity.jsx';
import NotFound from './components/NotFound/NotFound.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<Home />} />

        <Route path="/country/:id" element={<Country />} />

        <Route path="/activity" element={<Activity />} />

        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
