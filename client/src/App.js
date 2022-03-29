import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import styled from 'styled-components';
import Navbar from './components/Navbar';
import Folders from './components/Folders/Folders';
import CardInput from './components/CardInput';
import Test from './components/Test';
import './App.css';

const App = () => {

    return (
        <BrowserRouter>
            <Container>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/folder" />} />
                    <Route path="/folder" element={<Folders />}/>
                    <Route path="/folder/:id" element={<Folders />}/>
                    <Route path="/cardinput" element={<CardInput />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

const Container = styled.div``;

export default App;