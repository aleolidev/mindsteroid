import * as React from 'react';
import { alpha, styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';
import DialogTitle from '@material-ui/core/DialogTitle';
import { backgroundLightBlue, darkTextColor, primaryRed, primaryEmerald } from '../utils/index';

export default function CustomDialog( { open, handleClose, title, currentValue } ) {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            <CustomDialogComponent open={open} onClose={handleClose}>
                <DialogTitle>{ title }</DialogTitle>
                <DialogContent>
                <FormControl variant="standard">
                    <CustomInput defaultValue={ currentValue } id="bootstrap-input" />
                </FormControl>
                </DialogContent>
                <DialogActions>
                <CustomCancelButton onClick={handleClose}>Cancelar</CustomCancelButton>
                <CustomConfirmButton onClick={handleClose}>Aceptar</CustomConfirmButton>
                </DialogActions>
            </CustomDialogComponent>
        </div>
    );
}

const CustomDialogComponent = styled(Dialog)(() => ({
    '& .MuiDialogTitle-root': {
        padding: '1.5em 1.5em 1em 1.5em',
    },
    '& .MuiTypography-h6': {
        fontFamily: '\'Khula\', sans-serif',
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

const CustomCancelButton = styled(Button)(({ theme }) => ({
    borderRadius: '1em',
    padding: '.5em 1.25em',
    color: darkTextColor,
    fontSize: '1em',
    fontFamily: '\'Khula\', sans-serif',
    backgroundColor: backgroundLightBlue,
    transition: '0.2s ease-in-out',
    '&:hover': {
          backgroundColor: primaryRed,
          color: 'white',
    },
}));

const CustomConfirmButton = styled(Button)(({ theme }) => ({
    borderRadius: '1em',
    padding: '.5em 1.25em',
    color: darkTextColor,
    fontSize: '1em',
    fontFamily: '\'Khula\', sans-serif',
    backgroundColor: backgroundLightBlue,
    transition: '0.2s ease-in-out',
    '&:hover': {
          backgroundColor: primaryEmerald,
          color: 'white',
    },
}));

const CustomInput = styled(InputBase)(() => ({
    // 'label + &': {
    //   marginTop: theme.spacing(3),
    // },
    '& .MuiInputBase-input': {
      borderRadius: '1em',
      position: 'relative',
      padding: '1em 1.5em',
      color: darkTextColor,
      fontSize: '1em',
      fontFamily: '\'Khula\', sans-serif',
      backgroundColor: backgroundLightBlue,
    //   border: '1px solid #ced4da',
      fontWeight: 600,
      width: 'auto',
    //   padding: '10px 12px',
    },
}));