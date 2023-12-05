import {Route, Routes, Link, HashRouter, BrowserRouter} from "react-router-dom"
import './App.css';
import RegForm from './forms/RegForm';
import MainPage from './MainPage';
import Header from "./Header";
import Event from "./Event";
import React from "react";
import Profile from "./Profile";
import FeedbackForm from "./forms/FeedbackForm";
import AuthForm from "./forms/AuthForm";
import CreateChannelForm from "./forms/CreateChannelForm";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<RegForm />} />
                    <Route path="/" element={<Header />} />
                    <Route path="/main" element={<MainPage />} />
                        <Route path="event" element={<Event />} />
                        <Route path="rating" element={<FeedbackForm />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="auth" element={<AuthForm />} />
                        <Route path="register" element={<RegForm />} />
                        <Route path="createChannel" element={<CreateChannelForm />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
