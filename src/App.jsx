import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CinematicWizard from "./components/CinematicWizard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tool" element={<CinematicWizard />} />
      </Routes>
    </Router>
  );
}

export default App;
