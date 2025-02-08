import { useEffect, useState } from "react";
import { getImages } from "./components/ApiService/Api";
import './App.css'
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import scrollOnLoad from "./components/Scroll/Scroll";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setIsError(true);
      return;
    } 
    async function fetchDataImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImages(searchQuery, page, setTotalPage);
        console.log(data);
        if (data && Array.isArray(data)) {
          setImages((prevImage) => [...prevImage, ...data]);
        }
        if (page !== 1) {
          scrollOnLoad();
        }
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDataImages(); 
  }, [searchQuery, page]);

  const handleSearch = async (item) => {
    setSearchQuery(item);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(perPage => perPage + 1);
  };

  function OpenModal(item) {
    setSelectedImage(item);
    setModalIsOpen(true);
  }

  function CloseModal() {
    setModalIsOpen(false);
    setSelectedImage();
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery onClick={OpenModal} items={images} />
      )}
      {selectedImage && (
        <ImageModal
          item={selectedImage}
          onClose={CloseModal}
          isOpen={modalIsOpen}
        />
      )}
      {images.length > 0 && !isLoading && page < totalPage && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
