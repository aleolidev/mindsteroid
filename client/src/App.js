import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import styled from 'styled-components';
import Navbar from './components/Navbar';
import Shelving from './components/Shelving/Shelving';
import NewCard from './components/Cards/NewCard';
import Test from './components/Test';
import Deck from './components/Deck/Deck';
import './App.css';
import EditCard from './components/Cards/EditCard';

const App = () => {

    return (
        <BrowserRouter>
            <Container>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/folder" />} />
                    <Route path="/folder" element={<Shelving />}/>
                    <Route path="/folder/:id" element={<Shelving />}/>
                    <Route path="/deck/:id" element={<Deck />} />
                    <Route path="/deck/:id/new-card" element={<NewCard />} />
                    <Route path="/card/:id" element={<EditCard />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

const Container = styled.div``;

export default App;