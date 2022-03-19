import React from 'react'
import styled from 'styled-components'
import MindsteroidLogo from '../assets/mindsteroid-logo.png'
import { MdSearch } from 'react-icons/md'
import { HiMenu } from 'react-icons/hi'
import { textColor, svgColor, placeholderColor, darkTextColor, borderColor, backgroundLightBlue, inputSvgColor, selectTextColor } from '../utils'
import { Grid, Hidden } from '@material-ui/core';

function Navbar() {
    return (
        <Grid container>
            <NavbarContainer>
                <Hidden mdUp>
                    <Grid item xs={2} md={false} order={{ xs: 1, md: 0}}>
                        <Menu>
                            <HiMenu />
                        </Menu>
                    </Grid>
                </Hidden>
                <Grid item xs={8} md={3} order={{ xs: 1, md: 0}}>
                    <LogoContainer>
                        <Logo src={MindsteroidLogo} />
                        <LogoText>Mindsteroid</LogoText>
                    </LogoContainer>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={false} md={6}  order={{ xs: 3, md: 1}}>
                        <InputContainer>
                            <Icon>
                                <MdSearch />
                            </Icon>
                            <Input type="text" placeholder="Search" />
                        </InputContainer>
                    </Grid>
                </Hidden>
                <Grid item xs={2} md={3}>
                    <ProfileContainer>
                        {/* <Notifications>
                            <HiBell />
                        </Notifications> */}
                        <Profile>
                            <UserIcon src={MindsteroidLogo}/>
                            <Hidden smDown>
                                <UserName>
                                    Alex Olivares
                                </UserName>
                            </Hidden>
                        </Profile>
                    </ProfileContainer>
                </Grid>
            </NavbarContainer>
        </Grid>
    )
}

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4em;
    border-bottom: 1px solid ${ borderColor };
    width: 100%;
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: 960px) {
        justify-content: left;
    }
    align-items: center;  
    height: 4em;
    border-bottom: 1px solid ${ borderColor };
`;

const Logo = styled.img`
    height: 1.5em;
    padding-left: 0;
    @media (min-width: 960px) {
        padding-left: 2em;
    }
`;

const LogoText = styled.h2`
    color: ${darkTextColor};
    font: 1.5rem;
    margin-left: .75rem;
    margin-bottom: -0.5rem;
    font-weight: 600;
    // padding: 0 2.5em 0 0;
`;

const Menu = styled.div`
    height: 2.5rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding-left: 1em;
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

const InputContainer = styled.div`
    display: flex;
    padding: 0 2.5rem 0 2.5rem;
`;

const ProfileContainer = styled.div`
    display: flex;
    padding: 0 2em 0 0;
    justify-content: right;
`;

/*
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
*/

const Profile = styled.div`
    display: flex;
    padding-left: 1em;
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