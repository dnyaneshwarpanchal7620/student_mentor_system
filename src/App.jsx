
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import LoginAdmin from  "./component/LoginAdmin";
import Home from './component/Home';
import LoginMentor from "./component/LoginMentor";
import LoginStudent from"./component/LoginStudent";
import AdminDashboard from './component/AdminDashboard';
import MentorDashboard from './component/MentorDashboard';
import StudentDashboard from './component/StudentDashboard';
import UploadWork from './component/UploadWork';
import StudentSignUp from './component/StudenSignUp';
import StudentLogUp from './component/StudentLogUp';
import MentorSignup from './component/MentorSignup';
import MentorLogin from './component/MentorLogin';
function App() {
  

  return (
    <>
       <Router>
          <Routes>
             < Route path="/" element={<Home/>}/>

             {/* login pages */}
             <Route path="/login/admin" element={<LoginAdmin />} />
             <Route path="/login/mentor" element={<LoginMentor/>}/>
             <Route path="/login/student" element={<LoginStudent/>}/>
            
             {/* Dashboard pages */}
             <Route path="/admin/dashboard" element={<AdminDashboard/>} />
             <Route path="/mentor/dashboard" element={<MentorDashboard/>} />
             <Route path="/student/dashboard" element={<StudentDashboard/>} />
             <Route path="/upload" element={<UploadWork/>} />

             {/* student login page */}
             <Route path="/student/signup" element={<StudentSignUp/>} />
             <Route path="/student/login" element={<StudentLogUp />} />

             {/* mentor login page */}
             <Route path="/mentor/signup" element={<MentorSignup/>}/>
             <Route path="/mentor/login" element={<MentorLogin/>}/>

          </Routes>
       </Router>  
    </>
  )
}

export default App
