import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import SearchModal from "./components/pages/SearchModal";

function App() {
  const [signupPopUp, setSignupPopUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    // Handle Escape key press to close signup modal
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setSignupPopUp(false);
      }
    };

    // Handle Command+/ or Ctrl+/ to open search modal
    const handleSearchShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        setSearchModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("keydown", handleSearchShortcut);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleSearchShortcut);
    };
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <ScrollToTop />
        <Nav
          setSignupPopUp={setSignupPopUp}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="degens"
            element={<Degens setSignupPopUp={setSignupPopUp} />}
          />
          <Route exact path="/degen/:id" element={<ViewDegen />} />
          <Route exact path="/complete-order" element={<CompleteListing />} />
          <Route
            exact
            path="/sign"
            element={
              <Sign
                setIsAuthenticated={setIsAuthenticated}
                setSignupPopUp={setSignupPopUp}
              />
            }
          />
          <Route element={<PrivateRoute />}>
            <Route exact path="jobs/:id" element={<JobDetails />} />
            <Route exact path="/user/*" element={<UserDashbaord />} />
            <Route exact path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
        <Signup
          signupPopUp={signupPopUp}
          setSignupPopUp={setSignupPopUp}
          setIsAuthenticated={setIsAuthenticated}
        />
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
