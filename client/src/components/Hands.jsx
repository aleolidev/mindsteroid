import React from 'react'
import styled from 'styled-components'
import { HiOutlinePlus } from 'react-icons/hi'
import { backgroundLightGray, darkTextColor, primaryEmerald, backgroundLightBlue, primaryYellow, inputSvgColor, selectTextColor } from '../utils'
import { Grid } from '@material-ui/core';

function folders() {
    return (
        <Container>
            <TitleText>Manos</TitleText>
            <TitleUnderline />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={2}>
                    <NewFolder>
                        <NewFolderIcon>
                            <HiOutlinePlus />
                        </NewFolderIcon>
                    </NewFolder>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Hand>
                        <HandTitle>Tema 1</HandTitle>
                        <HandStatus style={{backgroundColor: primaryEmerald, color: 'white'}}>
                            <HandStatusText>10/10</HandStatusText>
                        </HandStatus>
                    </Hand>
                    <Practice>
                        <PracticeText>    
                            Practicar
                        </PracticeText>
                    </Practice>
                    <Study>
                        <StudyText>
                            Estudiar
                        </StudyText>
                    </Study>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Hand>
                        <HandTitle>Tema 2</HandTitle>
                        <HandStatus style={{backgroundColor: '${ primaryYellow }', color: 'white'}}>
                            <HandStatusText>7/10</HandStatusText>
                        </HandStatus>
                    </Hand>
                    <Practice>
                        <PracticeText>    
                            Practicar
                        </PracticeText>
                    </Practice>
                    <Study>
                        <StudyText>
                            Estudiar
                        </StudyText>
                    </Study>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Hand>
                        <HandTitle>Tema 3</HandTitle>
                        <HandStatus>
                            <HandStatusText>0/10</HandStatusText>
                        </HandStatus>
                    </Hand>
                    <Practice>
                        <PracticeText>    
                            Practicar
                        </PracticeText>
                    </Practice>
                    <Study>
                        <StudyText>
                            Estudiar
                        </StudyText>
                    </Study>
                </Grid>
            </Grid>
        </Container>
    )
}

const Container = styled.div`
    padding: 2.5em;
`;

const NewFolder = styled.div`
    width: 75%;
    height: 7.5em;
    padding: 1em;
    margin: 1em 2em 1em 0;
    border: dashed 3px  ${inputSvgColor};
    border-radius: 1em;
    transition: 0.2s ease-in-out;
    vertical-align: middle;
    cursor: pointer;
    &:hover {   
        border: dashed 3px  ${selectTextColor}; 
        svg {
            color: ${ selectTextColor };
        }
    }
`;

const NewFolderIcon = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        margin: 0;
        padding: 0;
        color: ${ inputSvgColor };
        font-size: 2rem;    
        transition: 0.2s ease-in-out;
    }
    &:hover {    
        svg {
            color: ${ selectTextColor };
        }
    }
`;

const Hand = styled.div`
    position: relative;
    width: 75%;
    height: 4.75em;
    padding: 1em 1em 0 1em;
    margin: 1em 0 0 0;
    background-color: ${ backgroundLightBlue };
    border-radius: 1em 1em 0 0;
    cursor: pointer;
`;

const HandTitle = styled.h4`
    color: ${darkTextColor};
    font-weight: 600;
    position: absolute;
`;


const HandStatus = styled.div`
    position: absolute;
    right: -.5em;
    top: -.5em;
    background-color: ${ backgroundLightGray };
    height: 1em;
    padding: .3em 1em 0 1em;
    border-radius: 1em;
`;

const HandStatusText = styled.p`
    font-weight: 600;
    font-size: .8em;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
`;

const Practice = styled.div`
    width: 75%;
    height: 1.875em;
    text-align: center;
    vertical-align: middle;
    padding: 0 1em 0 1em;
    margin: 0;
    background-color: ${ backgroundLightBlue };
    color: ${ darkTextColor };
    font-weight: 600;
    border-top: 1px solid ${ backgroundLightGray };
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        p {
            color: white;
        }
        background-color: ${ primaryYellow };   
        border-top: 1px solid ${ backgroundLightBlue };
    }
`;

const PracticeText = styled.p`
    font-weight: 600;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
`;

const Study = styled.div`
    width: 75%;
    height: 1.875em;
    text-align: center;
    padding: 0 1em 0 1em;
    margin: 0;
    background-color: ${ backgroundLightBlue };
    border-radius: 0 0 1em 1em;
    color: ${ darkTextColor };
    font-weight: 600;
    border-top: 1px solid ${ backgroundLightGray };
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        p {
            color: white;
        }
        background-color: ${ primaryEmerald };   
        border-top: 1px solid ${ backgroundLightBlue };
    }
`;

const StudyText = styled.p`
    font-weight: 600;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
`;

const TitleText = styled.h1`
    color: ${darkTextColor};
    font-weight: 600;
`;

const TitleUnderline = styled.div`
    width: 0;
    padding: 0 0 .25em 2.5em;
    margin-top: -1em;
    margin-bottom: 1em;
    border-radius: 2em;
    background-color: ${primaryEmerald};
`;

export default folders;