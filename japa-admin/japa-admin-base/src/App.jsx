import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Home from "./Components/Admin/Home";
import PostJobs from "./Components/Admin/PostJobs";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />}></Route>
          <Route path="/admin/postjob" element={<PostJobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
