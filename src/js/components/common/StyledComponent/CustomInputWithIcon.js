import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {IconSearch} from "../../../containers/Home/images";
import Input from "@material-ui/core/Input/Input";
import React from "react";
import { makeStyles } from '@material-ui/styles';

const CustomInputWithIcon = ({value, handleChange, handleFocus, handleBlur, handleKeyDown, label, style}) => {
  const useStyles = makeStyles(style || {
    root: {
      color: 'white !important',
      height: '35px',
      width: '100%',
      '&::before': {
        borderBottom: 'solid 1px white !important',
        '&::hover': {
          borderBottom: 'solid 1px white !important'
        }
      },
      '&::after': {
        borderBottom: 'solid 1px white !important'
      }
    },
  });
  const classes = useStyles();
  return (
    <Input
      className={classes.root}
      id="adornment-amount"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      startAdornment={
        <InputAdornment position="start">
          {label === 'Search' ?
            <IconSearch/> :
            <img src='/images/Icons/marker/marker-input.svg' alt=''/>
          }
        </InputAdornment>
      }
    />
  )
};

export default CustomInputWithIcon;