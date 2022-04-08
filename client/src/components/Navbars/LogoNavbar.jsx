import React from 'react'
import styled from 'styled-components';

import MindsteroidLogo from '../../assets/mindsteroid-logo.png';
import { backgroundLightBlue, darkTextColor } from '../../utils';

const LogoNavbar = ({ logoHandle }) => {
  return (
    <LogoContainer>
        <Logo onClick={ logoHandle }>
            <LogoIcon src={MindsteroidLogo} />
            <LogoText>Mindsteroid</LogoText>
        </Logo>
    </LogoContainer>
  )
}


const LogoContainer = styled.div`
    position: fixed;
    width: 100%;    
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
    background-color: white;
    border-bottom: 1px solid ${ backgroundLightBlue };
`;

const Logo = styled.div`
    display:flex;
`

const LogoIcon = styled.img`
    height: 2em;
    padding-left: 0;
`;

const LogoText = styled.h2`
    color: ${ darkTextColor };
    font-size: 1.5rem;
    margin-left: .75rem;
    margin-bottom: -0.5rem;
    font-weight: 600;
`;

export default LogoNavbar