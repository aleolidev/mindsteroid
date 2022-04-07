import React, { useState } from 'react'
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-google-login';

import { Button, Grid } from '@material-ui/core';
import { backgroundLightBlue, darkTextColor, googleBlue, googleDarkBlue, primaryBlue, primaryDarkBlue, primaryDarkEmerald, primaryEmerald } from '../../utils';
import Input from './Input';

const Auth = () => {

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showPassword2, setShowPassword2 ] = useState(false);
    const [ isSignup, setIsSignup ] = useState(false);

    const state = null;

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

    return (
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
                                    clientId="GOOGLE ID"
                                    render={(renderProps) => (
                                        <GoogleButton fullWidth><FcGoogle /><span>Iniciar sesión con Google</span></GoogleButton>
                                    )}
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
    )
}

const CustomTitle = styled.h2`

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
    borderRadius: '.5em',
    // padding: '.376em 1.25em',
    margin: '1.75em .5em .5em .5em',
    color: 'white',
    fontSize: '1em',
    fontFamily: '\'Khula\', sans-serif',
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: primaryEmerald,
    transition: '0.2s ease-in-out',
    '&:hover': {
          backgroundColor: primaryDarkEmerald,
          color: 'white',
    },
    span: {
        marginTop: '.05em',
        marginBottom: '-.05em',
    },
}));

const GoogleButton = styled(Button)(() => ({
    borderRadius: '.1em',
    // padding: '.376em 1.25em',
    // margin: '8px',
    color: 'white',
    fontSize: '1em',
    fontFamily: '\'Khula\', sans-serif',
    fontWeight: 400,
    textTransform: 'none',
    padding: '.1em',
    backgroundColor: googleBlue,
    transition: '0.2s ease-in-out',
    '&:hover': {
          backgroundColor: googleDarkBlue,
          color: 'white',
    },
    'span > span': {
        width: '100%',
        marginTop: '.1em',
        marginBottom: '-.1em',
    },
    'span > svg': {
        backgroundColor: 'white',
        padding: '.25em',
        borderRadius: '.1em',
        justifyContent: 'flex-start',
        // marginLeft: '.25em',
        fontSize: '1.6em',
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
        padding: 0 .5em;
        color: ${ darkTextColor };
        position: relative;
        display: inline-block;
    }
`;

export default Auth