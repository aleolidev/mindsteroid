import React from 'react'
import styled from 'styled-components'
import MindsteroidLogo from '../assets/mindsteroid-logo.png'
import { MdContentCopy, MdOutlineAnalytics, MdOutlineAccountBalanceWallet, MdOutlineSettings, MdOutlineExitToApp } from 'react-icons/md'
import { RiSettings5Fill, RiBarChart2Fill, RiHome5Fill, RiBookFill } from 'react-icons/ri'
import { TiHome } from 'react-icons/ti'
import { HiViewGrid, HiChartBar } from 'react-icons/hi'
import { textColor, svgColor, selectTextColor, backgroundLightBlue, darkTextColor } from '../utils'

function Sidebar() {
    return <Container>
        <LogoContainer>
            <Logo src={MindsteroidLogo} />
            <LogoText>Mindsteroid</LogoText>
        </LogoContainer>
        <LinksContainer>
            <Links>
                <Link>
                    <TiHome />
                    <h3>Home</h3>
                </Link>
                <Link>
                    <HiViewGrid />
                    <h3>Decks</h3>
                </Link>
                <Link>
                    <HiChartBar />
                    <h3>Marks</h3>
                </Link>
                <Link>
                    <RiSettings5Fill />
                    <h3>Settings</h3>
                </Link>
            </Links>
        </LinksContainer>
    </Container>
}

const Container = styled.div`
    // width: 20%;
    height: 100% !important;
    // margin: 0 2.5rem 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 3rem;
    border-right: 1px solid ${ backgroundLightBlue };
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;  
    height: 4em;
    border-bottom: 1px solid ${ backgroundLightBlue };
`;

const Logo = styled.img`
    height: 1.5em;
    padding: 0 0 0 2em;
`;

const LogoText = styled.h2`
    color: ${darkTextColor};
    font: 1.5rem;
    margin-left: .75rem;
    margin-bottom: -0.5rem;
    font-weight: 600;
    padding 0 2.5em 0 0;
`;

const LinksContainer = styled.div`
    width: 100%;
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Links = styled.div`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Link = styled.div`
    padding: .2rem 0 .2rem .5rem;
    margin: .9rem 0 .9rem 0;
    border-radius: 1rem;
    display: flex;
    gap: 1rem;
    color: ${ textColor };
    cursor: pointer;
    transition: 0.2s ease-in-out;
    h3 {
        font-weight: 400;
        font-size: 1rem;
    }
    svg {
        font-size: 1.8rem;
        margin-top: -.25rem;
        color: ${ svgColor };
        transition: 0.2s ease-in-out;
    }
    &:hover {    
        color: ${selectTextColor};
        h3 {
            font-weight: 600;
        }
        svg {
            color: ${ selectTextColor };
        }
    }
    &:active {    
        color: ${selectTextColor};
        h3 {
            font-weight: 600;
        }
        svg {
            color: ${ selectTextColor };
        }
    }
`;

export default Sidebar