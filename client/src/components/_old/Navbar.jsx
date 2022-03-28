import React from 'react'
import styled from 'styled-components'
import MindsteroidIcon from '../assets/mindsteroid-logo.png'
import { MdSearch } from 'react-icons/md'
import { HiBell } from 'react-icons/hi'
import { textColor, svgColor, placeholderColor, darkTextColor, backgroundLightBlue, inputSvgColor, selectTextColor } from '../utils'

function Navbar() {
    return <NavbarContainer>
        <InputContainer>
            <Icon>
                <MdSearch />
            </Icon>
            <Input type="text" placeholder="Search" />
        </InputContainer>
        <ProfileContainer>
            <Notifications>
                <HiBell />
            </Notifications>
            <Profile>
                <UserIcon src={MindsteroidIcon}/>
                <UserName>
                    Alex Olivares
                </UserName>
            </Profile>
        </ProfileContainer>
    </NavbarContainer>
}

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4em;
    border-bottom: 1px solid ${ backgroundLightBlue };
`;

const Text = styled.h1`
    font: 1.5rem;
    color: ${ textColor };
    margin: 0;
    padding-right: 1.5em;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 0 2.5rem 0 2.5rem;
    width: 60%;
`;

const ProfileContainer = styled.div`
    display: flex;
    padding: 0 2em 0 0;
`;

const Notifications = styled.div`
    height: 2.5rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        color: ${ svgColor };
        font-size: 2rem;    
        transition: 0.2s ease-in-out;
    }
    &:hover {    
        svg {
            color: ${ selectTextColor };
        }
    }
`;

const Profile = styled.div`
    display: flex;
    padding-left: 1em;
    width: 70%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;


const UserIcon = styled.img`
    height: 1.5em;
    // padding: 0 0 0 2em;
`;


const UserName = styled.h3`
    padding-left: .5em;
    margin-bottom: -0.3rem;
    font-weight: 400;
    font-size: 1rem;
    color: ${ darkTextColor };
    white-space: nowrap;
`;

const Icon = styled.div`
    height: 2.5rem;
    width: 3rem;
    background-color: ${ backgroundLightBlue };
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: .75rem;
    border-bottom-left-radius: .75rem;
    svg {
        color: ${ inputSvgColor };
        font-size: 1.4rem;
    }
`;

const Input = styled.input`
    border: none;
    background-color: ${ backgroundLightBlue };
    color: ${ textColor };
    border-top-right-radius: .75rem;
    border-bottom-right-radius: .75rem;
    font-size: 1rem;
    width: 100%;
    &:focus {
        border: none;
        outline: none;
    }
    ::placeholder {
        color: ${ placeholderColor };
    }
`;


export default Navbar