import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "react-modal";

import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

axios.defaults.baseURL = `https://api.unsplash.com/`;
const ACCESS_KEY = `NYBFJtaT_RoW2_1AK1s-PHUz15VPsDdDFtpazbBjIE0`;

const App = () => {
  const [images, setImages] = useState([]); // Стан для зберігання списку зображень
  const [page, setPage] = useState(1); // Стан для зберігання поточної сторінки результатів
  const [loading, setLoading] = useState(false); // Стан для відображення завантаження
  const [error, setError] = useState(false); // Стан для відображення помилки
  const [selectedImage, setSelectedImage] = useState(null); // Стан для зберігання вибраного зображення
  const [searchQuery, setSearchQuery] = useState(""); // Стан для зберігання поточного пошукового запиту
  const [isSearching, setIsSearching] = useState(false); // Стан для відображення процесу пошуку нових зображень

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

 useEffect(() => {
   const fetchData = async () => {
     try {
       setIsSearching(true);
       setLoading(true);
       setError(null);

       if (searchQuery.trim() === "") {
         toast.error("The search field cannot be empty!");
         return;
       }

       const params = {
         query: searchQuery,
         page: page,
         per_page: 10,
         client_id: ACCESS_KEY,
       };

       const response = await axios.get(
         `search/photos/?${new URLSearchParams(params).toString()}`
       );

       const { data } = response;

       if (data.total === 0) {
         toast.error(
           "Sorry, we have not found the photos for your request. Try to write it differently.",
           { duration: 5000 }
         );
         return;
       }

       setImages((prevImages) =>
         page === 1 ? data.results : [...prevImages, ...data.results]
       );
       toast.success(`Wow! We found ${data.total} pictures`);
     } catch (error) {
       setError(error);
     } finally {
       setLoading(false);
       setIsSearching(false);
     }
   };

   fetchData();
 }, [searchQuery, page]);

 const handleSubmit = (search) => {
   if (!search.trim()) {
     
     toast.error("The search field cannot be empty!");
   } else {
     setPage(1);
     setSearchQuery(search);
   }
 };

 const handleLoadMore = () => {
   setPage((prevPage) => prevPage + 1);
 };

 const openModal = (image) => {
    if (image) {
      setSelectedImage(image);
    }
   
 };

  const closeModal = () => {
    if (selectedImage) {
      setSelectedImage(null);
    }
  };

  // Повертаємо JSX з компонентами
  return (
    <div className="app">
      <SearchBar onSubmit={handleSubmit} />{" "}
      {/* Передаємо функцію handleSubmit у компонент SearchBar */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />} {/* Відображаємо Loader при завантаженні */}
      {error && <ErrorMessage message={error} />}{" "}
      {/* Відображаємо ErrorMessage при помилці */}
      <ImageGallery images={images} openModal={openModal} />
      <LoadMoreBtn
        onLoadMore={handleLoadMore} // Передаємо функцію handleLoadMore у компонент LoadMoreBtn
        hasMore={!loading && images.length > 0 && !isSearching} // Перевірка чи є ще зображення для завантаження
      />
      {selectedImage !== null && (
        <ImageModal
          isOpen={true}
          image={selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};


export default App;
