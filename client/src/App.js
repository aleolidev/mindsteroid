import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDecks } from './actions/decks';

import styled from 'styled-components';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
import Decks from './components/Decks/Decks';
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDecks());
    }, [dispatch]);

    return <Container>
        <Navbar />
        <Decks />
        {/* <Hands /> */}
        {/* <CardInput /> */}
        {/* <Test /> */}
    </Container>
}

const Container = styled.div`
    // display:flex;
    // height: 96vh;
`;

export default App;