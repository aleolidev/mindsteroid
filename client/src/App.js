import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbars/Navbar';
import Shelving from './components/Shelving/Shelving';
import NewCard from './components/Cards/NewCard';
import Test from './components/Test/Test';
import Deck from './components/Deck/Deck';
import './App.css';
import EditCard from './components/Cards/EditCard';

const AppRouting = () => {

    const location = useLocation();

    const isPageFullSize = () => {
        const pathname = location.pathname.replace(/([^:]\/)\/+/g, "$1");
        return  pathname === '/' || 
            pathname === '/auth' ||
            pathname === '/auth/';
    }

    return (
        <div>
            { !isPageFullSize() ? 
                <Navbar />
                : null
            }
            <Container style={{
                margin: isPageFullSize() ? '0' : '1.5em 2.5em 2.5em 2.5em',
            }}>
                <Routes>
                    {/* <Route path="/" element={<Navigate replace to="/folder" />} /> */}
                    <Route exact path="/" element={<Home />} />
                    <Route strict exact path="/auth" element={<Auth />} />
                    <Route path="/folder" element={<Shelving />}/>
                    <Route path="/folder/:id" element={<Shelving />}/>
                    <Route path="/deck/:id" element={<Deck />} />
                    <Route path="/deck/:id/new-card" element={<NewCard />} />
                    <Route path="/card/:id" element={<EditCard />} />
                    <Route path="/test" element={<Test />} />

                    {/* Removes any trailing slash from all urls */}
                    {/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
                </Routes>
            </Container>
        </div>
    )
}

const App = () => {

    return (
        <BrowserRouter>
            <AppRouting />
        </BrowserRouter>
    )
}

const Container = styled.div`
    margin: ;
`;

export default App;