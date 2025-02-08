import s from "./ImageCard.module.css";

const ImageCard = ({ item, onClick }) => {
  const { urls, alt_description } = item;

  const handlerClick = () => {
    onClick(item);
  };
  return (
    <div className={s.card}>
    <img
      className={s.imgCard}
      onClick={handlerClick}
      src={urls.small}
      alt={alt_description}
    />
    </div>
  );
};

export default ImageCard;