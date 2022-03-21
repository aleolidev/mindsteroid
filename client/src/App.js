import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import styled from 'styled-components';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
import Folders from './components/Folders/Folders';
// import Hands from './components/Hands';
import CardInput from './components/CardInput';
import Test from './components/Test';
import './App.css';

const App = () => {

    return (
        <BrowserRouter>
            <Container>
                <Navbar />
                <Routes>
                    {/* <Route path="/" exact element={() => <Navigate to="/folder" />}/> */}
                    <Route path="/" element={<Navigate replace to="/folder" />} />
                    <Route path="/folder" element={<Folders />}/>
                    <Route path="/folder/:id" element={<Folders />}/>
                    <Route path="/cardinput" element={<CardInput />} />
                    <Route path="/test" element={<Test />} />
                    {/* <Folders currentFolder={currentFolder}/> */}
                    {/* <Folders /> */}
                </Routes>
                {/* <Decks /> */}
                {/* <Hands /> */}
                {/* <CardInput /> */}
                {/* <Test /> */}
            </Container>
        </BrowserRouter>
    )
}

const Container = styled.div``;

export default App;