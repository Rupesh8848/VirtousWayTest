import { Routes, Route, Navigate } from "react-router-dom";
import HomeRoute from "./Routes/HomeRoute";
import Navbar from "./Components/Navbar";
import "./App.css";
import Login from "./Routes/Login";
import SignUp from "./Routes/SignUp";
import NoteRoute from "./Routes/NoteRoute";
import NewNoteRoute from "./Routes/NewNoteRoute";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { userIsLoggedIn } = useSelector((state) => state?.user);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route index element={<HomeRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/note"
          element={userIsLoggedIn ? <NoteRoute /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/note/new"
          element={
            userIsLoggedIn ? <NewNoteRoute /> : <Navigate to={"/login"} />
          }
        />
        <Route path="*" element={<HomeRoute />} />
      </Routes>
    </div>
  );
}

export default App;
