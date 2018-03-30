import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookGrid = props => (
  <ol className="books-grid">
    {props.books.map((book) => (
      <li key={book.id}>
        <Book
          title={book.title}
          authors={book.authors}
          cover={book.imageLinks.thumbnail}
        />
      </li>
    ))}
  </ol>
 );

BookGrid.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookGrid