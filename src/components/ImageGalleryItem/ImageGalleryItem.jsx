import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformaturl, tags, id }) => {
  return (
    <img className={css.ImageGalleryItemImage} src={webformaturl} alt={tags} />
  );
};
