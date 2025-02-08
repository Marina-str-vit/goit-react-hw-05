import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";


const ImageGallery = ({ items, onClick }) => {
  return (
        <ul className={s.menuList}>
          {items.map((item) => {
            return (
              <li className={s.list} key={item.id}>
                <ImageCard item={item} onClick={onClick} />
              </li>
            );
          })
          }
        </ul>
      );
    }

export default ImageGallery