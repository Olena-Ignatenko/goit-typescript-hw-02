import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
  }[];
  openModal: (image: {
  id: string;
  urls: {
    small: string;
    regular?: string; 
  };
  alt_description: string;
}) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <li className={css.galleryItem} key={index}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;


