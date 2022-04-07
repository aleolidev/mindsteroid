import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import { backgroundLightBlue, darkTextColor, primaryDarkEmerald, primaryEmerald } from '../../utils';
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
                <CustomTitle>Iniciar sesión</CustomTitle>
                <p style={{padding: 0, margin: '0 0 .5em 0',}}>Saca el máximo provecho a tus horas de estudio.</p>
                <form onSubmit={ handleSubmit }>
                    <Grid container spacing={2}>
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
                                <Button onClick={ switchMode } style={{ color: darkTextColor, fontSize: '.8em'}}>
                                    { isSignup ? '¿Ya tienes una cuenta? Inicia sesión' : '¿Aún no tienes una cuenta? ¡Regístrate!'}
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
    borderRadius: '.75em',
    // padding: '.376em 1.25em',
    margin: '8px',
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
}));

export default Auth