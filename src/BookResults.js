import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'

// Use wrapper to cancel async calls to BooksAPI not yet returned when component unmount
// (taken from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)
const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

class BookResults extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array,
    onAddNotice: PropTypes.func.isRequired,
    onCloseNotice: PropTypes.func.isRequired,
    query: PropTypes.string
  }

  state = {
    books: []
  }

  getBooksResults() {
    this.props.onAddNotice('Searching books...');

    this.cancelableBookSearch = makeCancelable(BooksAPI.search(this.props.query));
    this.cancelableBookSearch
      .promise
      .then(books => {
        if (typeof books !== "undefined" && !books.error ) {
          const newBooks = books.filter(book => !this.props.booksOnShelves.map(book => book.id).includes(book.id));
          const booksAlreadyInLibrary = this.props.booksOnShelves.filter(book => books.map(book => book.id).includes(book.id));
          const bookResults = newBooks.concat(booksAlreadyInLibrary);
          this.setState({ books: bookResults });
          this.props.onAddNotice(`${bookResults.length} books found (${newBooks.length} new - ${booksAlreadyInLibrary.length} in library)`);
        } else {
          this.setState({ books: [] });
          this.props.onAddNotice('No books found.');
        }
      })
      .catch(error => {
        // Display error message in UI if async call to BooksAPI
        // failed for any other reason than being canceled.
        if (!error.isCanceled) {
          this.props.onAddNotice('Error while connecting to database. Check your internet connection and try again.');
        }
      });
  }

  componentDidMount() {
    this.getBooksResults();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      if (this.cancelableBookSearch) {
        this.cancelableBookSearch.cancel();
      }
      this.getBooksResults();
    }
  }

  componentWillUnmount() {
    if (this.cancelableBookSearch) {
      this.cancelableBookSearch.cancel();
    }
    this.props.onCloseNotice();
  }

  render() {
    return(
      <div className="search-books-results">
        {this.state.books && (
        <BookGrid
          books={this.state.books}
          onChangeShelf={this.props.onChangeShelf}
        />)}
      </div>
    )
  }
}

export default BookResults