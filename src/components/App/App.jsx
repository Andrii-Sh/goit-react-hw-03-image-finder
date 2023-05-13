import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { getSearchGallery } from '../../api/pixabayApi';
import { ThreeDots } from 'react-loader-spinner';
import css from './App.module.css';

const photosPerPage = 12;

export class App extends Component {
  state = {
    query: '',
    galleryItems: [],
    totalItems: '',
    isLoading: false,
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

  render() {
    const { galleryItems, totalItems, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <ImageGallery galleryItems={galleryItems}></ImageGallery>
        {isLoading && (
          <div className={css.isLoading}>
            <ThreeDots />
          </div>
        )}
        S
        <Button
          onClick={this.handleLoadmoreImages}
          galleryItems={galleryItems}
          totalItems={totalItems}
        ></Button>
      </div>
    );
  }
}
