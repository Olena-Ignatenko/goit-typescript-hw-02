import Modal from "react-modal";
import css from './ImageModal.module.css'

const ImageModal = ({ isOpen, image, onRequestClose }) => {

 
  return (
    <Modal className={css.ReactModal__Content}  isOpen={isOpen} onRequestClose={onRequestClose}>
      <img className={css.imgRegular } src={image.urls.regular} alt={image.alt_description} />
      {/* <div>{image.author}</div>
      <div>{image.likes} likes</div>
      <div>{image.description}</div> */}
    </Modal>
  );
};

export default ImageModal;
