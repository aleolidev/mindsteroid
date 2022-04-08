import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';
import DialogTitle from '@material-ui/core/DialogTitle';
import { backgroundLightBlue, darkTextColor, primaryRed, primaryEmerald } from '../../utils/index';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export default function ConfigDialog( { open, handleClose, title, keepAdding, keepAddingHandle } ) {
    const inputRef = useRef();

    return (
        <div>
            <ConfigDialogComponent open={open} onClose={handleClose}>
                {/* <form onSubmit= { handleClose }> */}
                <form>
                    <DialogTitle>{ title }</DialogTitle>
                    <DialogContent>
                        <CustomCheckbox control={<Checkbox checked={ keepAdding } onChange={ keepAddingHandle } />} label="Continuar creando tarjetas" />
                    </DialogContent>
                    <DialogActions>
                        <CustomCancelButton onClick={handleClose}>Cancelar</CustomCancelButton>
                        <CustomConfirmButton onClick={handleClose}>Aceptar</CustomConfirmButton>
                    </DialogActions>
                </form>
            </ConfigDialogComponent>
        </div>
    );
}

const ConfigDialogComponent = styled(Dialog)(() => ({
    '& .MuiDialogTitle-root': {
        padding: '1.5em 1.5em .5em 1.5em',
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
        padding: '.5em 1.5em 1.5em 1.5em',
        justifyContent: 'space-between',
    },
    '& .MuiButton-root': {
        textTransform: 'none',
    },
}));

const CustomCancelButton = styled(Button)(({ theme }) => ({
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

const CustomConfirmButton = styled(Button)(({ theme }) => ({
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

const CustomCheckbox = styled(FormControlLabel)(() => ({
    '& .MuiButtonBase-root': {
        position: 'relative',
        // padding: '1em 1.5em',
        color: primaryEmerald,
        // fontSize: '1em',
        // fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif',
        // backgroundColor: backgroundLightBlue,
        // fontWeight: 600,
        // width: 'auto',
    },
    '& .MuiTypography-root': {
        fontFamily: '\'Khula\', \'Source Sans Pro\', sans-serif',
        color: darkTextColor,
        marginTop: '.25em',
    }
}));