import { FcSearch } from "react-icons/fc";
import { Field, Formik, Form } from "formik";
import s from "./SearchBar.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

const SearchBar = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState(false);
  console.log(searchQuery);

  const handleInputClick = (e) => {
    e.preventDefault();
    setSearchQuery(true);
      };
    
  const notify = () => toast.error("Error loading!");
    
  return (
      <header>
        <Formik
          initialValues={{ query: "" }}
          onSubmit={(values, actions) => {
            if (!values.query.trim()) {
              return notify();
            }
            onSearch(values.query.trim());
            actions.resetForm();
            setSearchQuery(false);
          }}
        >
          <Form>
            <div className={s.search}>
              <Field
                className={s.input}
                type="text"
                name="query"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onClick={handleInputClick}
              />
              <button type="submit" className={s.btnSubmit}>
                <div className={s.fcSearch}><FcSearch size={25} /></div>
              </button>
            </div>
          </Form>
        </Formik>
      </header>
    );
  }
export default SearchBar