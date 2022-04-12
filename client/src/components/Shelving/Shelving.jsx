import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import FolderPath from './FolderPath';
import Folders from './Folders';
import Decks from './Decks';
import Item from './Item';

import { getFolders } from '../../actions/folders';
import { getDecks } from '../../actions/decks';
import { useParams } from 'react-router-dom';
import * as api from '../../api';
import CustomContainer from '../Utils/CustomContainer';
import { MdOutlineAddToPhotos, MdOutlineCreateNewFolder } from 'react-icons/md';
import GrayMindsteroid from '../../assets/gray-mindsteroid.png'
import { backgroundLightBlue } from '../../utils';
import { IoMdFingerPrint } from 'react-icons/io';

const Shelving = () => {
    const { folders, isLoading: foldersIsLoading } = useSelector((state) => state.folders);
    const { decks, isLoading: decksIsLoading } = useSelector((state) => state.decks);

    const [ folderPath, setFolderPath] = useState([]);
    const dispatch = useDispatch();

    const { id } = useParams();

    const foldersRef = useRef();
    const decksRef = useRef();

    const getFolderHierarchy = async () => {
        let currentId = id;
        let hierarchy = [];
        let obj;

        while(currentId !== null && currentId !== undefined) {
            obj = await api.getFolderById(currentId);
            if (obj !== null 
                && obj !== undefined
                && obj.data !== null 
                && obj.data !== undefined
            ) {
                hierarchy.push({name: obj.data.name, _id: obj.data._id});
                try {
                    if (obj.data.parent !== null && obj.data.parent !== undefined) {
                        obj = obj.data.parent.toString();
                    } else {
                        obj = null;
                    }
                } catch (err) {
                    console.log(err);
                    obj = null;
                }
            }
            currentId = obj;
        }

        hierarchy.reverse();

        return hierarchy;
    }
    
    useEffect(() => {
        dispatch(getFolders(id));
        dispatch(getDecks(id));
    }, [dispatch]);


    useEffect(async () => {
        dispatch(getFolders(id));
        dispatch(getDecks(id));
        setFolderPath([...await getFolderHierarchy()]);
    }, [id])

    
    const actions = [
        {action: foldersRef.current?.handleFolderAdd, title: <Item icon={ <MdOutlineCreateNewFolder/ > }>Nueva carpeta</Item>},
        {action: decksRef.current?.handleDeckAdd, title: <Item icon={ <MdOutlineAddToPhotos/ > }>Nuevo mazo</Item>},
    ]

    if(foldersIsLoading || decksIsLoading) {
        return null;
    }

    const noSectionToShow = ((folders === null || folders === undefined || folders.length == 0) && (decks === null || decks === undefined || decks.length == 0))

    return (
        <CustomContainer fullHeight={noSectionToShow} actions={actions} availableSpaces={['blankPage', 'logo', 'addContent']}>
            <Container className="workspace" style={{height: '100%' }}>
                <FolderPath folderPath={ folderPath } lastIsDeck={ false } />
                
                <BlankPage name='blankPage' style={{display: noSectionToShow ? 'flex' : 'none' }}>
                    <img name='logo' src={GrayMindsteroid} />
                    <AddContent name='addContent'>¡Empieza a añadir contenido!</AddContent>
                </BlankPage>

                <CustomContainer actions={actions} availableSpaces={['folderContainer', 'folderGrid', 'folderBox', 'deckContainer', 'deckGrid', 'deckBox']}>
                    <Folders id={ id } ref={ foldersRef } />
                    <Decks id={ id } ref={ decksRef } />
                </CustomContainer>
            </Container>
        </CustomContainer>
    )
}

const Container = styled.div``;

const BlankPage = styled.div`

    &&& {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        img {
            height: 12em;
            margin-bottom: 4em;
        }
    }
`

const AddContent = styled.h2`
    color: ${ backgroundLightBlue };
    font-family: 'Khula', 'Source Sans Pro', sans-serif;
    // margin-bottom: 2em;
`

export default Shelving;