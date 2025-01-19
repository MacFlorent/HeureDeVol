import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FlightEntryForm from './components/FlightEntryForm.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">Pilot Logbook</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Link to="/" className="py-4 px-2 text-gray-500 hover:text-blue-500">Dashboard</Link>
                  <Link to="/new-flight" className="py-4 px-2 text-gray-500 hover:text-blue-500">New Flight</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/new-flight" element={<FlightEntryForm />} />
            <Route path="/" element={<div>Dashboard (Coming soon)</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;