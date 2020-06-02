import React from 'react';
import Icon from "@material-ui/core/Icon";

export default ({className, to, onClick}) => (
  <button type="button" onClick={onClick} className={`button button--text button--icon ${className}`} aria-label={to}>
    {to==="next"?<Icon color="primary" style={{color:"#0d9eea",fontSize:"50px",position:"absolute",bottom:"0px",right:"5px"}}>keyboard_arrow_right</Icon>:<Icon color="primary" style={{color:"#0d9eea",fontSize:"50px",position:"absolute",bottom:"0px",left:"5px"}}>keyboard_arrow_left</Icon>}
  </button>
);