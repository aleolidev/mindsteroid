import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomInput from './CustomInput';
import { backgroundLightBlue, darkTextColor, primaryRed, primaryEmerald } from '../../utils/index';

export default function CustomDialog( { open, handleClose, handleSave, title, currentValue } ) {
    const inputRef = useRef();

    const submitNewName = (event) => {
        event.preventDefault();
        handleSave(inputRef.current.firstChild.value)
    } 

    return (
        <div>
            <CustomDialogComponent open={open} onClose={handleClose}>
                <form onSubmit= { (e) => submitNewName(e) }>
                    <DialogTitle>{ title }</DialogTitle>
                    <DialogContent>
                    <FormControl variant="standard">
                        <CustomInput autoFocus onFocus={(e) => e.currentTarget.select()} defaultValue={ currentValue } id="bootstrap-input" ref={ inputRef }/>
                    </FormControl>
                    </DialogContent>
                    <DialogActions>
                    <CustomCancelButton onClick={handleClose}>Cancelar</CustomCancelButton>
                    <CustomConfirmButton type="submit">Aceptar</CustomConfirmButton>
                    </DialogActions>
                </form>
            </CustomDialogComponent>
        </div>
    );
}

const CustomDialogComponent = styled(Dialog)(() => ({
    '& .MuiDialogTitle-root': {
        padding: '1.5em 1.5em 1em 1.5em',
    },
    '& .MuiTypography-h6': {
        fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif',
        fontWeight: 600,
        fontSize: '1.4em',
        color: darkTextColor,
    },
    '& .MuiPaper-rounded': {
        borderRadius: '1em',
    },
    '& .MuiDialogActions-root': {
        padding: '1.5em',
        justifyContent: 'space-between',
    },
    '& .MuiButton-root': {
        textTransform: 'none',
    },
}));

const CustomCancelButton = styled(Button)(() => ({
    borderRadius: '.75em',
    padding: '.5em 1.25em',
    color: darkTextColor,
    fontSize: '1em',
    fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif',
    backgroundColor: backgroundLightBlue,
    transition: '0.2s ease-in-out',
    '&:hover': {
          backgroundColor: primaryRed,
          color: 'white',
    },
}));

const CustomConfirmButton = styled(Button)(() => ({
    borderRadius: '.75em',
    padding: '.5em 1.25em',
    color: darkTextColor,
    fontSize: '1em',
    fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif',
    backgroundColor: backgroundLightBlue,
    transition: '0.2s ease-in-out',
    '&:hover': {
          backgroundColor: primaryEmerald,
          color: 'white',
    },
}));