import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components'
import { Button, Divider, Grid, Hidden, MenuItem } from '@material-ui/core';
import { MdLogout, MdSearch } from 'react-icons/md'
import { HiMenu } from 'react-icons/hi'

import MindsteroidLogo from '../../assets/mindsteroid-logo.png'
import DefaultUser from '../../assets/default-user.png';
import { textColor, svgColor, placeholderColor, darkTextColor, backgroundLightBlue, inputSvgColor, selectTextColor, primaryEmerald, primaryDarkEmerald, hoverEffect, lightHoverEffect, primaryRed, primaryRed2 } from '../../utils'
import CustomMenu from '../Utils/CustomMenu';

function Navbar() {

    
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));

    const profileMenuRef = useRef(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        setUser(null);
    }

    const goHome = () => {
        navigate('/');
    }

    const goAuth = () => {
        navigate('/auth');
    }

    const handleMenu = (ref) => {
        profileMenuRef?.current?.handleClick(ref);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT...

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

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
                    <LogoContainer onClick={ () => goHome() }>
                        <Logo src={MindsteroidLogo} />
                        <LogoText>Mindsteroid</LogoText>
                    </LogoContainer>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={false} md={6}  order={{ xs: 3, md: 1}}>
                        {/* TODO: Add search functionality */}
                        <InputContainer>
                            <Icon>
                                <MdSearch />
                            </Icon>
                            <Input type="text" placeholder="Buscar..." />
                        </InputContainer>
                    </Grid>
                </Hidden>

                <Grid item xs={2} md={3}>
                    <ProfileContainer>
                        { user ?
                        (
                                <Profile>
                                    <Hidden smDown>
                                        <UserName>
                                            { user.result.name }
                                        </UserName>
                                    </Hidden>
                                    { user.result.imageUrl ? 
                                        <UserIcon src={ user.result.imageUrl } onClick={ handleMenu }/>
                                        : <UserIcon src={ DefaultUser } onClick={ handleMenu }/>
                                    }
                                    <CustomMenu ref={ profileMenuRef }>
                                        <MenuContainer container>
                                            {/* TODO: Add option to add custom icon */}
                                            { user.result.imageUrl ? 
                                                (<BigUserIcon src={ user.result.imageUrl } />)
                                                : (<BigUserIcon src={ DefaultUser } />)
                                            }
                                            <UserNameTitle>
                                                { user.result.name }
                                            </UserNameTitle>
                                            <Email>{ user.result.email }</Email>
                                            <Divider />
                                            <LogoutButton onClick={ logout }><MdLogout /><span>Cerrar sesión</span></LogoutButton>
                                        </MenuContainer>
                                    </CustomMenu>
                                </Profile>
                        ) : (
                            <LoginButton onClick={ () => goAuth() }>Iniciar sesión</LoginButton>
                        )}
                    </ProfileContainer>
                </Grid>
            </NavbarContainer>
        </Grid>
    )
}

const NavbarContainer = styled.nav`
    &&& {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4em;
        border-bottom: 1px solid ${ backgroundLightBlue };
        width: 100%;
    }
`;

const LogoContainer = styled.div`
    &&& {
        display: flex;
        cursor: pointer;
        justify-content: center;
        @media (min-width: 960px) {
            justify-content: left;
        }
        align-items: center;  
        height: 4em;
        border-bottom: 1px solid ${ backgroundLightBlue };
    }
`;

const Logo = styled.img`
    &&& {
        height: 1.5em;
        padding-left: 0;
        @media (min-width: 960px) {
            padding-left: 2em;
        }
    }
`;

const LogoText = styled.h2`
    &&& {
        color: ${darkTextColor};
        font: 1.5rem;
        margin-left: .75rem;
        margin-bottom: -0.5rem;
        font-weight: 600;
    }
`;

const Menu = styled.div`
    &&& {
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
    }
`;

const InputContainer = styled.div`
    &&& {
        display: flex;
        padding: 0 2.5rem 0 2.5rem;
    }
`;

const ProfileContainer = styled.div`
    &&& {       
        display: flex;
        padding: 0 2em 0 0;
        justify-content: right;
    }
`;

const Profile = styled.div`
    &&& {       
        display: flex;
        padding-left: 1em;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;


const UserIcon = styled.img`
    &&& {       
        height: 2em;
        border-radius: 100%;
        transition: .3s ease-in-out;
        &:hover {
            box-shadow: ${ lightHoverEffect }
        }
    }
`;

const BigUserIcon = styled.img`
    &&& {   
        height: 5em;
        border-radius: 100%;
        border: 2px solid ${ backgroundLightBlue };
    }
`;

const MenuContainer = styled(Grid)`
    &&& {
        display: block;
        text-align: center;
        margin: 1em 0;
        padding: 0 1.5em;
    }
`;

const UserName = styled.h3`
    &&& {
        display: flex;
        align-items: center;
        margin-top: .1em;
        margin-right: .75em;
        height: 100%;
    
        font-weight: 400;
        font-size: 1rem;
        color: ${ darkTextColor };
        white-space: nowrap;
    }
`;

const UserNameTitle = styled.h2`
    &&& {
        font-weight: 600;
        font-size: 1rem;
        color: ${ darkTextColor };
        white-space: nowrap;
    }
`;

const Email = styled.h3`
    &&& {   
        font-weight: 400;
        font-size: .9rem;
        color: ${ darkTextColor };
        white-space: nowrap;
        margin-bottom: 1em;
    }
`

const Icon = styled.div`
    &&& {   
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
    }
`;

const Input = styled.input`
    &&& {
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
    }
`;


const LoginButton = styled(Button)`
    &&& {
        border-radius: .75em;
        padding: .376em 1.25em;
        color: white;
        font-size: 1em;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        font-weight: 600;
        text-transform: none;
        background-color: ${ primaryEmerald };
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: ${ primaryDarkEmerald };
            color: white;
        };
    }
`


const LogoutButton = styled(Button)`
    &&& {
        width: 100%;
        border-radius: .75em;
        padding: .4em 1.1em;
        margin-top: 1.25em;
        color: white;
        font-size: 1em;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        font-weight: 400;
        text-transform: none;
        padding: .1em;
        background-color: ${ primaryRed };
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: ${ primaryRed2 };
            color: white;
        };
        span > span {
            width: 100%;
            margin-top: .1em;
            margin-bottom: -.1em;
        };
        span > svg {
            width: 1em;
            padding: .2em 0;
            margin-left: .5em;
            justify-content: flex-start;
            font-size: 1.6em;
        };
    }
`

export default Navbar