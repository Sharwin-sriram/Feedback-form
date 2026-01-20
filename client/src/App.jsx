import Login from "@components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home.jsx";
import Signup from "@components/Signup.jsx";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
