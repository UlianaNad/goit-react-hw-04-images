import React from 'react';
import { StyledImg, StyledLi } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  toggleModal,
  id,
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <StyledLi
      key={id}
      onClick={() => toggleModal({ id, largeImageURL, tags })
      }
    >
      <StyledImg src={webformatURL} alt={tags} />
    </StyledLi>
  );
}

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired, 
  id: PropTypes.number.isRequired, 
  webformatURL: PropTypes.string.isRequired, 
  largeImageURL: PropTypes.string.isRequired, 
  tags: PropTypes.string.isRequired, 
};

export default ImageGalleryItem;
