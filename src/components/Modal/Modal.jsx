import React, { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.stayled';
import PropTypes from 'prop-types';

export const Modal = ({isOpen, close, imgInfo}) => {

  useEffect(() =>{
    const handleKeyDown = ({key}) => {
      if(key === 'Escape'){
        close();
      }
    }
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    
  },[close])
 

 const  handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

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