import React, { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.stayled';
import PropTypes from 'prop-types';

export const Modal = ({isOpen, close, imgInfo}) => {

  useEffect(() =>{
    if(isOpen){
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  },[isOpen])
 

 const  handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };
  const handleKeyDown = ({key}) => {
    if(key === 'Escape'){
      close();
    }
  }
    return (
      <StyledOverlay onClick={handleClickOutside}>
        <StyledModal >
          <img src={imgInfo.largeImageURL} alt={imgInfo.tags} width="800" />
        </StyledModal>
      </StyledOverlay>
    );
}

Modal.propTypes = {
  imgInfo: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  close: PropTypes.func.isRequired,
};