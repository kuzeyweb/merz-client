import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
        
    <Route exact path="/" element={<Auth />} /> 
    <Route path="/dashboard" element={<Dashboard />} /> 

    </Routes>
    </Router>
  );
}

export default App;
