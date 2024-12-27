import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Pages/Hero';
import AdminDashbord from './Pages/AdminPages/AdminDashbord'
import Session from './Pages/Sessions'
import ParticipantManagement from './Pages/AdminPages/ParticipantManagement';
import SessionManagement from './Pages/AdminPages/SessionManagement';
import AttendanceManagement from './Pages/AdminPages/AttendanceManagement'
import Register from './Pages/Registration';
import Schedule from './Pages/Schedule';
import ProceedingsManagement from './Pages/AdminPages/proceedingsManagement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/home' element={<Hero/>}/>
        <Route path='/admin' element={<AdminDashbord/>}/>
        <Route path='/session' element={<Session/>}/>
        <Route path='/ParticipantManagement' element={<ParticipantManagement/>}/>
        <Route path='/SessionManagement' element={<SessionManagement/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/schedule' element={<Schedule/>}/>
        <Route path='/attendance' element={<AttendanceManagement/>}/>
        <Route path='/proceedings' element={<ProceedingsManagement/>}/>
      </Routes>
    </Router>
  );
}

export default App;
