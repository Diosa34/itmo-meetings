import {Outlet, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import Event from "../pages/Event";
import FeedbackForm from "../forms/FeedbackForm";
import Profile from "../pages/Profile";
import CreateChannelForm from "../forms/CreateChannelForm";
import React from "react";
import Header from "./Header";
import Channels from "../pages/ChannelsList";
import Channel from "../pages/Channel";
import MyEvents from "../pages/MyEvents";

function Container() {
    return (
        <>
            <Header />
            <Routes>
                <Route index path="/catalog" element={<MainPage />} />
                    <Route path="/catalog/:id" element={<Event />} />
                <Route path="/rating" element={<FeedbackForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/createChannel" element={<CreateChannelForm />} />
                <Route path="/channels" element={<Channels />} />
                <Route path="/myEvents" element={<MyEvents />} />
                <Route path="/channels/:id" element={<Channel />} />
            </Routes>
            <Outlet />
        </>

    )
}

export default Container