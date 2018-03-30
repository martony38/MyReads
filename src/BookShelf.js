import React from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'

const BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <BookGrid
      className="bookshelf-books"
      books={props.books}
      onChangeShelf={props.onChangeShelf}
    />
  </div>
 );

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf