import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./store/Contexts.jsx";
import Register from "./components/auth/register";
import Login from "./components/auth/login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/home/Home.jsx";
import Jobs from "./components/jobs/Jobs.jsx";
import PostJob from "./components/jobs/PostJob.jsx";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import JobDetail from "./components/jobs/JobDetail.jsx";
import Application from "./components/Application/Application.jsx";
import MyApplications from "./components/Application/MyApplications.jsx";
import MyJobs from "./components/jobs/MyJobs.jsx";

function App() {
  const { isAuthorized, setAuthorized, user, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
      }
    }
    fetchUser();
  }, [isAuthorized]);

  return <>
    <Router>
      {(isAuthorized) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs/getall" element={<Jobs />} />
        <Route path='/jobs/post' element={<PostJob />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/jobs/me" element={<MyJobs />} />
      </Routes>
      {(isAuthorized) && <Footer />}
      <Toaster />
    </Router>
  </>
}

export default App
