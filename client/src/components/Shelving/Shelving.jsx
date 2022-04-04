import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import FolderPath from './FolderPath';
import Folders from './Folders';
import Decks from './Decks';

import { getFolders } from '../../actions/folders';
import { getDecks } from '../../actions/decks';
import { useParams } from 'react-router-dom';
import * as api from '../../api';

const Shelving = () => {
    const { folders, isLoading: foldersIsLoading } = useSelector((state) => state.folders);
    // const { decks, isLoading: decksIsLoading } = useSelector((state) => state.decks);
    const [ folderPath, setFolderPath] = useState([]);
    const dispatch = useDispatch();

    const { id } = useParams();

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

    // if(!folders || !decks || foldersIsLoading || decksIsLoading) {
    if(!folders || foldersIsLoading) {
            return null;
    } 


    return (
        <Container className="workspace">
            <FolderPath folderPath={ folderPath } />

            <Folders id={ id } />

            <Decks id={ id } />
        </Container>
    )
}

const Container = styled.div`
    padding: 1.5em 2.5em 2.5em 2.5em;

`;

export default Shelving;