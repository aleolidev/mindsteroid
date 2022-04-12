import styled from "styled-components";
import { InputBase, TextField } from "@material-ui/core";

import { backgroundLightBlue, darkTextColor } from '../../utils/index';

const CustomInput = styled(TextField)`
    /* default */
    .MuiInput-underline:before {
        content: none;
    }
    
    /* hover (double-ampersand needed for specificity reasons. */
    && .MuiInput-underline:hover:before {
        content: none;
    }
    
    /* focused */
    .MuiInput-underline:after {
        content: none;
    }
    
    & .MuiInputBase-input {
        border-radius: 1em;
        position: relative;
        padding: 1em 1.5em;
        color: ${ darkTextColor };
        font-size: 1em;
        font-family: '\'Khula\', \'Source Sans Pro\', sans-serif';
        background-color: ${ backgroundLightBlue };
        font-weight: 600;
        width: 100%;
    }
`

export default CustomInput;