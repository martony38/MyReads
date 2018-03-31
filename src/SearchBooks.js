import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'

class SearchBooks extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = query => {
    this.setState({ query: query });

    BooksAPI.search(query).then(books => {
      if (typeof books !== "undefined" && !books.error ) {
        const booksFoundNotonShelves = books.filter(book => !this.props.booksOnShelves.map(book => book.id).includes(book.id))
        const booksFoundAlreadyonShelves = this.props.booksOnShelves.filter(book => books.map(book => book.id).includes(book.id))
        this.setState({ books: booksFoundNotonShelves.concat(booksFoundAlreadyonShelves) });
      } else {
        this.setState({ books: [] });
      }
    });
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
      </div>
    )
  }

}

export default SearchBooks