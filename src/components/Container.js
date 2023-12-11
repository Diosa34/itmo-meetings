import {Outlet, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Event from "./pages/Event";
import FeedbackForm from "./forms/FeedbackForm";
import Profile from "./pages/Profile";
import CreateChannelForm from "./forms/CreateChannelForm";
import React from "react";
import Header from "./Header";

function Container() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/event" element={<Event />} />
                <Route path="/rating" element={<FeedbackForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/createChannel" element={<CreateChannelForm />} />
            </Routes>
            <Outlet />
        </>

    )
}

export default Container