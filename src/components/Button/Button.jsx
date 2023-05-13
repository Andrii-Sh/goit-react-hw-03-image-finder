import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, galleryItems, totalItems }) => {
  return (
    totalItems > galleryItems.length && (
      <button type="button" className={css.Button} onClick={onClick}>
        Load more
      </button>
    )
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  galleryItems: PropTypes.arrayOf(PropTypes.shape),
  totalItems: PropTypes.number.isRequired,
};
