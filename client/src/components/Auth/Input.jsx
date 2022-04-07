import React from 'react'
import styled from 'styled-components'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Grid, IconButton, InputAdornment } from '@material-ui/core'

import CustomInput from '../Utils/CustomInput'

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return (
    <CustomGrid item xs={12} md={half ? 6 : 12}>
        <CustomInput 
            name={ name }
            onChange={ handleChange }
            required
            fullWidth
            placeholder={ label }
            autoFocus={ autoFocus }
            type={ type }
            InputProps={ (name === 'password' || name === 'confirmPassword') && {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={ handleShowPassword }>
                            { type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </CustomGrid>
  )
}

const CustomGrid = styled(Grid)(() => ({
    '& .kAjBc .MuiInputBase-input': {
        width: '100%',
    }
}));

export default Input;