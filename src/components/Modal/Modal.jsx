import React, { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscPress);
  }

  handleEscPress = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    // { url, tags } = this.props.modalImg;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.modalImg.url} alt={this.props.modalImg.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
