import { Link } from "react-router-dom";
import s from "./NotFound.module.css"

export default function NotFound() {
  return (
    <p className={s.text}>
      Sorry, page not found! Please go to{" "}
      <Link to="/" className={s.link}>
        Home
      </Link>
      !
    </p>
  );
}