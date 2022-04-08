import React, { useState } from 'react'
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';

import { Button, Grid } from '@material-ui/core';
import { backgroundLightBlue, darkTextColor, googleBlue, googleDarkBlue, primaryBlue, primaryDarkBlue, primaryDarkEmerald, primaryEmerald } from '../../utils';
import Input from './Input';
import LogoNavbar from '../Navbars/LogoNavbar';

const Auth = () => {

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showPassword2, setShowPassword2 ] = useState(false);
    const [ isSignup, setIsSignup ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleShowPassword2 = () => {
        setShowPassword2((prevShowPassword) => !prevShowPassword);
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
        setShowPassword2(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });

            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    const googleFailure = () => {
        console.error('No ha sido posible iniciar sesión con Google. Inténtalo más tarde')    
    };

    const goHome = () => {
        navigate('/')
    }


    return (
        <div>
            <NavbarContainer>
                <LogoNavbar logoHandle={ goHome }/>
            </NavbarContainer>
            <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{
                    marginTop: '3em',
                }}>

                <SignupContainer item xs={10} sm={8} md={12}>
                    <CustomTitle>{ isSignup ? 'Registrarse' : 'Iniciar Sesión'}</CustomTitle>
                    <p style={{padding: 0, margin: '0 0 1.5em 0',}}>Saca el máximo provecho a tus horas de estudio.</p>
                    <form onSubmit={ handleSubmit }>
                        <Grid container spacing={2}>
                            { !isSignup && 
                                <GoogleContainer>
                                    <GoogleLogin 
                                        clientId={ process.env.REACT_APP_GOOGLE_ID }
                                        render={(renderProps) => (
                                            <GoogleButton fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                <FcGoogle /><span>Iniciar sesión con Google</span>
                                            </GoogleButton>
                                        )}
                                        onSuccess={ googleSuccess }
                                        onFailure={ googleFailure }
                                        cookiePolicy='single_host_origin'
                                    />
                                    <LineContainer>
                                        <HorizontalLine><p>o</p></HorizontalLine>
                                    </LineContainer>
                                </GoogleContainer>
                            }
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="Nombre" handleChange={ handleChange } autoFocus half />
                                        <Input name="secondName" label="Apellidos" handleChange={ handleChange } half />                        
                                    </>
                                )
                            }
                            <Input name="email" label="Correo electrónico" handleChange={ handleChange } type='email' />
                            <Input name="password" label="Contraseña" handleChange={ handleChange } type={ showPassword ? 'text' : 'password' } handleShowPassword={ handleShowPassword } />
                            { isSignup && <Input name="confirmPassword" label="Repetir contraseña" handleChange={handleChange} type={ showPassword2 ? 'text' : 'password' } handleShowPassword={ handleShowPassword2 }/> }
                            <SigninButton type='submit' fullWidth>
                                { isSignup ? 'Registrarse' : 'Iniciar Sesión'}
                            </SigninButton>
                            <Grid container justifyContent='flex-end'>
                                <Grid item>
                                    <Button onClick={ switchMode } style={{ color: darkTextColor, fontSize: '.8em', textTransform: 'none',}}>
                                        { isSignup ? '¿Ya dispones de una cuenta? Inicia sesión' : '¿Todavía no dispones de una cuenta? ¡Regístrate!'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </SignupContainer>
            </Grid>
        </div>
    )
}

const CustomTitle = styled.h2`

`;

const NavbarContainer = styled.div`
    & > div {
        position: static !important;
        width: 100% !important;
    }
`;

const SignupContainer = styled(Grid)(() => ({
    padding: '2em 1.5em 2em 1.5em',
    border: `1px solid ${ backgroundLightBlue }`,
    borderRadius: '.75em',
    width: '100%',
    boxShadow: '0 0 2em 0 rgba(0, 0, 0, 0.15)',
    color: darkTextColor,

    '@media (min-width: 960px)': {
        width: '50%',
    },
    '@media (min-width: 1024px)': {
        width: '42.5%',
    },
    '@media (min-width: 1200px)': {
        width: '35%',
    },
    '@media (min-width: 1440px)': {
        width: '27.5%',
    },
    
}));

const SigninButton = styled(Button)(() => ({
    borderRadius: '.5em !important',
    margin: '1.75em .5em .5em .5em !important',
    color: 'white !important',
    fontSize: '1em !important',
    fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif !important',
    fontWeight: '600 !important',
    textTransform: 'none !important',
    backgroundColor: `${ primaryEmerald } !important`,
    transition: '0.2s ease-in-out !important',
    '&:hover': {
          backgroundColor: `${ primaryDarkEmerald }  !important`,
    },
    span: {
        marginTop: '.05em !important',
        marginBottom: '-.05em !important',
    },
}));

const GoogleButton = styled(Button)(() => ({
    borderRadius: '.1em !important',
    color: 'white !important',
    fontSize: '1em !important',
    fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif  !important',
    fontWeight: '400 !important',
    textTransform: 'none !important',
    padding: '.1em !important',
    backgroundColor: `${ googleBlue }!important`,
    transition: '0.2s ease-in-out !important',
    '&:hover': {
          backgroundColor: `${ googleDarkBlue }!important`,
    },
    'span > span': {
        width: '100% !important',
        marginTop: '.1em !important',
        marginBottom: '-.1em !important',
    },
    'span > svg': {
        backgroundColor: 'white !important',
        padding: '.25em !important',
        marginLeft: '.025em !important',
        borderRadius: '.1em !important',
        justifyContent: 'flex-start !important',
        fontSize: '1.6em !important',
    },
}));

const GoogleContainer = styled.div`
    width: 100%;
    margin: .5em;
`;

const LineContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const HorizontalLine = styled.span`
    display: block;
    position: relative;
    text-align: center;
    width: 80%;
    margin: 1em 0 0 0;

    &:before {
        content: "";
        top: .75em;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${ darkTextColor };
        display: inline-block;
        position: absolute;
    }
    
    p {
        margin: 0;
        background-color: white;
        padding: 0 1em;
        color: ${ darkTextColor };
        position: relative;
        display: inline-block;
    }
`;

export default Auth