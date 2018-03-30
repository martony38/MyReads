import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookGrid = props => (
  <ol className="books-grid">
    {props.books.map((book) => (
      <li key={book.id}>
        <Book
          book={book}
          onChangeShelf={props.onChangeShelf}
        />
      </li>
    ))}
  </ol>
 );

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookGrid