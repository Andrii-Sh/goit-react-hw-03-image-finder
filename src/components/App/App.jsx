import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { getSearchGallery } from '../../api/pixabayApi';
import css from './App.module.css';

const photosPerPage = 12;

export class App extends Component {
  state = { query: '', galleryItems: [], totalItems: '' };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      getSearchGallery(this.state.query).then(data =>
        this.setState({ galleryItems: data.hits, totalItems: data.totalHits })
      );
    }
  }

  handleSearch = query => {
    this.setState({ query });
  };

  handleLoadmoreImages = () => {
    const currentPage = Math.ceil(this.state.galleryItems.length / 12);
    const nextPage = currentPage + 1;

    getSearchGallery(this.state.query, nextPage, photosPerPage).then(data =>
      this.setState({
        galleryItems: [...this.state.galleryItems, ...data.hits],
        totalItems: data.totalHits,
      })
    );
  };

  render() {
    const { galleryItems, totalItems } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <ImageGallery galleryItems={galleryItems}></ImageGallery>
        <Button
          onClick={this.handleLoadmoreImages}
          galleryItems={galleryItems}
          totalItems={totalItems}
        ></Button>
      </div>
    );
  }
}
