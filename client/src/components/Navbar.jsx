import React from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'
import { textColor, placeholderColor, borderColor, backgroundLightBlue, inputSvgColor } from '../utils'

function Navbar() {
    return <NavbarContainer>
        <InputContainer>
            <Icon>
                <MdSearch />
            </Icon>
            <Input type="text" placeholder="Search" />
        </InputContainer>
        <Text>Launch</Text>
    </NavbarContainer>
}

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4em;
    border-bottom: 1px solid ${ borderColor };
`;

const Text = styled.h1`
    font: 1.5rem;
    color: ${ textColor };
    margin: 0;
    padding-right: 1.5em;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 0 12rem 0 2.5rem;
    width: 100%;
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