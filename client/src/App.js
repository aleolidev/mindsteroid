import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDecks } from './actions/decks';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import styled from 'styled-components';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
import Decks from './components/Decks/Decks';
import Folders from './components/Folders/Folders';
// import Hands from './components/Hands';
// import CardInput from './components/CardInput';
// import Test from './components/Test';
import './App.css';

const App = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     // dispatch(getDecks());
    //     // console.log("DISPATCHED IN APP")
    // }, [dispatch]);
    
    const currentFolder = "62373faa8d7f44c7ec8c39a7";

    // const dispatch = useDispatch();

    // const changeRootFolder = (id) => {
    //     setCurrentFolder(id);
    // }

    // console.log('CURRENT FOLDER:', currentFolder)



    return (
        <BrowserRouter>
            <Container>
                <Navbar />
                <Routes>
                    {/* <Route path="/" exact element={() => <Navigate to="/folder" />}/> */}
                    <Route path="/" element={<Navigate replace to="/folder" />} />
                    <Route path="/folder" element={<Folders />}/>
                    <Route path="/folder/:id" element={<Folders />}/>
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

const Container = styled.div`
    // display:flex;
    // height: 96vh;
`;

export default App;