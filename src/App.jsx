
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Profile from "./components/profile/profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
