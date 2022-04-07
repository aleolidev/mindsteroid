import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import styled from 'styled-components';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar';
import Shelving from './components/Shelving/Shelving';
import NewCard from './components/Cards/NewCard';
import Test from './components/Test/Test';
import Deck from './components/Deck/Deck';
import './App.css';
import EditCard from './components/Cards/EditCard';

const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Container>
                <Routes>
                    {/* <Route path="/" element={<Navigate replace to="/folder" />} /> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
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

const Container = styled.div`
    margin: 1.5em 2.5em 2.5em 2.5em;
`;

export default App;