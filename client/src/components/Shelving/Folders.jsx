import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { HiOutlinePencil } from 'react-icons/hi'
import { CgTrashEmpty } from 'react-icons/cg'

import Folder from './Folder/Folder';
import CustomDialog from '../Utils/CustomDialog';
import { createFolder, updateFolder } from '../../actions/folders';
import { darkTextColor, primaryEmerald, lightSvg } from '../../utils'
import Item from './Item';

const Folders = forwardRef(({ id }, ref) => {
    
    const { folders } = useSelector((state) => state.folders);
    
    const [ foldersData, setFoldersData ] = useState([]);
    const [ foldersLength, setFoldersLength ] = useState(null);
    const [ foldersLastLength, setFoldersLastLength ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);
    
    const foldersRef = useRef();

    const dispatch = useDispatch();
    
    if (folders !== undefined && folders !== null){
        if (foldersLength === null) {
            setFoldersLastLength(folders.length);
            setFoldersLength(folders.length);
        }
        
        if (folders.length !== foldersLength) {
            setFoldersLength(folders.length);
        }
    }
        
    // Adds a new item to local array of folders
    const handleFolderAdd = () => {
        setFoldersData([{ name: 'Nueva carpeta', parent: id}, ...foldersData])
    }

    // Saves the last created folder
    const handleSubmit = async () => {
        dispatch(await createFolder({...foldersData[0]}, id))
    }

    const handleUpdateName = (index, name) => {
        const values = [...folders];
        console.log(index, name)
        values[index].name = name;
        setFoldersData(values);
        dispatch(updateFolder(foldersData[index]))
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    
    useImperativeHandle(ref, () => ({
        handleFolderAdd
    }));
    
    // If the local array of folders changes his length...
    useEffect(() => {
        if (folders !== undefined) {
            // If new item added to foldersData, insert the new item
            if (foldersData[0] !== undefined && foldersData[0] !== null && foldersData.length > folders.length) {
                handleSubmit()
            }
        }
    }, [foldersData.length])

    
    // If the folders array of the db changes his length...
    useEffect(() => {
        if (foldersRef.current !== undefined 
            && foldersRef.current !== null 
            && foldersRef.current.children[foldersData.length - 1] !== undefined 
            && foldersRef.current.children[foldersData.length - 1] !== null
            && foldersLength > foldersLastLength)
        {
            handleOpenDialog();
        }
        setFoldersLastLength(foldersLength);
    }, [foldersLength])
    

    // Import db changes to local whenever they change...
    useEffect(() => {
        if(folders !== undefined && folders.length > 0) {
            setFoldersData(folders);
        }
    }, [folders])

    const folderActions = [
        {action: null, title: <Item icon={ <HiOutlinePencil/ > }>Cambiar nombre</Item>},
        // TODO: Add delete confirmation
        {action: null, title: <Item icon={ <CgTrashEmpty/ > }>Eliminar</Item>},
    ]
    
    return (
        <div>
            <TitleText>Carpetas</TitleText>
            <TitleUnderline />
            <CustomGrid name="folderContainer" container ref={foldersRef}>
                {/* TODO: Add blank page message */}
                {folders.map((folder, index) => (
                    <Grid name="folderGrid" key={folder._id} item xs={12} sm={6} md={3} >
                        <Folder folder={folder} handleUpdateName={handleUpdateName} folderObj={foldersData[index]} index={index} actions={folderActions}/>
                    </Grid>
                ))}
                <Grid name="folderGrid" item xs={3}></Grid><Grid name="folderGrid" item xs={3}></Grid>
                <Grid name="folderGrid" item xs={3}></Grid><Grid name="folderGrid" item xs={3}></Grid>
            </CustomGrid>
            
            <CustomDialog 
                open={ openDialog } 
                handleClose={ handleCloseDialog } 
                title="Cambiar nombre" 
                currentValue="Nueva carpeta"
                handleSave={(newName) => {
                    handleUpdateName(folders.length - 1, newName);
                    handleCloseDialog();
                }} 
            />
        </div>
    )
})

const CustomGrid = styled(Grid)(() => ({
    paddingBottom: '5em',
}));

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

export default Folders;