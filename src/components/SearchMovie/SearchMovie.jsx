import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import s from "./SearchMovie.module.css";

export default function SearchMovie({ onSearch }) {
  const notify = () => toast("Error loading!");

   return (
    <Formik
      initialValues={{ movie: "" }}
      onSubmit={(values, actions) => {
        if (!values.movie.trim()) {
          return notify();
        }
        onSearch(values.movie);
        actions.resetForm();
      }}
    >
      <Form className={s.search}>
        <Field
          className={s.input}
          type="text"
          name="movie"
          autoComplete="off"
          autoFocus
          placeholder="Search movies ..."
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
