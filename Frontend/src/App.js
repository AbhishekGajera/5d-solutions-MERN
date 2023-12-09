import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainLayout } from "./component/MainLayout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Moment from "./component/Moment";
import Signup from "./component/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import Signin from "./component/Signin";
import MomentsList from "./component/MomentList";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <MainLayout component={<Dashboard />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-moment"
          exact
          element={
            <ProtectedRoute>
              <MainLayout component={<Moment />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moment-list"
          exact
          element={
            <ProtectedRoute>
              <MainLayout component={<MomentsList />} />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
