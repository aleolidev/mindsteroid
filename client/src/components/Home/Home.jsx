import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Grid, Snackbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login';

import '../../utils/full-screen.css'
import MindsteroidHome from '../Utils/SVGs/MindsteroidHome';
import { backgroundLightBlue, darkTextColor, getUserId, googleBlue, googleDarkBlue, primaryDarkEmerald, primaryEmerald, primaryRed } from '../../utils';
import LogoNavbar from '../Navbars/LogoNavbar';
import { firstLoginFolder, signup } from '../../actions/auth';
import { getUserByEmail, getUserByGoogleId } from '../../api';
import { Alert } from '@material-ui/lab';

const Home = () => {

    const [ snackbarOpen, setSnackbarOpen ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            let localUser = await getUserByEmail(result.email);
            localUser = localUser?.data?.result
            
            if(!localUser || localUser?.isGoogleAccount ) {
                let { data: user} = await getUserByGoogleId(result.googleId);
                if (!user.result) 
                {
                    const customData = { 
                        firstName: result.givenName,
                        lastName: result.familyName,
                        email: result.email,
                        googleId: result.googleId,
                        isGoogleAccount: true,
                        imageUrl: result.imageUrl,
                    }
                    await dispatch(signup(customData, navigate));
                    const res = await (getUserByGoogleId(result.googleId))
                    user = res.data
                    await dispatch(firstLoginFolder(getUserId(user)))
                }
                dispatch({ type: 'AUTH', data: { result: user.result, token } });
    
                navigate('/folder/' + getUserId(user))
            } else {
                handleClickSnackbar()
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    const googleFailure = () => {
        console.error('No ha sido posible iniciar sesión con Google. Inténtalo más tarde')    
    };
    
    const handleSignIn = () => {
        navigate('/auth')
    }
    const handleClickSnackbar = () => {
        setSnackbarOpen(true);
    };
    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    
    useEffect(async () => {    
        let user = JSON.parse(localStorage.getItem('profile'))?.result;
        
        if (user) {
            let pathId;
            if (user.googleId) {
                user = await getUserByGoogleId(user.googleId)
                pathId = getUserId(user.data)
            } else {
                pathId = user._id;
            }
            
            navigate('/folder/' + pathId)
        }
    })

    return (
        <FullScreen>
            <LogoNavbar logoHandle={ null } />
            <Grid container style={{height: '100%'}}>
                {/* <Grid item xs={12} style={{margin: 0, padding: 0,}}> */}
                {/* </Grid> */}
                <Grid item xs={12} md={5}>
                    <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                        <MainContent>
                            <HeaderText>Mindsteroid</HeaderText>
                            <DescriptionText><i>«Active recall»</i> y <i>«spaced repetition»</i>. El mejor y más eficiente método de estudio según la ciencia.</DescriptionText>
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
                            <SigninButton onClick={ handleSignIn } fullWidth>
                                Iniciar sesión
                            </SigninButton>
                        </MainContent>
                    </Box>
                </Grid>
                <Grid item container xs={12} md={7} alignContent='flex-end'>
                    <HomeBackground />
                </Grid>
            </Grid>

            {/* Snackbar */}
            <CustomSnackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Ya existe una cuenta no vinculada a Google con este correo
                </Alert>
            </CustomSnackbar>
        </FullScreen>
    )
}

const FullScreen = styled.div`
    height: 100vh;
    margin: 0;
    padding: 0;
    // overflow: hidden;
`;

const HomeBackground = styled(MindsteroidHome)`
    // position: relative;
    margin: 0;
    padding: 0;
    // right: 0;
    // bottom: 0;
    width: 100%;
`;

const MainContent = styled.div`
    // margin-top: -8em;
    max-width: 360px;
    text-align: left;
    @media (max-width: 959px) {
        text-align: center;
        margin: 5em 0;
    }
`;

const HeaderText = styled.h1`
    color: ${ darkTextColor };
    font-size: 3rem;
    margin-left: .75rem;
    font-weight: 800;
`;

const DescriptionText = styled.h3`
    color: ${ darkTextColor };
    font-size: 1.75rem;
    margin-left: .75rem;
    font-weight: 400;
`;

const GoogleButton = styled(Button)(() => ({
    marginTop: '2.5em !important',
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

const SigninButton = styled(Button)(() => ({
    borderRadius: '.5em !important',
    margin: '.75em 0 .5em 0 !important',
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
    margin: .75em 0 0 0;

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

const CustomSnackbar = styled(Snackbar)(() => ({
    '&&&': {
        '& .MuiPaper-root': {
            fontWeight: 600,
            color: 'white',
        },
        '& .MuiAlert-standardSuccess': {
            backgroundColor: primaryEmerald,
        },
        '& .MuiAlert-standardError': {
            backgroundColor: primaryRed,
        },
        '& .MuiAlert-icon': {
            color: 'white',
        },
    }
}));

export default Home