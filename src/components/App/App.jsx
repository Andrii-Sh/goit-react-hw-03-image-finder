import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { getSearchGallery } from '../../api/pixabayApi';
import { Modal } from '../Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import css from './App.module.css';

const photosPerPage = 12;

export class App extends Component {
  state = {
    query: '',
    galleryItems: [],
    totalItems: '',
    isLoading: false,
    showModal: false,
    modalImg: {
      url: '',
      alt: '',
    },
  };

  async componentDidUpdate(_, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      try {
        this.setState({ isLoading: true });
        const data = await getSearchGallery(query);
        this.setState({
          galleryItems: data.hits,
          totalItems: data.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    this.setState({ query });
  };

  handleLoadmoreImages = async () => {
    const currentPage = Math.ceil(this.state.galleryItems.length / 12);
    const nextPage = currentPage + 1;

    try {
      this.setState({ isLoading: true });
      const data = await getSearchGallery(
        this.state.query,
        nextPage,
        photosPerPage
      );
      this.setState({
        galleryItems: [...this.state.galleryItems, ...data.hits],
        totalItems: data.totalHits,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = item => {
    this.setState(prevState => ({
      showModal: true,
      modalImg: {
        url: item.largeImageURL,
        alt: item.tags,
      },
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({
      showModal: false,
      modalImg: {},
    }));
  };

  render() {
    const { galleryItems, totalItems, isLoading, showModal, modalImg } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <ImageGallery
          galleryItems={galleryItems}
          openModal={this.openModal}
        ></ImageGallery>
        {isLoading && (
          <div className={css.isLoading}>
            <ThreeDots />
          </div>
        )}
        <Button
          onClick={this.handleLoadmoreImages}
          galleryItems={galleryItems}
          totalItems={totalItems}
        ></Button>
        {showModal && (
          <Modal modalImg={modalImg} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
