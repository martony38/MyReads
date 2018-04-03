import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ShowLibrary extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array,
    onCloseNotice: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.onCloseNotice();
  }

  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={this.props.booksOnShelves.filter(book => book.shelf === "currentlyReading")}
              onChangeShelf={this.props.onChangeShelf}
            />
            <BookShelf
              title="Want to Read"
              books={this.props.booksOnShelves.filter(book => book.shelf === "wantToRead")}
              onChangeShelf={this.props.onChangeShelf}
            />
            <BookShelf
              title="Read"
              books={this.props.booksOnShelves.filter(book => book.shelf === "read")}
              onChangeShelf={this.props.onChangeShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ShowLibrary