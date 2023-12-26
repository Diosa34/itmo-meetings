import {Route, Routes, BrowserRouter} from "react-router-dom"
import '../style/App.css';
import RegForm from './forms/RegForm';
import React from "react";
import AuthForm from "./forms/AuthForm";
import Container from "./Container";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<AuthForm />} />
                    <Route path="/register" element={<RegForm />} />
                    <Route index path="/login" element={<AuthForm />} />
                    <Route path="/*" element={<Container />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
