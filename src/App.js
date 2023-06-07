import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import RequireActive from "./Components/Auth/RequireActive";
import RequireAdmin from "./Components/Auth/RequireAdmin";
import RequireAuth from "./Components/Auth/RequireAuth";
import Footer from "./Components/Shared/Footer";
import Header from "./Components/Shared/Header";
import Chat from "./Pages/Chat/Chat";
import AllStudent from "./Pages/Dashboard/AllStudent";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import JobListAdmin from "./Pages/Dashboard/JobListAdmin";
import PostJob from "./Pages/Dashboard/PostJob";
import PostedJobs from "./Pages/Dashboard/PostedJobs";
import Profile from "./Pages/Dashboard/Profile";
import SearchBloodGroup from "./Pages/Dashboard/SearchBloodGroup";
import SearchStudent from "./Pages/Dashboard/SearchStudent";
import AddAcademic from "./Pages/DetailsAdding/AddAcademic";
import AddEmergency from "./Pages/DetailsAdding/AddEmergency";
import AddEmployment from "./Pages/DetailsAdding/AddEmployment";
import AddPersonal from "./Pages/DetailsAdding/AddPersonal";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ShowJob from "./Pages/ShowJob/ShowJob";
import SingleJob from "./Pages/ShowJob/SingleJob";
import SingleStudent from "./Pages/SingleStudent/SingleStudent";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bimtian/:slug" element={<SingleStudent />} />
        <Route path="/blood-donation" element={<SearchBloodGroup />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="bimtian/search" element={<RequireActive><SearchStudent /></RequireActive>} />
          <Route path="bimtian/all" element={<RequireAdmin><AllStudent /></RequireAdmin>} />
          <Route path="job-post-info" element={<RequireAdmin><JobListAdmin /></RequireAdmin>} />
          <Route path="post-job" element={<RequireActive><PostJob /></RequireActive>} />
          <Route path="my-job-list" element={<RequireActive><PostedJobs /></RequireActive>} />
        </Route>
        {/* details adding */}
        <Route path="/bimtian/add/personal" element={<RequireAuth><AddPersonal /></RequireAuth>} />
        <Route path="/bimtian/add/academic" element={<RequireAuth><AddAcademic /></RequireAuth>} />
        <Route path="/bimtian/add/employment" element={<RequireAuth><AddEmployment /></RequireAuth>} />
        <Route path="/bimtian/add/emergency" element={<RequireAuth><AddEmergency /></RequireAuth>} />
        {/* for job */}
        <Route path="/job/all" element={<RequireActive><ShowJob /></RequireActive>} />
        <Route path="/job/:id" element={<RequireActive><SingleJob /></RequireActive>} />
        <Route path="/message" element={<RequireAuth><Chat /></RequireAuth>} />
        <Route path="/forgotPasss/:id/reset" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
