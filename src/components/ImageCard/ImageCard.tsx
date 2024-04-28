import css from "./ImageCard.module.css";


interface Image {
  id: string;
  urls: {
    small: string;
    regular?: string; 
  };
  alt_description: string;
}

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
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



