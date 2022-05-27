import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Welcome />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/signup" exact element={<Signup />}></Route>
        <Route
          path="/dashboard"
          exact
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
