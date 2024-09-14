import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateJob from './components/CreateJob';
import JobList from './components/JobList';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/create" element={<CreateJob />} />
      </Routes>
    </Router>
  );
};

export default App;
