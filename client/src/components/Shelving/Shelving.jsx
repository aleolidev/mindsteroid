import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import FolderPath from './FolderPath';
import Folders from './Folders';
import Decks from './Decks';

import { getFolders } from '../../actions/folders';
import { useParams } from 'react-router-dom';
import * as api from '../../api';

const Shelving = () => {
    const { folders, isLoading } = useSelector((state) => state.folders);
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

    const handleUpdateName = (index, name) => {
        const values = [...folders];
        values[index].name = name
        /* TODO: Uncomment
        setFoldersData(values);
        dispatch(updateFolder(foldersData[index]))*/
    }
    
    useEffect(() => {
        dispatch(getFolders(id));
    }, [dispatch]);


    useEffect(async () => {
        dispatch(getFolders(id));
        setFolderPath([...await getFolderHierarchy()]);
    }, [id])

    if(!folders || isLoading) {
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