import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/password" element={<ChangePassword />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/profile" element={<UpdateProfile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
