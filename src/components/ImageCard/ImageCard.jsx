import css from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  return (
    <div className={css.galleryItem} onClick={() => openModal(image)}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
      
    </div>
  );
};

export default ImageCard;
