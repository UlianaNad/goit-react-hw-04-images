import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchPhotos, fetchPhotosByQuery } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [q, setQ] = useState('');
  const [total, setTotal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imgInfo, setImgInfo] = useState(null);

  console.log(error);

  useEffect(() => {
    const getPhotos = async ({ page, q, fn }) => {
      try {
        setLoading(true);
        const { hits, total } = await fn({
          q: q,
          page: page,
        });
        setPhotos(prev => [...prev, ...hits]);
        setTotal(total);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (q) {
      getPhotos({ page, q: q, fn: fetchPhotosByQuery });
    } else {
      getPhotos({ page, fn: fetchPhotos });
    }
  }, [page, q, setError]);

  const handleQuery = q => {
    setQ(q);
    setPhotos([]);
    setPage(1);
  };

  const toggleModal = imgInfo => {
    setIsOpen(prev => !prev);
    setImgInfo(imgInfo);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <Searchbar handleQuery={handleQuery} />
      {q && (
        <h2>
          We found {total} picture by search word:{q}
        </h2>
      )}
      {loading && !photos.length ? (
        <Loader />
      ) : (
        <ImageGallery toggleModal={toggleModal} photos={photos} />
      )}

      {total > photos.length ? (
        <Button onClick={handleLoadMore}>
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      ) : null}
      {isOpen ? (
        <Modal close={toggleModal} imgInfo={imgInfo} isOpen={isOpen}></Modal>
      ) : null}
      <ToastContainer />
    </div>
  );
};
