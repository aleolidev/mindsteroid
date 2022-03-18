import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { textColor } from '../utils';
import Navbar from './Navbar';
// import TopLaunches from './launch/TopLaunches';

const Dashboard = () => {
    const [posts, setPosts] = useState({ launches: []})
    
    useEffect(() => {
        async function fetchPostList() {
            const { data } = await axios("http://localhost:8080/v1/launch?callType=scoring")

            setPosts({launches: data})
        }
        fetchPostList()
    }, [setPosts])
    

    return <Container>
        <Navbar />
        <SubContainer>
            <SectionOne>
                <ColumnOne1>
                    <TitleText>Top Launches</TitleText>
                    {/* <TopLaunches data={ posts } /> */}
                </ColumnOne1>
            </SectionOne>
        </SubContainer>
    </Container>
}

const Container = styled.div`
    width: 100%;
    // padding: 0 2.5rem 0 2.5rem;
`;

const SubContainer = styled.div`
    margin: 2rem 0;
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 3rem;
`;

const TitleText = styled.h3`
    color: ${textColor};
`;

const SectionOne = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    gap: 2rem;
    width: 100%;
`;

const SectionTwo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    width: 45%;
`;

const ColumnOne1 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 2.5em;
`;

const ColumnOne2 = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    gap: 3rem;
`;

const ColumnTwo2 = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    gap: 3rem;
`;

const ColumnThree2 = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    gap: 3rem;
`;

const Row2 = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`;

export default Dashboard