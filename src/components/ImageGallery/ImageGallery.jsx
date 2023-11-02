import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { StyledUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

function ImageGallery({ toggleModal, photos = [] }) {
  return (
    <StyledUl>
      {photos.map(photo => (
        <ImageGalleryItem toggleModal={toggleModal} key={photo.id} {...photo} />
      ))}
    </StyledUl>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired, 
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired
};