import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Nav from "./components/layouts/Nav";
import Home from "./components/pages/Home";
import JobDetails from "./components/pages/JobDetails";
import Footer from "./components/layouts/Footer";
import Degens from "./components/pages/Degens";
import ViewDegen from "./components/pages/ViewDegen";
import Signup from "./components/pages/Signup";
import UserDashbaord from "./components/pages/UserDashbaord";
import AdminDashboard from "./components/pages/AdminDashboard";
import ScrollToTop from "./components/pages/ScrollToTop";
import PrivateRoute from "./components/pages/PrivateRoute";
import CompleteListing from "./components/pages/CompleteListing";
import Sign from "./components/pages/Sign";

function App() {
  const [signupPopUp, setSignupPopUp] = useState(false);
  return (
    <BrowserRouter>
      <div className="container">
        <ScrollToTop />
        <Nav setSignupPopUp={setSignupPopUp} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="degens" element={<Degens setSignupPopUp={setSignupPopUp}/>} />
          <Route exact path="/degen/:id" element={<ViewDegen />} />
          <Route exact path="/complete-order" element={<CompleteListing />} />
            <Route exact path="/sign" element={<Sign />} />
            <Route element={<PrivateRoute />}>
            <Route exact path="jobs/:id" element={<JobDetails />} />
            <Route exact path="/user/*" element={<UserDashbaord />} />
            <Route exact path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
        <Signup signupPopUp={signupPopUp} setSignupPopUp={setSignupPopUp} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
