import React from 'react'
import { StyledButton } from './Button.styled'
import PropTypes from 'prop-types';

function Button({children, onClick}) {
  return (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired, 
  onClick: PropTypes.func.isRequired, 
};

export default Button

