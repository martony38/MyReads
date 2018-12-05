import React from "react";
import PropTypes from "prop-types";
// Import relative path to image (https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js)
import bookCoverDefault from "../img/default-book-cover.png";

const Book = props => (
  <div className="book">
    <div className="book-top">
      <img
        className="book-cover"
        // If no thumbnails available, use default book cover
        src={
          props.book.imageLinks && props.book.imageLinks.thumbnail
            ? props.book.imageLinks.thumbnail
            : bookCoverDefault
        }
        style={
          !props.book.imageLinks || !props.book.imageLinks.thumbnail
            ? { boxShadow: "none", background: "none" }
            : {}
        }
        alt="book cover"
      />
      <div className="book-shelf-changer">
        <select
          onChange={event =>
            props.onChangeShelf(props.book, {
              value: event.target.value,
              title: event.target.options[event.target.selectedIndex].text
            })
          }
          value={props.book.shelf || "none"}
        >
          <option value="moveTo" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    {// Some Books do not have any "authors" field.
    props.book.authors && (
      <div className="book-authors">{props.book.authors.join(" / ")}</div>
    )}
  </div>
);

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
