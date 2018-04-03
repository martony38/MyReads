import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'
import Notice from './Notice';

class SearchBooks extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array,
    notice: PropTypes.string,
    onAddNotice: PropTypes.func.isRequired,
    onCloseNotice: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = query => {
    this.setState({ query: query });

    this.props.onAddNotice('Searching books...')

    BooksAPI.search(query)
      .then(books => {
      if (typeof books !== "undefined" && !books.error ) {
          const newBooks = books.filter(book => !this.props.booksOnShelves.map(book => book.id).includes(book.id))
          const booksAlreadyInLibrary = this.props.booksOnShelves.filter(book => books.map(book => book.id).includes(book.id))
          const bookResults = newBooks.concat(booksAlreadyInLibrary)
          this.setState({ books: bookResults });
          this.props.onAddNotice(`${bookResults.length} books found (${newBooks.length} new - ${booksAlreadyInLibrary.length} in library)`)
      } else {
        this.setState({ books: [] });
          this.props.onAddNotice('No books found.')
      }
      })
      .catch(error => this.props.onAddNotice(`Error while searching books in database: ${error}`));
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books && (
          <BookGrid
            books={this.state.books}
            onChangeShelf={this.props.onChangeShelf}
          />)}
        </div>
        <Notice
          notice={this.props.notice}
          onCloseNotice={this.props.onCloseNotice}
        />
      </div>
    )
  }

}

export default SearchBooks