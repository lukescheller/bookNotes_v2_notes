import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
// import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavBar";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />
        <Routes>
          //public routes
          {/*Create landing page <Route exact path="/signin" element={<SignIn />} /> */}
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          //private routes
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          //not found
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
