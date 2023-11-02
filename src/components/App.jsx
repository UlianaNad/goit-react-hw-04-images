import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchPhotos, fetchPhotosByQuery } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    loading: false,
    error: null,
    photos: [],
    page: 1,
    per_page: 12,
    q: '',
    total: null,
    isOpen: false,
    imgInfo: null,
  };

  async componentDidMount() {
    const { page, per_page } = this.state;
    this.getPhotos({ page, per_page, fn: fetchPhotos });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, per_page, q } = this.state;
    if (!q && prevState.page !== page) {
      this.getPhotos({ page, per_page, fn: fetchPhotos });
    }
    if (q && (q !== prevState.q || page !== prevState.page)) {
      this.getPhotos({ page, per_page, q: q, fn: fetchPhotosByQuery });
    }
  }

  getPhotos = async ({ page, per_page, q, fn }) => {
    this.setState({ loading: true });
    try {
      const { hits, total } = await fn({
        q: q,
        per_page: per_page,
        page: page,
      });
      // this.setState(prev => ({ photos: [...prev.photos, ...hits], total:total }));
      if (hits && Array.isArray(hits)) {
        this.setState(prev => ({ photos: [...prev.photos, ...hits], total }));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleQuery = q => {
    this.setState({ q, photos: [], page: 1 });
  };

  toggleModal = imgInfo => {
    this.setState(prev => ({ isOpen: !prev.isOpen, imgInfo }));
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { photos, q, isOpen, imgInfo, total, loading } = this.state;

    return (
      <div>
        <Searchbar setQuery={this.handleQuery} />
        {q && (
          <h2>
            We found {total} picture by search word:{q}
          </h2>
        )}
        {loading && !photos.length ? (
          <Loader />
        ) : (
          <ImageGallery toggleModal={this.toggleModal} photos={photos} />
        )}

        {total > photos.length ? (
          <Button onClick={this.handleLoadMore}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        ) : null}
        {isOpen ? (
          <Modal close={this.toggleModal} imgInfo={imgInfo}></Modal>
        ) : null}
        <ToastContainer />
      </div>
    );
  }
}
