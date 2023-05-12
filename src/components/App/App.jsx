import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import css from './App.module.css';

export class App extends Component {
  state = { query: '', gallery: [] };

  handleOnSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleOnSubmit}></Searchbar>
        <ImageGallery></ImageGallery>
        <Button></Button>
      </div>
    );
  }
}
