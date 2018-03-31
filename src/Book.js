import React from 'react'
import PropTypes from 'prop-types'

const Book = props => (
  <div className="book">
    <div className="book-top">
      <img className="book-cover" src={props.book.imageLinks.thumbnail} alt="book cover"/>
      <div className="book-shelf-changer">
        <select onChange={event => props.onChangeShelf(props.book, event.target.value)} value={props.book.shelf || "none"}>
          <option value="moveTo" disabled>Move to...</option>
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
      <div className="book-authors">{props.book.authors.join(' / ')}</div>
    )}
  </div>
)

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Book